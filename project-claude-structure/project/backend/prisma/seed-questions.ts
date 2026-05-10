import { PrismaClient, DifficultyLevel } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
  // MATEMÁTICA - EASY
  {
    text: 'Si x + 5 = 12, ¿cuál es el valor de x?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'x + 5 = 12 → x = 12 - 5 → x = 7',
    options: [
      { text: '5', isCorrect: false, orderIndex: 0 },
      { text: '6', isCorrect: false, orderIndex: 1 },
      { text: '7', isCorrect: true, orderIndex: 2 },
      { text: '8', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Cuánto es el 25% de 80?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: '25% de 80 = (25/100) × 80 = 20',
    options: [
      { text: '10', isCorrect: false, orderIndex: 0 },
      { text: '15', isCorrect: false, orderIndex: 1 },
      { text: '20', isCorrect: true, orderIndex: 2 },
      { text: '25', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Si un triángulo tiene lados de 3 cm, 4 cm y 5 cm, ¿es un triángulo rectángulo?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-civil',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: '3² + 4² = 9 + 16 = 25 = 5². Cumple el teorema de Pitágoras, sí es rectángulo.',
    options: [
      { text: 'Sí, porque 3² + 4² = 5²', isCorrect: true, orderIndex: 0 },
      { text: 'No, porque los lados no son iguales', isCorrect: false, orderIndex: 1 },
      { text: 'Sí, porque todos sus lados son menores que 10', isCorrect: false, orderIndex: 2 },
      { text: 'No, porque 3 + 4 = 7 < 5', isCorrect: false, orderIndex: 3 },
    ],
  },

  // MATEMÁTICA - MEDIUM
  {
    text: 'Resuelve: 2x² - 8 = 0',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-sistemas',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: '2x² = 8 → x² = 4 → x = ±2',
    options: [
      { text: 'x = 2', isCorrect: false, orderIndex: 0 },
      { text: 'x = -2', isCorrect: false, orderIndex: 1 },
      { text: 'x = ±2', isCorrect: true, orderIndex: 2 },
      { text: 'x = 4', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Cuál es el resultado de log₂(32)?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-sistemas',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: 'log₂(32) = log₂(2⁵) = 5',
    options: [
      { text: '3', isCorrect: false, orderIndex: 0 },
      { text: '4', isCorrect: false, orderIndex: 1 },
      { text: '5', isCorrect: true, orderIndex: 2 },
      { text: '6', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Si sen(θ) = 3/5 y θ está en el primer cuadrante, ¿cuánto vale cos(θ)?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-industrial',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-II',
    explanation: 'sen²θ + cos²θ = 1 → cos²θ = 1 - (9/25) = 16/25 → cos(θ) = 4/5',
    options: [
      { text: '3/4', isCorrect: false, orderIndex: 0 },
      { text: '4/5', isCorrect: true, orderIndex: 1 },
      { text: '5/3', isCorrect: false, orderIndex: 2 },
      { text: '5/4', isCorrect: false, orderIndex: 3 },
    ],
  },

  // MATEMÁTICA - HARD
  {
    text: 'Calcula: lim(x→0) (sen(3x)/x)',
    difficulty: 'HARD' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-sistemas',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'lim(x→0) sen(ax)/x = a. Entonces lim(x→0) sen(3x)/x = 3',
    options: [
      { text: '0', isCorrect: false, orderIndex: 0 },
      { text: '1', isCorrect: false, orderIndex: 1 },
      { text: '3', isCorrect: true, orderIndex: 2 },
      { text: '1/3', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Halla la derivada de f(x) = e^(2x) · ln(x)',
    difficulty: 'HARD' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-sistemas',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: 'f\'(x) = e^(2x)·2·ln(x) + e^(2x)·(1/x) = e^(2x)(2ln(x) + 1/x)',
    options: [
      { text: 'e^(2x)(2ln(x) + 1/x)', isCorrect: true, orderIndex: 0 },
      { text: '2e^(2x) · ln(x)', isCorrect: false, orderIndex: 1 },
      { text: 'e^(2x)/x', isCorrect: false, orderIndex: 2 },
      { text: 'e^(2x)(ln(x) + 1/x)', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Calcula la integral definida: ∫₀¹ x² dx',
    difficulty: 'HARD' as DifficultyLevel,
    subjectId: 'matematica',
    careerId: 'ing-civil',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-I',
    explanation: '∫x²dx = x³/3. Evaluando de 0 a 1: (1³/3) - (0³/3) = 1/3',
    options: [
      { text: '1/2', isCorrect: false, orderIndex: 0 },
      { text: '1/3', isCorrect: true, orderIndex: 1 },
      { text: '1', isCorrect: false, orderIndex: 2 },
      { text: '2/3', isCorrect: false, orderIndex: 3 },
    ],
  },

  // COMUNICACIÓN - EASY
  {
    text: '"El niño estudia mucho." ¿Cuál es el sujeto de esta oración?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'comunicacion',
    careerId: 'derecho',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'El sujeto es "El niño" porque es quien realiza la acción de estudiar.',
    options: [
      { text: 'El niño', isCorrect: true, orderIndex: 0 },
      { text: 'estudia', isCorrect: false, orderIndex: 1 },
      { text: 'mucho', isCorrect: false, orderIndex: 2 },
      { text: 'La oración completa', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Cuál de las siguientes palabras es un adverbio?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'comunicacion',
    careerId: 'educacion',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: '"Muy" es un adverbio de cantidad. "Blanco" es un adjetivo, "mesa" es un sustantivo y "correr" es un verbo.',
    options: [
      { text: 'Blanco', isCorrect: false, orderIndex: 0 },
      { text: 'Muy', isCorrect: true, orderIndex: 1 },
      { text: 'Mesa', isCorrect: false, orderIndex: 2 },
      { text: 'Correr', isCorrect: false, orderIndex: 3 },
    ],
  },

  // COMUNICACIÓN - MEDIUM
  {
    text: '¿A qué género literario pertenece "La Odisea" de Homero?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'comunicacion',
    careerId: 'derecho',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'La Odisea es una epopeya, un poema épico que narra las aventuras de Odiseo en su regreso a Ítaca.',
    options: [
      { text: 'Lírico', isCorrect: false, orderIndex: 0 },
      { text: 'Narrativo', isCorrect: false, orderIndex: 1 },
      { text: 'Épico (epopeya)', isCorrect: true, orderIndex: 2 },
      { text: 'Dramático', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '"Caminante, no hay camino, se hace camino al andar." ¿A qué poeta pertenece?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'comunicacion',
    careerId: 'educacion',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-II',
    explanation: 'Estos versos pertenecen a Antonio Machado, poeta español de la Generación del 98.',
    options: [
      { text: 'Pablo Neruda', isCorrect: false, orderIndex: 0 },
      { text: 'Antonio Machado', isCorrect: true, orderIndex: 1 },
      { text: 'Federico García Lorca', isCorrect: false, orderIndex: 2 },
      { text: 'Rubén Darío', isCorrect: false, orderIndex: 3 },
    ],
  },

  // FÍSICA - EASY
  {
    text: '¿Cuál es la unidad de medida de la fuerza en el Sistema Internacional?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-civil',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'En el SI, la fuerza se mide en Newton (N), que equivale a kg·m/s².',
    options: [
      { text: 'Julio (J)', isCorrect: false, orderIndex: 0 },
      { text: 'Newton (N)', isCorrect: true, orderIndex: 1 },
      { text: 'Watt (W)', isCorrect: false, orderIndex: 2 },
      { text: 'Pascal (Pa)', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Si un auto recorre 100 km en 2 horas, ¿cuál es su velocidad promedio?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-mecanica',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: 'v = d/t = 100 km / 2 h = 50 km/h',
    options: [
      { text: '25 km/h', isCorrect: false, orderIndex: 0 },
      { text: '50 km/h', isCorrect: true, orderIndex: 1 },
      { text: '100 km/h', isCorrect: false, orderIndex: 2 },
      { text: '200 km/h', isCorrect: false, orderIndex: 3 },
    ],
  },

  // FÍSICA - MEDIUM
  {
    text: 'Un cuerpo se lanza verticalmente hacia arriba con una velocidad de 20 m/s. ¿Qué altura máxima alcanza? (g = 10 m/s²)',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-civil',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'h = v₀²/(2g) = (20)²/(2×10) = 400/20 = 20 m',
    options: [
      { text: '10 m', isCorrect: false, orderIndex: 0 },
      { text: '20 m', isCorrect: true, orderIndex: 1 },
      { text: '40 m', isCorrect: false, orderIndex: 2 },
      { text: '200 m', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Cuál es la energía cinética de un cuerpo de masa 4 kg que se mueve a 3 m/s?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-mecanica',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-II',
    explanation: 'Ec = (1/2)mv² = (1/2)(4)(3)² = 2 × 9 = 18 J',
    options: [
      { text: '12 J', isCorrect: false, orderIndex: 0 },
      { text: '18 J', isCorrect: true, orderIndex: 1 },
      { text: '36 J', isCorrect: false, orderIndex: 2 },
      { text: '24 J', isCorrect: false, orderIndex: 3 },
    ],
  },

  // FÍSICA - HARD
  {
    text: 'Un resistor de 12 Ω está conectado a una fuente de 24 V. ¿Cuál es la corriente que circula por el circuito?',
    difficulty: 'HARD' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-electronica',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'Por la Ley de Ohm: I = V/R = 24V / 12Ω = 2 A',
    options: [
      { text: '0.5 A', isCorrect: false, orderIndex: 0 },
      { text: '2 A', isCorrect: true, orderIndex: 1 },
      { text: '12 A', isCorrect: false, orderIndex: 2 },
      { text: '288 A', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: 'Un auto de 1000 kg toma una curva de radio 50 m a 36 km/h. ¿Cuál es la fuerza centrípeta necesaria?',
    difficulty: 'HARD' as DifficultyLevel,
    subjectId: 'fisica',
    careerId: 'ing-civil',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-I',
    explanation: 'v = 36 km/h = 10 m/s. Fc = mv²/r = (1000)(10)²/50 = 2000 N',
    options: [
      { text: '1000 N', isCorrect: false, orderIndex: 0 },
      { text: '2000 N', isCorrect: true, orderIndex: 1 },
      { text: '3600 N', isCorrect: false, orderIndex: 2 },
      { text: '5000 N', isCorrect: false, orderIndex: 3 },
    ],
  },

  // QUÍMICA - EASY
  {
    text: '¿Cuántos electrones tiene el átomo de carbono (C) en su estado neutro?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'quimica',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'El carbono tiene número atómico 6, por lo tanto tiene 6 electrones en estado neutro.',
    options: [
      { text: '4', isCorrect: false, orderIndex: 0 },
      { text: '6', isCorrect: true, orderIndex: 1 },
      { text: '12', isCorrect: false, orderIndex: 2 },
      { text: '8', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Cuál es la fórmula química del agua?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'quimica',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: 'El agua está compuesta por dos átomos de hidrógeno y uno de oxígeno: H₂O.',
    options: [
      { text: 'CO₂', isCorrect: false, orderIndex: 0 },
      { text: 'H₂O', isCorrect: true, orderIndex: 1 },
      { text: 'NaCl', isCorrect: false, orderIndex: 2 },
      { text: 'O₂', isCorrect: false, orderIndex: 3 },
    ],
  },

  // QUÍMICA - MEDIUM
  {
    text: '¿Cuántos moles de O₂ hay en 64 gramos de oxígeno molecular? (M(O) = 16 g/mol)',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'quimica',
    careerId: 'farmacia',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'M(O₂) = 32 g/mol. n = m/M = 64g / 32g/mol = 2 moles',
    options: [
      { text: '1 mol', isCorrect: false, orderIndex: 0 },
      { text: '2 moles', isCorrect: true, orderIndex: 1 },
      { text: '4 moles', isCorrect: false, orderIndex: 2 },
      { text: '0.5 moles', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Qué tipo de enlace químico se forma entre Na y Cl en el NaCl?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'quimica',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2022,
    examPeriod: '2022-II',
    explanation: 'Na (metal) y Cl (no metal) intercambian electrones formando un enlace iónico.',
    options: [
      { text: 'Covalente', isCorrect: false, orderIndex: 0 },
      { text: 'Iónico', isCorrect: true, orderIndex: 1 },
      { text: 'Metálico', isCorrect: false, orderIndex: 2 },
      { text: 'De hidrógeno', isCorrect: false, orderIndex: 3 },
    ],
  },

  // BIOLOGÍA - EASY
  {
    text: '¿Cuál es la unidad básica de la vida?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'biologia',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'La célula es la unidad básica de la estructura y función de todos los seres vivos.',
    options: [
      { text: 'El átomo', isCorrect: false, orderIndex: 0 },
      { text: 'La molécula', isCorrect: false, orderIndex: 1 },
      { text: 'La célula', isCorrect: true, orderIndex: 2 },
      { text: 'El órgano', isCorrect: false, orderIndex: 3 },
    ],
  },
  {
    text: '¿Qué orgánulo celular es responsable de la producción de energía (ATP)?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'biologia',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-II',
    explanation: 'Las mitocondrias son las encargadas de producir ATP mediante la respiración celular.',
    options: [
      { text: 'Núcleo', isCorrect: false, orderIndex: 0 },
      { text: 'Mitocondria', isCorrect: true, orderIndex: 1 },
      { text: 'Ribosoma', isCorrect: false, orderIndex: 2 },
      { text: 'Aparato de Golgi', isCorrect: false, orderIndex: 3 },
    ],
  },

  // BIOLOGÍA - MEDIUM
  {
    text: '¿Cuál es la diferencia fundamental entre células procariotas y eucariotas?',
    difficulty: 'MEDIUM' as DifficultyLevel,
    subjectId: 'biologia',
    careerId: 'medicina',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'Las células eucariotas tienen un núcleo definido con membrana nuclear, mientras que las procariotas no.',
    options: [
      { text: 'Las procariotas son más grandes', isCorrect: false, orderIndex: 0 },
      { text: 'Las eucariotas tienen núcleo definido', isCorrect: true, orderIndex: 1 },
      { text: 'No hay diferencia', isCorrect: false, orderIndex: 2 },
      { text: 'Las procariotas tienen mitocondrias', isCorrect: false, orderIndex: 3 },
    ],
  },

  // HISTORIA - EASY
  {
    text: '¿En qué año se independizó el Perú?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'historia',
    careerId: 'derecho',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'El Perú se independizó el 28 de julio de 1821, proclamado por el Libertador José de San Martín.',
    options: [
      { text: '1820', isCorrect: false, orderIndex: 0 },
      { text: '1821', isCorrect: true, orderIndex: 1 },
      { text: '1822', isCorrect: false, orderIndex: 2 },
      { text: '1824', isCorrect: false, orderIndex: 3 },
    ],
  },

  // GEOGRAFÍA - EASY
  {
    text: '¿Cuál es la capital del Perú?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'geografia',
    careerId: 'turismo',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'Lima es la capital del Perú y también su ciudad más grande.',
    options: [
      { text: 'Arequipa', isCorrect: false, orderIndex: 0 },
      { text: 'Lima', isCorrect: true, orderIndex: 1 },
      { text: 'Cusco', isCorrect: false, orderIndex: 2 },
      { text: 'Trujillo', isCorrect: false, orderIndex: 3 },
    ],
  },

  // ECONOMÍA - EASY
  {
    text: '¿Qué estudia la economía?',
    difficulty: 'EASY' as DifficultyLevel,
    subjectId: 'economia',
    careerId: 'administracion',
    universityId: 'unmsm',
    examYear: 2023,
    examPeriod: '2023-I',
    explanation: 'La economía estudia la asignación de recursos escasos entre usos alternativos.',
    options: [
      { text: 'Solo el dinero', isCorrect: false, orderIndex: 0 },
      { text: 'Los recursos escasos y su asignación', isCorrect: true, orderIndex: 1 },
      { text: 'Únicamente las empresas', isCorrect: false, orderIndex: 2 },
      { text: 'Los bancos', isCorrect: false, orderIndex: 3 },
    ],
  },
];

async function main() {
  console.log('🌱 Starting question seed...');

  let created = 0;
  for (const q of questions) {
    const { options, ...questionData } = q;

    // Check if question with same text already exists
    const existing = await prisma.question.findFirst({
      where: { text: questionData.text },
    });
    if (existing) {
      console.log(`  ⏭️  Skip existing: "${questionData.text.substring(0, 40)}..."`);
      continue;
    }

    await prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: options,
        },
      },
    });
    created++;
    console.log(`  ✓ Created: "${questionData.text.substring(0, 50)}..." [${questionData.difficulty}]`);
  }

  console.log(`\n✅ Done! Created ${created} new questions.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
