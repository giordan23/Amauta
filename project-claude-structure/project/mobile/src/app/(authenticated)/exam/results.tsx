import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';

export default function ExamResultsScreen() {
  const theme = useTheme();
  const { examAttemptId, score, totalQuestions, correctAnswers } = useLocalSearchParams<{
    examAttemptId: string;
    score: string;
    totalQuestions: string;
    correctAnswers: string;
  }>();

  const scoreNum = parseFloat(score || '0');
  const total = parseInt(totalQuestions || '0', 10);
  const correct = parseInt(correctAnswers || '0', 10);
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const getMessage = () => {
    if (percentage >= 80) return { emoji: '🎉', text: '¡Excelente!', color: theme.colors.success };
    if (percentage >= 60) return { emoji: '👍', text: 'Bien hecho', color: theme.colors.primary };
    if (percentage >= 40) return { emoji: '📚', text: 'Sigue practicando', color: theme.colors.warning };
    return { emoji: '💪', text: 'No te rindas', color: theme.colors.error };
  };

  const message = getMessage();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      {/* Score Card */}
      <Card style={[styles.scoreCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.scoreContent}>
          <Text style={styles.emoji}>{message.emoji}</Text>
          <Text variant="headlineLarge" style={[styles.scoreText, { color: message.color }]}>
            {percentage}%
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
            {correct}
          </Text>
          <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Correctas</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.error }]}>
            {total - correct}
          </Text>
          <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Incorrectas</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.text }]}>
            {total}
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
            <View style={[styles.scoreBar, { width: `${percentage}%`, backgroundColor: message.color }]} />
          </View>
          <Text variant="bodySmall" style={[styles.scoreNote, { color: theme.colors.textSecondary }]}>
            Escala: 0-{total} respuestas correctas
          </Text>
        </Card.Content>
      </Card>

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
  content: { padding: 20 },
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
  detailCard: { marginBottom: 24 },
  detailTitle: { marginBottom: 12 },
  scoreBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBar: { height: '100%', borderRadius: 6 },
  scoreNote: { marginTop: 8, textAlign: 'center' },
  actionsContainer: { gap: 12 },
  button: { borderRadius: 8 },
  buttonContent: { paddingVertical: 8 },
});
