import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';
import { examService, ExamResultResponse } from '@/services/examService';

export default function ExamResultsScreen() {
  const { examAttemptId, score: scoreParam, totalQuestions: totalParam, correctAnswers: correctParam } = useLocalSearchParams<{
    examAttemptId: string;
    score?: string;
    totalQuestions?: string;
    correctAnswers?: string;
  }>();

  const theme = useTheme();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [detailedResults, setDetailedResults] = useState<ExamResultResponse | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fallback stats from params (simple mode)
  const scoreNum = parseFloat(scoreParam || '0');
  const total = parseInt(totalParam || '0', 10);
  const correct = parseInt(correctParam || '0', 10);
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const loadDetailedResults = async () => {
    if (!examAttemptId) return;
    setLoadingDetails(true);
    try {
      const result = await examService.completeExam(examAttemptId);
      setDetailedResults(result);
    } catch (e) {
      console.error('Failed to load details', e);
    } finally {
      setLoadingDetails(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const getMessage = (pct: number) => {
    if (pct >= 80) return { emoji: '🎉', text: '¡Excelente!', color: theme.colors.success };
    if (pct >= 60) return { emoji: '👍', text: 'Bien hecho', color: theme.colors.primary };
    if (pct >= 40) return { emoji: '📚', text: 'Sigue practicando', color: theme.colors.warning };
    return { emoji: '💪', text: 'No te rindas', color: theme.colors.error };
  };

  // Use detailed results if available, otherwise use params
  const results = detailedResults;
  const displayCorrect = results ? results.examAttempt.correctAnswers : correct;
  const displayTotal = results ? results.examAttempt.totalQuestions : total;
  const displayPercentage = displayTotal > 0 ? Math.round((displayCorrect / displayTotal) * 100) : 0;
  const message = getMessage(displayPercentage);

  const letters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      {/* Score Card */}
      <Card style={[styles.scoreCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.scoreContent}>
          <Text style={styles.emoji}>{message.emoji}</Text>
          <Text variant="headlineLarge" style={[styles.scoreText, { color: message.color }]}>
            {displayPercentage}%
          </Text>
          <Text variant="titleMedium" style={[styles.messageText, { color: theme.colors.textSecondary }]}>
            {message.text}
          </Text>
        </Card.Content>
      </Card>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.success }]}>
            {displayCorrect}
          </Text>
          <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Correctas</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.error }]}>
            {displayTotal - displayCorrect}
          </Text>
          <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Incorrectas</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.text }]}>
            {displayTotal}
          </Text>
          <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total</Text>
        </View>
      </View>

      {/* Score bar */}
      <Card style={[styles.detailCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.detailTitle, { color: theme.colors.text }]}>
            Detalle del puntaje
          </Text>
          <View style={[styles.scoreBarContainer, { backgroundColor: theme.colors.border }]}>
            <View style={[styles.scoreBar, { width: `${displayPercentage}%`, backgroundColor: message.color }]} />
          </View>
          <Text variant="bodySmall" style={[styles.scoreNote, { color: theme.colors.textSecondary }]}>
            Escala: 0-{displayTotal} respuestas correctas
          </Text>
        </Card.Content>
      </Card>

      {/* Per-question review */}
      {!results && !loadingDetails && (
        <Button
          mode="outlined"
          onPress={loadDetailedResults}
          style={styles.reviewButton}
          contentStyle={styles.reviewButtonContent}
        >
          Ver revisión detallada
        </Button>
      )}

      {loadingDetails && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
            Cargando revisión...
          </Text>
        </View>
      )}

      {results && results.questions && (
        <View style={styles.reviewSection}>
          <Text variant="titleMedium" style={[styles.reviewTitle, { color: theme.colors.text }]}>
            Revisión por pregunta
          </Text>

          {results.questions.map((question, idx) => {
            const answer = results.answers.find(a => a.questionId === question.id);
            const isCorrect = answer?.isCorrect ?? false;
            const selectedOptionId = answer?.selectedOptionId ?? null;
            const isExpanded = expandedQuestions.has(question.id);

            return (
              <Card
                key={question.id}
                style={[
                  styles.questionCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: isCorrect ? theme.colors.success : theme.colors.error,
                    borderWidth: isCorrect ? 1.5 : 1,
                  }
                ]}
              >
                <TouchableOpacity onPress={() => toggleQuestion(question.id)}>
                  <Card.Content>
                    <View style={styles.questionHeader}>
                      <View style={[
                        styles.questionBadge,
                        { backgroundColor: isCorrect ? theme.colors.success : theme.colors.error }
                      ]}>
                        <Text style={styles.questionBadgeText}>
                          {isCorrect ? '✓' : '✗'}
                        </Text>
                      </View>
                      <Text variant="bodyMedium" style={[styles.questionNumber, { color: theme.colors.text }]}>
                        Pregunta {idx + 1}
                      </Text>
                      {question.difficulty && (
                        <Text variant="bodySmall" style={[styles.difficultyTag, { color: theme.colors.textSecondary }]}>
                          {question.difficulty === 'EASY' ? 'Fácil' : question.difficulty === 'MEDIUM' ? 'Medio' : 'Difícil'}
                        </Text>
                      )}
                    </View>
                    <Text variant="bodyMedium" style={[styles.questionText, { color: theme.colors.text }]}>
                      {question.text}
                    </Text>
                    <Text variant="bodySmall" style={[styles.tapHint, { color: theme.colors.textSecondary }]}>
                      {isExpanded ? 'Toca para ocultar' : 'Toca para ver detalles'}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>

                {isExpanded && (
                  <Card.Content style={styles.expandedContent}>
                    {/* User's answer */}
                    {selectedOptionId && (
                      <View style={styles.answerSection}>
                        <Text variant="labelSmall" style={[styles.answerLabel, { color: theme.colors.textSecondary }]}>
                          Tu respuesta:
                        </Text>
                        {question.options
                          .filter(o => o.orderIndex !== undefined)
                          .sort((a, b) => a.orderIndex - b.orderIndex)
                          .map((option, optIdx) => {
                            const isUserChoice = option.id === selectedOptionId;
                            return (
                              <View
                                key={option.id}
                                style={[
                                  styles.optionRow,
                                  isUserChoice && {
                                    backgroundColor: isCorrect
                                      ? `${theme.colors.success}20`
                                      : `${theme.colors.error}20`,
                                    borderColor: isCorrect ? theme.colors.success : theme.colors.error,
                                  }
                                ]}
                              >
                                <Text variant="bodySmall" style={[styles.optionLetter, {
                                  color: isUserChoice ? (isCorrect ? theme.colors.success : theme.colors.error) : theme.colors.textSecondary
                                }]}>
                                  {letters[optIdx]}
                                </Text>
                                <Text
                                  variant="bodySmall"
                                  style={[
                                    styles.optionText,
                                    { color: theme.colors.text },
                                    isUserChoice && { fontWeight: '600' }
                                  ]}
                                >
                                  {option.text}
                                </Text>
                                {isUserChoice && (
                                  <Text style={[styles.optionMark, {
                                    color: isCorrect ? theme.colors.success : theme.colors.error
                                  }]}>
                                    {isCorrect ? ' ✓' : ' ✗'}
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                      </View>
                    )}

                    {/* Correct answer */}
                    {!isCorrect && (
                      <View style={styles.answerSection}>
                        <Text variant="labelSmall" style={[styles.answerLabel, { color: theme.colors.success }]}>
                          Respuesta correcta:
                        </Text>
                        {question.options
                          .filter(o => o.isCorrect)
                          .map(correctOption => {
                            const optIdx = question.options
                              .filter(p => p.orderIndex !== undefined)
                              .sort((a, b) => a.orderIndex - b.orderIndex)
                              .findIndex(o => o.id === correctOption.id);
                            return (
                              <View
                                key={correctOption.id}
                                style={[styles.optionRow, {
                                  backgroundColor: `${theme.colors.success}15`,
                                  borderColor: theme.colors.success,
                                }]}
                              >
                                <Text variant="bodySmall" style={[styles.optionLetter, { color: theme.colors.success }]}>
                                  {letters[optIdx] || 'A'}
                                </Text>
                                <Text variant="bodySmall" style={[styles.optionText, { color: theme.colors.text }]}>
                                  {correctOption.text}
                                </Text>
                                <Text style={[styles.optionMark, { color: theme.colors.success }]}> ✓</Text>
                              </View>
                            );
                          })}
                      </View>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <View style={[styles.explanationBox, { backgroundColor: theme.colors.primaryContainer }]}>
                        <Text variant="labelSmall" style={[styles.explanationLabel, { color: theme.colors.primary }]}>
                          Explicación
                        </Text>
                        <Text variant="bodySmall" style={[styles.explanationText, { color: theme.colors.text }]}>
                          {question.explanation}
                        </Text>
                      </View>
                    )}
                  </Card.Content>
                )}
              </Card>
            );
          })}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/exam/config')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Nuevo Simulado
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push('/home')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Volver al Inicio
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  scoreCard: { marginBottom: 16 },
  scoreContent: { alignItems: 'center', paddingVertical: 24 },
  emoji: { fontSize: 64, marginBottom: 12 },
  scoreText: { fontWeight: 'bold', marginBottom: 4 },
  messageText: {},
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontWeight: 'bold' },
  statLabel: { marginTop: 4 },
  statDivider: { width: 1, marginHorizontal: 12 },
  detailCard: { marginBottom: 16 },
  detailTitle: { marginBottom: 12 },
  scoreBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBar: { height: '100%', borderRadius: 6 },
  scoreNote: { marginTop: 8, textAlign: 'center' },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  reviewButton: { marginBottom: 20 },
  reviewButtonContent: { paddingVertical: 8 },
  reviewSection: { marginBottom: 24 },
  reviewTitle: { marginBottom: 12 },
  questionCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  questionBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBadgeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  questionNumber: { flex: 1, fontWeight: '600' },
  difficultyTag: { fontSize: 11 },
  questionText: { marginBottom: 4 },
  tapHint: { fontSize: 11, marginTop: 4 },
  expandedContent: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  answerSection: { marginBottom: 12 },
  answerLabel: { marginBottom: 6, fontWeight: '600', textTransform: 'uppercase', fontSize: 11 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 4,
    gap: 8,
  },
  optionLetter: { fontWeight: '700', width: 16 },
  optionText: { flex: 1 },
  optionMark: { fontWeight: 'bold', fontSize: 14 },
  explanationBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  explanationLabel: { fontWeight: '600', marginBottom: 4, fontSize: 11, textTransform: 'uppercase' },
  explanationText: { lineHeight: 18 },
  actionsContainer: { gap: 12 },
  button: { borderRadius: 8 },
  buttonContent: { paddingVertical: 8 },
});