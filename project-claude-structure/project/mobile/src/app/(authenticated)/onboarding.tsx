import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { universityService, University } from '@/services/universityService';
import { userService } from '@/services/userService';
import { useAuthStore } from '@/store/authStore';

const PERU_COUNTIES = [
  { code: 'PE', name: 'Perú' },
];

export default function OnboardingScreen() {
  const { user, setUser } = useAuthStore();
  const theme = useTheme();
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
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>
          ¡Bienvenido a Amauta! 🎓
        </Text>
        <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Para continuar, elige tu universidad objetivo
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
          País
        </Text>
        <View style={styles.countryContainer}>
          {PERU_COUNTIES.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={[
                styles.countryOption,
                { borderColor: theme.colors.outline },
                selectedCountry === country.code && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedCountry(country.code)}
            >
              <Text
                style={[
                  styles.countryText,
                  { color: theme.colors.text },
                  selectedCountry === country.code && { color: theme.colors.onPrimary, fontWeight: '600' },
                ]}
              >
                {country.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
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
                    { borderColor: theme.colors.outline },
                    selectedUniversity?.id === uni.id && { borderColor: theme.colors.primary, borderWidth: 2, backgroundColor: theme.colors.primaryContainer },
                  ]}
                  mode="outlined"
                >
                  <Card.Content>
                    <Text variant="titleMedium" style={[styles.universityName, { color: theme.colors.text }]}>
                      {uni.shortName}
                    </Text>
                    <Text variant="bodySmall" style={[styles.universityDetails, { color: theme.colors.textSecondary }]}>
                      {uni.name}
                    </Text>
                    <Text variant="bodySmall" style={[styles.universityLocation, { color: theme.colors.textSecondary }]}>
                      {uni.city}, {uni.region}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
            {universities.length === 0 && (
              <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
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
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {(onboardingMutation.error as Error).message}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { marginBottom: 24, alignItems: 'center' },
  title: { textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  countryContainer: { flexDirection: 'row', gap: 12 },
  countryOption: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1 },
  countryText: {},
  universitiesContainer: { gap: 12 },
  universityCard: {},
  universityName: { fontWeight: '600' },
  universityDetails: { marginTop: 2 },
  universityLocation: { marginTop: 2 },
  emptyText: { textAlign: 'center', padding: 20 },
  footer: { marginTop: 16 },
  button: { borderRadius: 8 },
  buttonContent: { paddingVertical: 8 },
  errorText: { textAlign: 'center', marginTop: 8 },
});
