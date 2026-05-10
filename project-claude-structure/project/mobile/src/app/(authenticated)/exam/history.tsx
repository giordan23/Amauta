import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, ActivityIndicator, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { examService } from '@/services/examService';

export default function ExamHistoryScreen() {
  const theme = useTheme();
  const { data: history, isLoading, error } = useQuery({
    queryKey: ['examHistory'],
    queryFn: examService.getExamHistory,
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const percentage = item.examAttempt.totalQuestions > 0
      ? Math.round((item.examAttempt.correctAnswers / item.examAttempt.totalQuestions) * 100)
      : 0;

    return (
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        onPress={() => {
          router.push({
            pathname: '/exam/results',
            params: {
              examAttemptId: item.examAttempt.id,
              score: item.examAttempt.score || 0,
              totalQuestions: item.examAttempt.totalQuestions,
              correctAnswers: item.examAttempt.correctAnswers,
            },
          });
        }}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={[styles.universityName, { color: theme.colors.text }]}>
              {item.examAttempt.university?.shortName || 'Universidad'}
            </Text>
            <Chip
              style={[
                styles.statusChip,
                { backgroundColor: item.examAttempt.status === 'COMPLETED' ? theme.colors.successContainer : theme.colors.primaryContainer },
              ]}
              textStyle={{ fontSize: 10, color: theme.colors.text }}
            >
              {item.examAttempt.status === 'COMPLETED' ? 'Completado' : 'En progreso'}
            </Chip>
          </View>
          <Text variant="bodySmall" style={[styles.date, { color: theme.colors.textSecondary }]}>
            {formatDate(item.examAttempt.startedAt)}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text variant="titleLarge" style={[styles.score, { color: theme.colors.success }]}>
                {item.examAttempt.correctAnswers}
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Correctas</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge" style={[styles.score, { color: theme.colors.error }]}>
                {item.examAttempt.totalQuestions - item.examAttempt.correctAnswers}
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Incorrectas</Text>
            </View>
            <View style={styles.stat}>
              <Text variant="titleLarge" style={[styles.score, { color: theme.colors.text }]}>
                {percentage}%
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Puntaje</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="bodyLarge" style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No se pudo cargar el historial
        </Text>
        <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
          {(error as Error).message}
        </Text>
      </View>
    );
  }

  if (!history || history.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineSmall" style={[styles.emptyTitle, { color: theme.colors.text }]}>
          📚 Sin historial
        </Text>
        <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          Completa tu primer simulado para ver tu progreso aquí
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.examAttempt.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { marginBottom: 8 },
  emptyText: { textAlign: 'center' },
  errorText: { marginTop: 8 },
  list: { padding: 20 },
  card: {},
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  universityName: { fontWeight: '600' },
  statusChip: { height: 24 },
  date: { marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  score: { fontWeight: 'bold' },
  statLabel: { marginTop: 2 },
});
