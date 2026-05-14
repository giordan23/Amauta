import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, ActivityIndicator, Card, CardContent, ProgressBar } from '@/components/PaperCompat';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { examService } from '@/services/examService';
import { Question } from '@/types/exam';

export default function ExamTakeScreen() {
  const { examAttemptId } = useLocalSearchParams<{ examAttemptId: string }>();
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);

  const { data: examData, isLoading, error } = useQuery({
    queryKey: ['exam', examAttemptId],
    queryFn: () => examService.getExam(examAttemptId!),
    enabled: !!examAttemptId,
  });

  useEffect(() => {
    if (examData) {
      setQuestions(examData.questions);
      if (examData.answeredMap) {
        setAnswers(examData.answeredMap);
      }
    }
  }, [examData]);

  const answerMutation = useMutation({
    mutationFn: ({ questionId, selectedOptionId }: { questionId: string; selectedOptionId: string }) =>
      examService.answerQuestion(examAttemptId!, questionId, selectedOptionId),
    onSuccess: (data) => {
      setAnswers((prev) => ({ ...prev, [data.questionId]: data.selectedOptionId }));
    },
  });

  const completeMutation = useMutation({
    mutationFn: () => examService.completeExam(examAttemptId!),
    onSuccess: (data) => {
      router.replace({
        pathname: '/exam/results',
        params: {
          examAttemptId,
          score: data.examAttempt.score || 0,
          totalQuestions: data.examAttempt.totalQuestions,
          correctAnswers: data.examAttempt.correctAnswers,
        },
      });
    },
  });

  const handleSelectOption = (optionId: string) => {
    const question = questions[currentIndex];
    if (!question) return;
    answerMutation.mutate({ questionId: question.id, selectedOptionId: optionId });
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas terminar el simulado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Terminar', onPress: () => completeMutation.mutate() },
      ]
    );
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex + 1) / questions.length : 0;
  const answeredCount = Object.keys(answers).length;

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyMedium" style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Cargando preguntas...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="bodyMedium" style={[styles.errorText, { color: theme.colors.error }]}>
          Error al cargar el examen
        </Text>
        <Button mode="contained" onPress={() => router.back()}>
          Volver
        </Button>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="bodyMedium" style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          No hay preguntas disponibles
        </Text>
        <Button mode="contained" onPress={() => router.replace('/')}>
          Volver al inicio
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Progress */}
      <View style={[styles.progressSection, { backgroundColor: theme.colors.surface }]}>
        <Text variant="bodySmall" style={[styles.progressText, { color: theme.colors.textSecondary }]}>
          Pregunta {currentIndex + 1} de {questions.length}
        </Text>
        <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
        <Text variant="bodySmall" style={[styles.answeredText, { color: theme.colors.textSecondary }]}>
          {answeredCount} contestadas
        </Text>
      </View>

      {/* Question */}
      <ScrollView style={styles.questionSection} contentContainerStyle={styles.questionContent}>
        <Card style={[styles.questionCard, { backgroundColor: theme.colors.surface }]}>
          <CardContent>
            <Text variant="titleMedium" style={[styles.questionText, { color: theme.colors.text }]}>
              {currentQuestion.text}
            </Text>
            {currentQuestion.imageUrl && (
              <Text variant="bodySmall" style={[styles.imageNote, { color: theme.colors.textSecondary }]}>
                [Imagen: {currentQuestion.imageUrl}]
              </Text>
            )}
          </CardContent>
        </Card>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((option, idx) => {
              const letters = ['A', 'B', 'C', 'D', 'E'];
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelectOption(option.id)}
                  disabled={answerMutation.isPending}
                >
                  <Card
                    style={[
                      styles.optionCard,
                      { backgroundColor: theme.colors.surface },
                      isSelected && { backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.primary },
                    ]}
                  >
                    <CardContent style={styles.optionContent}>
                      <View style={[
                        styles.optionLetter,
                        { backgroundColor: isSelected ? theme.colors.primary : theme.colors.border },
                      ]}>
                        <Text style={[
                          styles.optionLetterText,
                          { color: isSelected ? theme.colors.onPrimary : theme.colors.textSecondary },
                        ]}>
                          {letters[idx]}
                        </Text>
                      </View>
                      <Text
                        variant="bodyMedium"
                        style={[
                          styles.optionText,
                          { color: theme.colors.text },
                          isSelected && { color: theme.colors.primary, fontWeight: '500' },
                        ]}
                      >
                        {option.text}
                      </Text>
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={[styles.navigationSection, { backgroundColor: theme.colors.surface }]}>
        <Button
          mode="outlined"
          onPress={handlePrev}
          disabled={currentIndex === 0}
          style={styles.navButton}
        >
          Anterior
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.navButton}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleComplete}
            loading={completeMutation.isPending}
            style={styles.navButton}
          >
            Terminar
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  loadingText: {},
  errorText: { textAlign: 'center' },
  progressSection: { padding: 16 },
  progressText: { marginBottom: 4 },
  progressBar: { height: 6, borderRadius: 3 },
  answeredText: { marginTop: 4 },
  questionSection: { flex: 1 },
  questionContent: { padding: 20 },
  questionCard: { marginBottom: 20 },
  questionText: {},
  imageNote: { marginTop: 8, fontStyle: 'italic' },
  optionsContainer: { marginTop: 12 },
  optionCard: {},
  optionContent: { flexDirection: 'row', alignItems: 'center' },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: { fontWeight: '600' },
  optionText: { flex: 1 },
  navigationSection: { flexDirection: 'row', padding: 16 },
  navButton: { flex: 1 },
});
