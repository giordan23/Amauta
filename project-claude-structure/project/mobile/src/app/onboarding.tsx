import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { theme } from '@/theme';
import { universityService, University } from '@/services/universityService';
import { userService } from '@/services/userService';
import { useAuthStore } from '@/store/authStore';

const PERU_COUNTIES = [
  { code: 'PE', name: 'Perú' },
];

export default function OnboardingScreen() {
  const { user, setUser } = useAuthStore();
  const [selectedCountry, setSelectedCountry] = useState<string>('PE');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const { data: universitiesData, isLoading: loadingUniversities } = useQuery({
    queryKey: ['universities'],
    queryFn: () => universityService.getUniversities(1, 50),
  });

  const onboardingMutation = useMutation({
    mutationFn: userService.completeOnboarding,
    onSuccess: (data) => {
      setUser(data.user);
      router.replace('/home');
    },
    onError: (error: Error) => {
      console.error('Onboarding error:', error);
    },
  });

  const handleCompleteOnboarding = () => {
    if (!selectedUniversity) return;
    
    onboardingMutation.mutate({
      country: selectedCountry,
      targetUniversityId: selectedUniversity.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  };

  const universities = universitiesData?.universities || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          ¡Bienvenido a Amauta! 🎓
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Para continuar, elige tu universidad objetivo
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          País
        </Text>
        <View style={styles.countryContainer}>
          {PERU_COUNTIES.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={[
                styles.countryOption,
                selectedCountry === country.code && styles.countryOptionSelected,
              ]}
              onPress={() => setSelectedCountry(country.code)}
            >
              <Text
                style={[
                  styles.countryText,
                  selectedCountry === country.code && styles.countryTextSelected,
                ]}
              >
                {country.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Universidad objetivo
        </Text>
        {loadingUniversities ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View style={styles.universitiesContainer}>
            {universities.map((uni) => (
              <TouchableOpacity
                key={uni.id}
                onPress={() => setSelectedUniversity(uni)}
              >
                <Card
                  style={[
                    styles.universityCard,
                    selectedUniversity?.id === uni.id && styles.universityCardSelected,
                  ]}
                  mode="outlined"
                >
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.universityName}>
                      {uni.shortName}
                    </Text>
                    <Text variant="bodySmall" style={styles.universityDetails}>
                      {uni.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.universityLocation}>
                      {uni.city}, {uni.region}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
            {universities.length === 0 && (
              <Text variant="bodyMedium" style={styles.emptyText}>
                No hay universidades disponibles. Asegúrate de que el servidor esté corriendo.
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleCompleteOnboarding}
          disabled={!selectedUniversity || onboardingMutation.isPending}
          loading={onboardingMutation.isPending}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Continuar
        </Button>
        {onboardingMutation.error && (
          <Text variant="bodySmall" style={styles.errorText}>
            {(onboardingMutation.error as Error).message}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  countryContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  countryOption: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  countryOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  countryText: {
    color: theme.colors.text,
  },
  countryTextSelected: {
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
  universitiesContainer: {
    gap: theme.spacing.md,
  },
  universityCard: {
    borderColor: theme.colors.outline,
  },
  universityCardSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    backgroundColor: theme.colors.primaryContainer,
  },
  universityName: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  universityDetails: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  universityLocation: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    padding: theme.spacing.lg,
  },
  footer: {
    marginTop: theme.spacing.lg,
  },
  button: {
    borderRadius: theme.spacing.sm,
  },
  buttonContent: {
    paddingVertical: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});
