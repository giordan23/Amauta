import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { universityService } from '@/services/universityService';
import { examService } from '@/services/examService';
import { userService } from '@/services/userService';

const DIFFICULTIES = [
  { value: undefined, label: 'Todas' },
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Intermedio' },
  { value: 'HARD', label: 'Difícil' },
];

export default function ExamConfigScreen() {
  const theme = useTheme();
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD' | undefined>(undefined);
  const [questionCount, setQuestionCount] = useState(10);

  // Obtener perfil para pre-seleccionar la universidad y carrera del usuario
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });

  // Query client for cache invalidation
  const queryClient = useQueryClient();

  // Mutation para actualizar perfil (universidad seleccionada)
  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  // Pre-seleccionar universidad del perfil al cargar las universidades
  React.useEffect(() => {
    if (profile?.targetUniversity?.id && !selectedUniversityId) {
      setSelectedUniversityId(profile.targetUniversity.id);
    }
  }, [profile, selectedUniversityId]);

  const { data: universities, isLoading: loadingUniversities } = useQuery({
    queryKey: ['universities'],
    queryFn: () => universityService.getUniversities(1, 50),
    staleTime: 0,
    refetchOnMount: true,
  });

  const startExamMutation = useMutation({
    mutationFn: examService.startExam,
    onSuccess: (data) => {
      router.push({
        pathname: '/exam/take',
        params: { examAttemptId: data.examAttempt.id },
      });
    },
    onError: (error: Error) => {
      console.error('Error starting exam:', error);
    },
  });

  const handleStartExam = () => {
    if (!selectedUniversityId) return;

    // Las materias se derivan automáticamente desde la configuración de carrera del usuario
    startExamMutation.mutate({
      universityId: selectedUniversityId,
      difficulty,
      questionCount,
    });
  };

  const loading = loadingUniversities || !profile;
  const universitiesList = universities?.universities || [];
  const selectedUniversity = universitiesList.find(u => u.id === selectedUniversityId);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>
          Nuevo Simulado
        </Text>
        <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Las materias se seleccionan automáticamente según tu carrera
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          {/* Universidad */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Universidad objetivo
            </Text>
            <View style={styles.chipsContainer}>
              {universitiesList.map((uni) => (
                <TouchableOpacity key={uni.id} onPress={() => {
                  setSelectedUniversityId(uni.id);
                  // Guardar en el perfil del usuario
                  updateProfileMutation.mutate({ targetUniversityId: uni.id });
                }}>
                  <Chip
                    selected={selectedUniversityId === uni.id}
                    style={styles.chip}
                    showSelectedOverlay
                  >
                    {uni.shortName}
                  </Chip>
                </TouchableOpacity>
              ))}
            </View>
            {selectedUniversity && (
              <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
                {selectedUniversity.name}
              </Text>
            )}
          </View>

          {/* Dificultad */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Dificultad
            </Text>
            <View style={styles.difficultyContainer}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity
                  key={d.label}
                  onPress={() => setDifficulty(d.value as 'EASY' | 'MEDIUM' | 'HARD' | undefined)}
                >
                  <Chip
                    selected={difficulty === d.value}
                    style={styles.chip}
                    showSelectedOverlay
                  >
                    {d.label}
                  </Chip>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cantidad de preguntas */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Número de preguntas: {questionCount}
            </Text>
            <View style={styles.questionCountContainer}>
              {[5, 10, 20, 50].map((count) => (
                <TouchableOpacity key={count} onPress={() => setQuestionCount(count)}>
                  <Chip
                    selected={questionCount === count}
                    style={styles.chip}
                    showSelectedOverlay
                  >
                    {count}
                  </Chip>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón iniciar */}
          <View style={styles.footer}>
            <Button
              mode="contained"
              onPress={handleStartExam}
              disabled={
                !selectedUniversityId ||
                startExamMutation.isPending
              }
              loading={startExamMutation.isPending}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Iniciar Simulado
            </Button>
            {startExamMutation.error && (
              <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
                {(startExamMutation.error as Error).message}
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { marginBottom: 24 },
  title: { color: '#212121', marginBottom: 4 },
  subtitle: { color: '#757575' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { marginBottom: 4 },
  difficultyContainer: { flexDirection: 'row', gap: 8 },
  questionCountContainer: { flexDirection: 'row', gap: 8 },
  footer: { marginTop: 16 },
  button: { borderRadius: 8 },
  buttonContent: { paddingVertical: 8 },
  errorText: { color: '#D32F2F', textAlign: 'center', marginTop: 8 },
});
