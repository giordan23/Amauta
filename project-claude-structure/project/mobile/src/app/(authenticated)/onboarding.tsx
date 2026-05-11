import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Card, Modal, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { universityService, University } from '@/services/universityService';
import { careerService, Career } from '@/services/careerService';
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
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showCareerModal, setShowCareerModal] = useState(false);

  const { data: universitiesData, isLoading: loadingUniversities } = useQuery({
    queryKey: ['universities'],
    queryFn: () => universityService.getUniversities(1, 50),
  });

  // Fetch careers when university changes
  const { data: careersData, isLoading: loadingCareers } = useQuery({
    queryKey: ['careers'],
    queryFn: () => careerService.getCareers(),
    enabled: !!selectedUniversity,
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
      targetCareerId: selectedCareer?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  };

  const universities = universitiesData?.universities || [];
  const careers = careersData || [];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>
          ¡Bienvenido a Amauta! 🎓
        </Text>
        <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Para continuar, elige tu universidad y carrera objetivo
        </Text>
      </View>

      {/* Country Selection */}
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

      {/* University Selection */}
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
                onPress={() => {
                  setSelectedUniversity(uni);
                  setSelectedCareer(null); // Reset career when university changes
                }}
              >
                <Card
                  style={[
                    styles.universityCard,
                    { borderColor: theme.colors.outline },
                    selectedUniversity?.id === uni.id && {
                      borderColor: theme.colors.primary,
                      borderWidth: 2,
                      backgroundColor: theme.colors.primaryContainer,
                    },
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

      {/* Career Selection */}
      {selectedUniversity && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Carrera objetivo
          </Text>
          <Text variant="bodySmall" style={[styles.sectionHint, { color: theme.colors.textSecondary }]}>
            ¿Qué carrera te interesa? Esto ayuda a personalizar tu experiencia de estudio.
          </Text>
          {loadingCareers ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <TouchableOpacity
              style={[
                styles.careerSelector,
                { borderColor: theme.colors.outline, backgroundColor: theme.colors.surface },
              ]}
              onPress={() => setShowCareerModal(true)}
            >
              <View style={styles.careerSelectorContent}>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.careerSelectorText,
                    { color: selectedCareer ? theme.colors.text : theme.colors.textSecondary },
                  ]}
                >
                  {selectedCareer ? selectedCareer.name : 'Selecciona una carrera (opcional)'}
                </Text>
                <Text style={[styles.careerSelectorArrow, { color: theme.colors.textSecondary }]}>▼</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Career Modal */}
      <Portal>
        <Modal
          visible={showCareerModal}
          onDismiss={() => setShowCareerModal(false)}
          contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
        >
          <Text variant="titleLarge" style={[styles.modalTitle, { color: theme.colors.text }]}>
            Selecciona tu carrera
          </Text>
          <ScrollView style={styles.modalScroll}>
            <TouchableOpacity
              style={[styles.modalOption, { borderColor: theme.colors.border }]}
              onPress={() => {
                setSelectedCareer(null);
                setShowCareerModal(false);
              }}
            >
              <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
                Sin preferencia (todas las materias)
              </Text>
              {!selectedCareer && <Text style={{ color: theme.colors.primary }}>✓</Text>}
            </TouchableOpacity>
            {careers.map((career) => (
              <TouchableOpacity
                key={career.id}
                style={[
                  styles.modalOption,
                  { borderColor: theme.colors.border },
                  selectedCareer?.id === career.id && {
                    backgroundColor: theme.colors.primaryContainer,
                    borderColor: theme.colors.primary,
                  },
                ]}
                onPress={() => {
                  setSelectedCareer(career);
                  setShowCareerModal(false);
                }}
              >
                <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
                  {career.name}
                </Text>
                {selectedCareer?.id === career.id && (
                  <Text style={{ color: theme.colors.primary }}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button mode="text" onPress={() => setShowCareerModal(false)} style={styles.modalClose}>
            Cerrar
          </Button>
        </Modal>
      </Portal>

      {/* Footer */}
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
  sectionHint: { marginBottom: 12 },
  countryContainer: { flexDirection: 'row', gap: 12 },
  countryOption: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1 },
  countryText: {},
  universitiesContainer: { gap: 12 },
  universityCard: {},
  universityName: { fontWeight: '600' },
  universityDetails: { marginTop: 2 },
  universityLocation: { marginTop: 2 },
  emptyText: { textAlign: 'center', padding: 20 },
  careerSelector: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  careerSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  careerSelectorText: {},
  careerSelectorArrow: { fontSize: 12 },
  footer: { marginTop: 16 },
  button: { borderRadius: 8 },
  buttonContent: { paddingVertical: 8 },
  errorText: { textAlign: 'center', marginTop: 8 },
  modalContent: {
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: { marginBottom: 16, fontWeight: '600' },
  modalScroll: { maxHeight: 400 },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalClose: { marginTop: 8 },
});