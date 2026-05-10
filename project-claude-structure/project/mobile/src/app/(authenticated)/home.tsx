import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { examService } from '@/services/examService';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: history } = useQuery({
    queryKey: ['examHistory'],
    queryFn: examService.getExamHistory,
    enabled: mounted,
  });

  const handleLogout = async () => {
    await authService.logout();
    logout();
    router.replace('/auth/login');
  };

  const lastExam = history && history.length > 0 ? history[0] : null;
  const initials = [
    user?.firstName?.[0] || '',
    user?.lastName?.[0] || '',
  ].join('').toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';

  const lastExamPercentage = lastExam
    ? Math.round((lastExam.examAttempt.correctAnswers / lastExam.examAttempt.totalQuestions) * 100)
    : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text variant="headlineSmall" style={[styles.greeting, { color: theme.colors.text }]}>
              ¡Hola, {user?.firstName || user?.email?.split('@')[0] || 'Usuario'}! 👋
            </Text>
            <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              ¿Qué quieres hacer hoy?
            </Text>
          </View>
          <Avatar.Text
            size={48}
            label={initials}
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            onTouchEnd={() => router.push('/profile')}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Acciones rápidas
        </Text>
        <View style={styles.actionsGrid}>
          <Card
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/exam/config')}
          >
            <Card.Content style={styles.actionContent}>
              <Text style={styles.actionIcon}>📝</Text>
              <Text variant="titleSmall" style={[styles.actionTitle, { color: theme.colors.text }]}>Nuevo Simulado</Text>
              <Text variant="bodySmall" style={[styles.actionDesc, { color: theme.colors.textSecondary }]}>Practica con preguntas</Text>
            </Card.Content>
          </Card>

          <Card
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/exam/history')}
          >
            <Card.Content style={styles.actionContent}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text variant="titleSmall" style={[styles.actionTitle, { color: theme.colors.text }]}>Ver Historial</Text>
              <Text variant="bodySmall" style={[styles.actionDesc, { color: theme.colors.textSecondary }]}>Revisa tus resultados</Text>
            </Card.Content>
          </Card>

          <Card
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/profile')}
          >
            <Card.Content style={styles.actionContent}>
              <Text style={styles.actionIcon}>👤</Text>
              <Text variant="titleSmall" style={[styles.actionTitle, { color: theme.colors.text }]}>Mi Perfil</Text>
              <Text variant="bodySmall" style={[styles.actionDesc, { color: theme.colors.textSecondary }]}>Actualiza tus datos</Text>
            </Card.Content>
          </Card>

          <Card
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/onboarding')}
          >
            <Card.Content style={styles.actionContent}>
              <Text style={styles.actionIcon}>🎓</Text>
              <Text variant="titleSmall" style={[styles.actionTitle, { color: theme.colors.text }]}>Universidad</Text>
              <Text variant="bodySmall" style={[styles.actionDesc, { color: theme.colors.textSecondary }]}>Cambia tu objetivo</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Last Exam Result */}
      {lastExamPercentage !== null && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Último resultado
          </Text>
          <Card
            style={[styles.lastExamCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/exam/history')}
          >
            <Card.Content style={styles.lastExamContent}>
              <View style={styles.lastExamInfo}>
                <Text variant="headlineLarge" style={[
                  styles.lastExamScore,
                  { color: lastExamPercentage >= 60 ? theme.colors.success : theme.colors.error }
                ]}>
                  {lastExamPercentage}%
                </Text>
                <Text variant="bodySmall" style={[styles.lastExamLabel, { color: theme.colors.textSecondary }]}>
                  {lastExam!.examAttempt.correctAnswers}/{lastExam!.examAttempt.totalQuestions} correctas
                </Text>
              </View>
              <Text style={[styles.lastExamArrow, { color: theme.colors.primary }]}>→</Text>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Logout */}
      <View style={styles.footer}>
        <Button
          mode="text"
          onPress={handleLogout}
          textColor={theme.colors.textSecondary}
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { marginBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontWeight: 'bold' },
  subtitle: { marginTop: 2 },
  avatar: {},
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%' },
  actionContent: { alignItems: 'center', paddingVertical: 16 },
  actionIcon: { fontSize: 32, marginBottom: 8 },
  actionTitle: { textAlign: 'center' },
  actionDesc: { textAlign: 'center', marginTop: 2 },
  lastExamCard: {},
  lastExamContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastExamInfo: { flex: 1 },
  lastExamScore: { fontWeight: 'bold' },
  lastExamLabel: {},
  lastExamArrow: { fontSize: 24 },
  footer: { alignItems: 'center', marginTop: 16 },
});
