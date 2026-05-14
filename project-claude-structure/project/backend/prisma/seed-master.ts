import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log('========================================');
  console.log('🚀 AMAUTA - MASTER SEED SCRIPT');
  console.log('========================================\n');

  // ==========================================
  // STEP 1: SEED UNIVERSITIES
  // ==========================================
  console.log('📚 Step 1: Seeding universities...');

  const universities = [
    { id: 'unmsm', name: 'Universidad Nacional Mayor de San Marcos', shortName: 'UNMSM', city: 'Lima', region: 'Lima', country: 'Peru' },
    { id: 'uni', name: 'Universidad Nacional de Ingeniería', shortName: 'UNI', city: 'Lima', region: 'Lima', country: 'Peru' },
    { id: 'unsaac', name: 'Universidad Nacional de San Antonio Abad del Cusco', shortName: 'UNSAAC', city: 'Cusco', region: 'Cusco', country: 'Peru' },
  ];

  for (const uni of universities) {
    await prisma.university.upsert({
      where: { id: uni.id },
      update: uni,
      create: uni
    });
    console.log(`  ✅ ${uni.shortName} - ${uni.name}`);
  }
  console.log('');

  // ==========================================
  // STEP 2: SEED SUBJECTS
  // ==========================================
  console.log('📖 Step 2: Seeding subjects...');

  const subjects = [
    { id: 'matematica', name: 'Matemática', description: 'Álgebra, Aritmética, Geometría, Trigonometría' },
    { id: 'comunicacion', name: 'Comunicación', description: 'Comprensión lectora, Gramática, Literatura' },
    { id: 'historia', name: 'Historia del Perú y Universal', description: 'Historia peruana, mundial y procesos históricos' },
    { id: 'geografia', name: 'Geografía', description: 'Geografía física y humana del Perú y el mundo' },
    { id: 'economia', name: 'Economía', description: 'Principios económicos y economía peruana' },
    { id: 'filosofia', name: 'Filosofía', description: 'Filosofía occidental y pensamiento crítico' },
    { id: 'fisica', name: 'Física', description: 'Mecánica, Termodinámica, Electromagnetismo' },
    { id: 'quimica', name: 'Química', description: 'Química general, orgánica e inorgánica' },
    { id: 'biologia', name: 'Biología', description: 'Biología celular, genética, evolución' },
    { id: 'psicologia', name: 'Psicología', description: 'Psicología general y educativa' },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { id: subject.id },
      update: subject,
      create: subject
    });
    console.log(`  ✅ ${subject.name}`);
  }
  console.log('');

  // ==========================================
  // STEP 3: SEED CAREERS
  // ==========================================
  console.log('🎓 Step 3: Seeding careers...');

  const careers = [
    { id: 'medicina', name: 'Medicina Humana' },
    { id: 'odontologia', name: 'Odontología' },
    { id: 'veterinaria', name: 'Medicina Veterinaria' },
    { id: 'enfermeria', name: 'Enfermería' },
    { id: 'farmacia', name: 'Farmacia y Bioquímica' },
    { id: 'ing-sistemas', name: 'Ingeniería de Sistemas' },
    { id: 'ing-industrial', name: 'Ingeniería Industrial' },
    { id: 'ing-civil', name: 'Ingeniería Civil' },
    { id: 'ing-electronica', name: 'Ingeniería Electrónica' },
    { id: 'ing-mecanica', name: 'Ingeniería Mecánica' },
    { id: 'ing-quimica', name: 'Ingeniería Química' },
    { id: 'derecho', name: 'Derecho' },
    { id: 'administracion', name: 'Administración' },
    { id: 'contabilidad', name: 'Contabilidad' },
    { id: 'economia-carrera', name: 'Economía' },
    { id: 'psicologia-carrera', name: 'Psicología' },
    { id: 'educacion', name: 'Educación' },
    { id: 'comunicacion-social', name: 'Comunicación Social' },
    { id: 'turismo', name: 'Turismo y Hotelería' },
    { id: 'arquitectura', name: 'Arquitectura' },
  ];

  for (const career of careers) {
    await prisma.career.upsert({
      where: { id: career.id },
      update: career,
      create: career
    });
    console.log(`  ✅ ${career.name}`);
  }
  console.log('');

  // ==========================================
  // STEP 4: SEED CAREER-SUBJECT RELATIONS
  // ==========================================
  console.log('🔗 Step 4: Seeding career-subject relations...');

  const careerSubjectsConfig = [
    { careerName: 'Administración', subjectNames: ['Matemática', 'Comunicación', 'Economía', 'Historia'] },
    { careerName: 'Medicina Humana', subjectNames: ['Biología', 'Química', 'Física', 'Matemática'] },
    { careerName: 'Ingeniería de Sistemas', subjectNames: ['Matemática', 'Física', 'Comunicación'] },
    { careerName: 'Derecho', subjectNames: ['Historia', 'Comunicación', 'Filosofía', 'Economía'] },
    { careerName: 'Educación', subjectNames: ['Comunicación', 'Historia', 'Filosofía', 'Matemática'] },
    { careerName: 'Comunicación Social', subjectNames: ['Comunicación', 'Historia', 'Filosofía'] },
    { careerName: 'Turismo y Hotelería', subjectNames: ['Historia', 'Geografía', 'Economía', 'Comunicación'] },
    { careerName: 'Economía', subjectNames: ['Matemática', 'Economía', 'Historia', 'Geografía'] },
    { careerName: 'Ingeniería Civil', subjectNames: ['Matemática', 'Física', 'Química'] },
    { careerName: 'Arquitectura', subjectNames: ['Matemática', 'Física', 'Historia', 'Geografía'] },
  ];

  for (const config of careerSubjectsConfig) {
    const career = await prisma.career.findUnique({ where: { name: config.careerName } });
    if (!career) {
      console.log(`  ⚠️  Career not found: ${config.careerName}`);
      continue;
    }

    // Delete existing relations
    await prisma.careerSubject.deleteMany({ where: { careerId: career.id } });

    // Create new relations
    for (const subjectName of config.subjectNames) {
      const subject = await prisma.subject.findUnique({ where: { name: subjectName } });
      if (subject) {
        await prisma.careerSubject.create({ data: { careerId: career.id, subjectId: subject.id } });
      }
    }
    console.log(`  ✅ ${config.careerName}: ${config.subjectNames.length} subjects linked`);
  }
  console.log('');

  // ==========================================
  // STEP 5: SEED UNMSM QUESTIONS (from seed-questions.ts)
  // ==========================================
  console.log('❓ Step 5: Seeding UNMSM questions...');

  const unmsmQuestions = [
    // MATEMÁTICA
    { text: 'Si x + 5 = 12, ¿cuál es el valor de x?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'x + 5 = 12 → x = 12 - 5 → x = 7', options: [{ text: '5', isCorrect: false, orderIndex: 0 }, { text: '6', isCorrect: false, orderIndex: 1 }, { text: '7', isCorrect: true, orderIndex: 2 }, { text: '8', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuánto es el 25% de 80?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: '25% de 80 = (25/100) × 80 = 20', options: [{ text: '10', isCorrect: false, orderIndex: 0 }, { text: '15', isCorrect: false, orderIndex: 1 }, { text: '20', isCorrect: true, orderIndex: 2 }, { text: '25', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si un triángulo tiene lados de 3 cm, 4 cm y 5 cm, ¿es un triángulo rectángulo?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-civil', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: '3² + 4² = 9 + 16 = 25 = 5². Cumple el teorema de Pitágoras, sí es rectángulo.', options: [{ text: 'Sí, porque 3² + 4² = 5²', isCorrect: true, orderIndex: 0 }, { text: 'No, porque los lados no son iguales', isCorrect: false, orderIndex: 1 }, { text: 'Sí, porque todos sus lados son menores que 10', isCorrect: false, orderIndex: 2 }, { text: 'No, porque 3 + 4 = 7 < 5', isCorrect: false, orderIndex: 3 }] },
    { text: 'Resuelve: 2x² - 8 = 0', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: '2x² = 8 → x² = 4 → x = ±2', options: [{ text: 'x = 2', isCorrect: false, orderIndex: 0 }, { text: 'x = -2', isCorrect: false, orderIndex: 1 }, { text: 'x = ±2', isCorrect: true, orderIndex: 2 }, { text: 'x = 4', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es el resultado de log₂(32)?', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: 'log₂(32) = log₂(2⁵) = 5', options: [{ text: '3', isCorrect: false, orderIndex: 0 }, { text: '4', isCorrect: false, orderIndex: 1 }, { text: '5', isCorrect: true, orderIndex: 2 }, { text: '6', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si sen(θ) = 3/5 y θ está en el primer cuadrante, ¿cuánto vale cos(θ)?', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-industrial', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-II', explanation: 'sen²θ + cos²θ = 1 → cos²θ = 1 - (9/25) = 16/25 → cos(θ) = 4/5', options: [{ text: '3/4', isCorrect: false, orderIndex: 0 }, { text: '4/5', isCorrect: true, orderIndex: 1 }, { text: '5/3', isCorrect: false, orderIndex: 2 }, { text: '5/4', isCorrect: false, orderIndex: 3 }] },
    { text: 'Calcula: lim(x→0) (sen(3x)/x)', difficulty: 'HARD', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'lim(x→0) sen(ax)/x = a. Entonces lim(x→0) sen(3x)/x = 3', options: [{ text: '0', isCorrect: false, orderIndex: 0 }, { text: '1', isCorrect: false, orderIndex: 1 }, { text: '3', isCorrect: true, orderIndex: 2 }, { text: '1/3', isCorrect: false, orderIndex: 3 }] },
    { text: 'Halla la derivada de f(x) = e^(2x) · ln(x)', difficulty: 'HARD', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: "f'(x) = e^(2x)·2·ln(x) + e^(2x)·(1/x) = e^(2x)(2ln(x) + 1/x)", options: [{ text: 'e^(2x)(2ln(x) + 1/x)', isCorrect: true, orderIndex: 0 }, { text: '2e^(2x) · ln(x)', isCorrect: false, orderIndex: 1 }, { text: 'e^(2x)/x', isCorrect: false, orderIndex: 2 }, { text: "e^(2x)(ln(x) + 1/x)", isCorrect: false, orderIndex: 3 }] },
    { text: 'Calcula la integral definida: ∫₀¹ x² dx', difficulty: 'HARD', subjectId: 'matematica', careerId: 'ing-civil', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-I', explanation: '∫x²dx = x³/3. Evaluando de 0 a 1: (1³/3) - (0³/3) = 1/3', options: [{ text: '1/2', isCorrect: false, orderIndex: 0 }, { text: '1/3', isCorrect: true, orderIndex: 1 }, { text: '1', isCorrect: false, orderIndex: 2 }, { text: '2/3', isCorrect: false, orderIndex: 3 }] },

    // COMUNICACIÓN
    { text: '"El niño estudia mucho." ¿Cuál es el sujeto de esta oración?', difficulty: 'EASY', subjectId: 'comunicacion', careerId: 'derecho', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'El sujeto es "El niño" porque es quien realiza la acción de estudiar.', options: [{ text: 'El niño', isCorrect: true, orderIndex: 0 }, { text: 'estudia', isCorrect: false, orderIndex: 1 }, { text: 'mucho', isCorrect: false, orderIndex: 2 }, { text: 'La oración completa', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál de las siguientes palabras es un adverbio?', difficulty: 'EASY', subjectId: 'comunicacion', careerId: 'educacion', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: '"Muy" es un adverbio de cantidad. "Blanco" es un adjetivo, "mesa" es un sustantivo y "correr" es un verbo.', options: [{ text: 'Blanco', isCorrect: false, orderIndex: 0 }, { text: 'Muy', isCorrect: true, orderIndex: 1 }, { text: 'Mesa', isCorrect: false, orderIndex: 2 }, { text: 'Correr', isCorrect: false, orderIndex: 3 }] },
    { text: '¿A qué género literario pertenece "La Odisea" de Homero?', difficulty: 'MEDIUM', subjectId: 'comunicacion', careerId: 'derecho', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'La Odisea es una epopeya, un poema épico que narra las aventuras de Odiseo en su regreso a Ítaca.', options: [{ text: 'Lírico', isCorrect: false, orderIndex: 0 }, { text: 'Narrativo', isCorrect: false, orderIndex: 1 }, { text: 'Épico (epopeya)', isCorrect: true, orderIndex: 2 }, { text: 'Dramático', isCorrect: false, orderIndex: 3 }] },
    { text: '"Caminante, no hay camino, se hace camino al andar." ¿A qué poeta pertenece?', difficulty: 'MEDIUM', subjectId: 'comunicacion', careerId: 'educacion', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-II', explanation: 'Estos versos pertenecen a Antonio Machado, poeta español de la Generación del 98.', options: [{ text: 'Pablo Neruda', isCorrect: false, orderIndex: 0 }, { text: 'Antonio Machado', isCorrect: true, orderIndex: 1 }, { text: 'Federico García Lorca', isCorrect: false, orderIndex: 2 }, { text: 'Rubén Darío', isCorrect: false, orderIndex: 3 }] },

    // FÍSICA
    { text: '¿Cuál es la unidad de medida de la fuerza en el Sistema Internacional?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'ing-civil', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'En el SI, la fuerza se mide en Newton (N), que equivale a kg·m/s².', options: [{ text: 'Julio (J)', isCorrect: false, orderIndex: 0 }, { text: 'Newton (N)', isCorrect: true, orderIndex: 1 }, { text: 'Watt (W)', isCorrect: false, orderIndex: 2 }, { text: 'Pascal (Pa)', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si un auto recorre 100 km en 2 horas, ¿cuál es su velocidad promedio?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'ing-mecanica', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: 'v = d/t = 100 km / 2 h = 50 km/h', options: [{ text: '25 km/h', isCorrect: false, orderIndex: 0 }, { text: '50 km/h', isCorrect: true, orderIndex: 1 }, { text: '100 km/h', isCorrect: false, orderIndex: 2 }, { text: '200 km/h', isCorrect: false, orderIndex: 3 }] },
    { text: 'Un cuerpo se lanza verticalmente hacia arriba con una velocidad de 20 m/s. ¿Qué altura máxima alcanza? (g = 10 m/s²)', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-civil', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'h = v₀²/(2g) = (20)²/(2×10) = 400/20 = 20 m', options: [{ text: '10 m', isCorrect: false, orderIndex: 0 }, { text: '20 m', isCorrect: true, orderIndex: 1 }, { text: '40 m', isCorrect: false, orderIndex: 2 }, { text: '200 m', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la energía cinética de un cuerpo de masa 4 kg que se mueve a 3 m/s?', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-mecanica', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-II', explanation: 'Ec = (1/2)mv² = (1/2)(4)(3)² = 2 × 9 = 18 J', options: [{ text: '12 J', isCorrect: false, orderIndex: 0 }, { text: '18 J', isCorrect: true, orderIndex: 1 }, { text: '36 J', isCorrect: false, orderIndex: 2 }, { text: '24 J', isCorrect: false, orderIndex: 3 }] },
    { text: 'Un resistor de 12 Ω está conectado a una fuente de 24 V. ¿Cuál es la corriente que circula por el circuito?', difficulty: 'HARD', subjectId: 'fisica', careerId: 'ing-electronica', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'Por la Ley de Ohm: I = V/R = 24V / 12Ω = 2 A', options: [{ text: '0.5 A', isCorrect: false, orderIndex: 0 }, { text: '2 A', isCorrect: true, orderIndex: 1 }, { text: '12 A', isCorrect: false, orderIndex: 2 }, { text: '288 A', isCorrect: false, orderIndex: 3 }] },
    { text: 'Un auto de 1000 kg toma una curva de radio 50 m a 36 km/h. ¿Cuál es la fuerza centrípeta necesaria?', difficulty: 'HARD', subjectId: 'fisica', careerId: 'ing-civil', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-I', explanation: 'v = 36 km/h = 10 m/s. Fc = mv²/r = (1000)(10)²/50 = 2000 N', options: [{ text: '1000 N', isCorrect: false, orderIndex: 0 }, { text: '2000 N', isCorrect: true, orderIndex: 1 }, { text: '3600 N', isCorrect: false, orderIndex: 2 }, { text: '5000 N', isCorrect: false, orderIndex: 3 }] },

    // QUÍMICA
    { text: '¿Cuántos electrones tiene el átomo de carbono (C) en su estado neutro?', difficulty: 'EASY', subjectId: 'quimica', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'El carbono tiene número atómico 6, por lo tanto tiene 6 electrones en estado neutro.', options: [{ text: '4', isCorrect: false, orderIndex: 0 }, { text: '6', isCorrect: true, orderIndex: 1 }, { text: '12', isCorrect: false, orderIndex: 2 }, { text: '8', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la fórmula química del agua?', difficulty: 'EASY', subjectId: 'quimica', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: 'El agua está compuesta por dos átomos de hidrógeno y uno de oxígeno: H₂O.', options: [{ text: 'CO₂', isCorrect: false, orderIndex: 0 }, { text: 'H₂O', isCorrect: true, orderIndex: 1 }, { text: 'NaCl', isCorrect: false, orderIndex: 2 }, { text: 'O₂', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuántos moles de O₂ hay en 64 gramos de oxígeno molecular? (M(O) = 16 g/mol)', difficulty: 'MEDIUM', subjectId: 'quimica', careerId: 'farmacia', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'M(O₂) = 32 g/mol. n = m/M = 64g / 32g/mol = 2 moles', options: [{ text: '1 mol', isCorrect: false, orderIndex: 0 }, { text: '2 moles', isCorrect: true, orderIndex: 1 }, { text: '4 moles', isCorrect: false, orderIndex: 2 }, { text: '0.5 moles', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué tipo de enlace químico se forma entre Na y Cl en el NaCl?', difficulty: 'MEDIUM', subjectId: 'quimica', careerId: 'medicina', universityId: 'unmsm', examYear: 2022, examPeriod: '2022-II', explanation: 'Na (metal) y Cl (no metal) intercambian electrones formando un enlace iónico.', options: [{ text: 'Covalente', isCorrect: false, orderIndex: 0 }, { text: 'Iónico', isCorrect: true, orderIndex: 1 }, { text: 'Metálico', isCorrect: false, orderIndex: 2 }, { text: 'De hidrógeno', isCorrect: false, orderIndex: 3 }] },

    // BIOLOGÍA
    { text: '¿Cuál es la unidad básica de la vida?', difficulty: 'EASY', subjectId: 'biologia', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'La célula es la unidad básica de la estructura y función de todos los seres vivos.', options: [{ text: 'El átomo', isCorrect: false, orderIndex: 0 }, { text: 'La molécula', isCorrect: false, orderIndex: 1 }, { text: 'La célula', isCorrect: true, orderIndex: 2 }, { text: 'El órgano', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué orgánulo celular es responsable de la producción de energía (ATP)?', difficulty: 'EASY', subjectId: 'biologia', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-II', explanation: 'Las mitocondrias son las encargadas de producir ATP mediante la respiración celular.', options: [{ text: 'Núcleo', isCorrect: false, orderIndex: 0 }, { text: 'Mitocondria', isCorrect: true, orderIndex: 1 }, { text: 'Ribosoma', isCorrect: false, orderIndex: 2 }, { text: 'Aparato de Golgi', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la diferencia fundamental entre células procariotas y eucariotas?', difficulty: 'MEDIUM', subjectId: 'biologia', careerId: 'medicina', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'Las células eucariotas tienen un núcleo definido con membrana nuclear, mientras que las procariotas no.', options: [{ text: 'Las procariotas son más grandes', isCorrect: false, orderIndex: 0 }, { text: 'Las eucariotas tienen núcleo definido', isCorrect: true, orderIndex: 1 }, { text: 'No hay diferencia', isCorrect: false, orderIndex: 2 }, { text: 'Las procariotas tienen mitocondrias', isCorrect: false, orderIndex: 3 }] },

    // HISTORIA
    { text: '¿En qué año se independizó el Perú?', difficulty: 'EASY', subjectId: 'historia', careerId: 'derecho', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'El Perú se independizó el 28 de julio de 1821, proclamado por el Libertador José de San Martín.', options: [{ text: '1820', isCorrect: false, orderIndex: 0 }, { text: '1821', isCorrect: true, orderIndex: 1 }, { text: '1822', isCorrect: false, orderIndex: 2 }, { text: '1824', isCorrect: false, orderIndex: 3 }] },

    // GEOGRAFÍA
    { text: '¿Cuál es la capital del Perú?', difficulty: 'EASY', subjectId: 'geografia', careerId: 'turismo', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'Lima es la capital del Perú y también su ciudad más grande.', options: [{ text: 'Arequipa', isCorrect: false, orderIndex: 0 }, { text: 'Lima', isCorrect: true, orderIndex: 1 }, { text: 'Cusco', isCorrect: false, orderIndex: 2 }, { text: 'Trujillo', isCorrect: false, orderIndex: 3 }] },

    // ECONOMÍA
    { text: '¿Qué estudia la economía?', difficulty: 'EASY', subjectId: 'economia', careerId: 'administracion', universityId: 'unmsm', examYear: 2023, examPeriod: '2023-I', explanation: 'La economía estudia la asignación de recursos escasos entre usos alternativos.', options: [{ text: 'Solo el dinero', isCorrect: false, orderIndex: 0 }, { text: 'Los recursos escasos y su asignación', isCorrect: true, orderIndex: 1 }, { text: 'Únicamente las empresas', isCorrect: false, orderIndex: 2 }, { text: 'Los bancos', isCorrect: false, orderIndex: 3 }] },
  ];

  let qCreated = 0;
  for (const q of unmsmQuestions) {
    const existing = await prisma.question.findFirst({ where: { text: q.text } });
    if (existing) {
      console.log(`  ⏭️  Skip existing: "${q.text.substring(0, 40)}..."`);
      continue;
    }
    const { options, ...qData } = q;
    await prisma.question.create({
      data: { ...qData, isActive: true, options: { create: options } }
    });
    qCreated++;
    console.log(`  ✅ [UNMSM] ${q.text.substring(0, 45)}...`);
  }
  console.log('');

  // ==========================================
  // STEP 6: SEED UNI QUESTIONS
  // ==========================================
  console.log('❓ Step 6: Seeding UNI questions...');

  const uniQuestions = [
    { text: 'Si log₂(x) = 5, ¿cuál es el valor de x?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'log₂(x) = 5 → x = 2⁵ = 32', options: [{ text: '10', isCorrect: false, orderIndex: 0 }, { text: '25', isCorrect: false, orderIndex: 1 }, { text: '32', isCorrect: true, orderIndex: 2 }, { text: '64', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la derivada de f(x) = 3x² + 2x - 5?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-civil', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: "f'(x) = 6x + 2 usando la regla de la potencia", options: [{ text: '6x + 2', isCorrect: true, orderIndex: 0 }, { text: '3x + 2', isCorrect: false, orderIndex: 1 }, { text: '6x² + 2', isCorrect: false, orderIndex: 2 }, { text: '6x - 5', isCorrect: false, orderIndex: 3 }] },
    { text: 'Resolver: |x - 3| = 7', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-industrial', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: '|x-3|=7 → x-3=7 o x-3=-7 → x=10 o x=-4', options: [{ text: 'x = 10', isCorrect: false, orderIndex: 0 }, { text: 'x = -4', isCorrect: false, orderIndex: 1 }, { text: 'x = 10 o x = -4', isCorrect: true, orderIndex: 2 }, { text: 'x = 4', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuánto vale el determinante de la matriz [[2,1],[3,4]]?', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'uni', examYear: 2022, examPeriod: '2022-II', explanation: 'det = (2)(4) - (1)(3) = 8 - 3 = 5', options: [{ text: '5', isCorrect: true, orderIndex: 0 }, { text: '11', isCorrect: false, orderIndex: 1 }, { text: '7', isCorrect: false, orderIndex: 2 }, { text: '-5', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si f(x) = e^x, ¿cuál es su derivada?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-electronica', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: "La derivada de e^x es e^x (propiedad fundamental)", options: [{ text: 'e^x', isCorrect: true, orderIndex: 0 }, { text: 'x·e^(x-1)', isCorrect: false, orderIndex: 1 }, { text: 'ln(x)', isCorrect: false, orderIndex: 2 }, { text: 'e^(x+1)', isCorrect: false, orderIndex: 3 }] },
    { text: 'Calcular: ∫₀² x² dx', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-civil', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: '∫x²dx = x³/3. Evaluando de 0 a 2: (8/3) - (0) = 8/3', options: [{ text: '8/3', isCorrect: true, orderIndex: 0 }, { text: '4', isCorrect: false, orderIndex: 1 }, { text: '2', isCorrect: false, orderIndex: 2 }, { text: '16/3', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es el conjunto solución de x² - 5x + 6 = 0?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-mecanica', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'Factorizando: (x-2)(x-3)=0 → x=2 o x=3', options: [{ text: '{2, 3}', isCorrect: true, orderIndex: 0 }, { text: '{1, 6}', isCorrect: false, orderIndex: 1 }, { text: '{-2, -3}', isCorrect: false, orderIndex: 2 }, { text: '{5, 6}', isCorrect: false, orderIndex: 3 }] },
    { text: 'Calcular el MCM de 12 y 18.', difficulty: 'EASY', subjectId: 'matematica', careerId: 'ing-industrial', universityId: 'uni', examYear: 2022, examPeriod: '2022-I', explanation: '12=2²·3, 18=2·3² → MCM = 2²·3² = 36', options: [{ text: '36', isCorrect: true, orderIndex: 0 }, { text: '72', isCorrect: false, orderIndex: 1 }, { text: '6', isCorrect: false, orderIndex: 2 }, { text: '216', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la suma de los primeros 10 números naturales?', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-sistemas', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'S = n(n+1)/2 = 10(11)/2 = 55', options: [{ text: '55', isCorrect: true, orderIndex: 0 }, { text: '45', isCorrect: false, orderIndex: 1 }, { text: '110', isCorrect: false, orderIndex: 2 }, { text: '100', isCorrect: false, orderIndex: 3 }] },
    { text: 'Hallar la ecuación de la recta que pasa por (2,3) y (4,7).', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'ing-civil', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: 'm = (7-3)/(4-2) = 2. y - 3 = 2(x-2) → y = 2x - 1', options: [{ text: 'y = 2x - 1', isCorrect: true, orderIndex: 0 }, { text: 'y = x + 1', isCorrect: false, orderIndex: 1 }, { text: 'y = 2x + 1', isCorrect: false, orderIndex: 2 }, { text: 'y = 2x - 3', isCorrect: false, orderIndex: 3 }] },
    // Física UNI
    { text: '¿Qué relación hay entre fuerza, masa y aceleración según Newton?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'ing-civil', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'F = m · a (Segunda Ley de Newton)', options: [{ text: 'F = ma', isCorrect: true, orderIndex: 0 }, { text: 'F = m/a', isCorrect: false, orderIndex: 1 }, { text: 'F = m + a', isCorrect: false, orderIndex: 2 }, { text: 'F = m - a', isCorrect: false, orderIndex: 3 }] },
    { text: 'Un cuerpo cae libremente desde 80m. ¿Cuánto tiempo tarda en llegar al suelo? (g=10m/s²)', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-mecanica', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: 'h = ½gt² → 80 = ½(10)t² → t² = 16 → t = 4s', options: [{ text: '4 s', isCorrect: true, orderIndex: 0 }, { text: '8 s', isCorrect: false, orderIndex: 1 }, { text: '2 s', isCorrect: false, orderIndex: 2 }, { text: '16 s', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la energía cinética de un objeto de 2kg a 5m/s?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'ing-electronica', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'Ec = ½mv² = ½(2)(25) = 25 J', options: [{ text: '25 J', isCorrect: true, orderIndex: 0 }, { text: '10 J', isCorrect: false, orderIndex: 1 }, { text: '50 J', isCorrect: false, orderIndex: 2 }, { text: '20 J', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuántos electrones hay en 1 coulomb de carga? (e = 1.6×10⁻¹⁹ C)', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-electronica', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: 'n = Q/e = 1/(1.6×10⁻¹⁹) = 6.25×10¹⁸ electrones', options: [{ text: '6.25×10¹⁸', isCorrect: true, orderIndex: 0 }, { text: '1.6×10⁻¹⁹', isCorrect: false, orderIndex: 1 }, { text: '1.6×10¹⁹', isCorrect: false, orderIndex: 2 }, { text: '6.25×10⁻¹⁸', isCorrect: false, orderIndex: 3 }] },
    { text: '¿A qué temperatura Celsius equivalen 98°F?', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-industrial', universityId: 'uni', examYear: 2022, examPeriod: '2022-I', explanation: 'C = (F-32)×5/9 = (98-32)×5/9 = 66×5/9 = 36.67°C', options: [{ text: '36.7°C', isCorrect: true, orderIndex: 0 }, { text: '32°C', isCorrect: false, orderIndex: 1 }, { text: '45°C', isCorrect: false, orderIndex: 2 }, { text: '30°C', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué tipo de onda es el sonido?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'ing-mecanica', universityId: 'uni', examYear: 2022, examPeriod: '2022-II', explanation: 'El sonido es una onda mecánica longitudinal.', options: [{ text: 'Mecánica longitudinal', isCorrect: true, orderIndex: 0 }, { text: 'Electromagnética', isCorrect: false, orderIndex: 1 }, { text: 'Transversal', isCorrect: false, orderIndex: 2 }, { text: 'Estacionaria', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la presión en el fondo de un recipiente con 20m de agua? (ρ=1000kg/m³, g=10m/s²)', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'ing-civil', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'P = ρgh = 1000×10×20 = 200,000 Pa = 200 kPa', options: [{ text: '200 kPa', isCorrect: true, orderIndex: 0 }, { text: '100 kPa', isCorrect: false, orderIndex: 1 }, { text: '20 kPa', isCorrect: false, orderIndex: 2 }, { text: '2 kPa', isCorrect: false, orderIndex: 3 }] },
    // Química UNI
    { text: '¿Cuál es el número atómico del oxígeno?', difficulty: 'EASY', subjectId: 'quimica', careerId: 'ing-industrial', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'El oxígeno tiene Z=8 (8 protones, 8 electrones).', options: [{ text: '8', isCorrect: true, orderIndex: 0 }, { text: '16', isCorrect: false, orderIndex: 1 }, { text: '6', isCorrect: false, orderIndex: 2 }, { text: '2', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué tipo de reacción es: 2H₂ + O₂ → 2H₂O?', difficulty: 'MEDIUM', subjectId: 'quimica', careerId: 'ing-quimica', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: 'Dos sustancias (H₂ y O₂) forman una sola (H₂O): es una reacción de síntesis/combinación.', options: [{ text: 'Síntesis (combinación)', isCorrect: true, orderIndex: 0 }, { text: 'Descomposición', isCorrect: false, orderIndex: 1 }, { text: 'Sustitución simple', isCorrect: false, orderIndex: 2 }, { text: 'Neutralización', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuántos moles hay en 36g de agua? (M(H₂O) = 18 g/mol)', difficulty: 'MEDIUM', subjectId: 'quimica', careerId: 'ing-industrial', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'n = m/M = 36g / 18g/mol = 2 moles', options: [{ text: '2 moles', isCorrect: true, orderIndex: 0 }, { text: '1 mol', isCorrect: false, orderIndex: 1 }, { text: '0.5 moles', isCorrect: false, orderIndex: 2 }, { text: '18 moles', isCorrect: false, orderIndex: 3 }] },
    // Comunicación UNI
    { text: '¿Qué tipo de texto es una receta de cocina?', difficulty: 'EASY', subjectId: 'comunicacion', careerId: 'ing-industrial', universityId: 'uni', examYear: 2023, examPeriod: '2023-I', explanation: 'Una receta de cocina es un texto instructivo/secuencial.', options: [{ text: 'Instructivo', isCorrect: true, orderIndex: 0 }, { text: 'Narrativo', isCorrect: false, orderIndex: 1 }, { text: 'Descriptivo', isCorrect: false, orderIndex: 2 }, { text: 'Argumentativo', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué figura retórica usa: "El tiempo es un río"?', difficulty: 'MEDIUM', subjectId: 'comunicacion', careerId: 'derecho', universityId: 'uni', examYear: 2023, examPeriod: '2023-II', explanation: 'Se compara el tiempo con un río: es una metáfora.', options: [{ text: 'Metáfora', isCorrect: true, orderIndex: 0 }, { text: 'Metonimia', isCorrect: false, orderIndex: 1 }, { text: 'Hipérbole', isCorrect: false, orderIndex: 2 }, { text: 'Comparación', isCorrect: false, orderIndex: 3 }] },
  ];

  for (const q of uniQuestions) {
    const existing = await prisma.question.findFirst({ where: { text: q.text } });
    if (existing) {
      console.log(`  ⏭️  Skip existing: "${q.text.substring(0, 40)}..."`);
      continue;
    }
    const { options, ...qData } = q;
    await prisma.question.create({
      data: { ...qData, isActive: true, options: { create: options } }
    });
    qCreated++;
    console.log(`  ✅ [UNI] ${q.text.substring(0, 45)}...`);
  }
  console.log('');

  // ==========================================
  // STEP 7: SEED UNSAAC QUESTIONS
  // ==========================================
  console.log('❓ Step 7: Seeding UNSAAC questions...');

  const unsaacQuestions = [
    { text: '¿Cuánto es √144?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: '√144 = 12', options: [{ text: '12', isCorrect: true, orderIndex: 0 }, { text: '14', isCorrect: false, orderIndex: 1 }, { text: '11', isCorrect: false, orderIndex: 2 }, { text: '72', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si 3x + 7 = 16, ¿cuál es x?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: '3x=9 → x=3', options: [{ text: '3', isCorrect: true, orderIndex: 0 }, { text: '9', isCorrect: false, orderIndex: 1 }, { text: '7', isCorrect: false, orderIndex: 2 }, { text: '5', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es el área de un círculo de radio 7cm?', difficulty: 'MEDIUM', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'A=πr²=154cm²', options: [{ text: '154 cm²', isCorrect: true, orderIndex: 0 }, { text: '44 cm²', isCorrect: false, orderIndex: 1 }, { text: '77 cm²', isCorrect: false, orderIndex: 2 }, { text: '22 cm²', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué porcentaje es 25 de 200?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-II', explanation: '(25/200)×100=12.5%', options: [{ text: '12.5%', isCorrect: true, orderIndex: 0 }, { text: '25%', isCorrect: false, orderIndex: 1 }, { text: '50%', isCorrect: false, orderIndex: 2 }, { text: '8%', isCorrect: false, orderIndex: 3 }] },
    { text: 'Hallar el perímetro de un rectángulo de 8cm×5cm.', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'P=2(8+5)=26cm', options: [{ text: '26 cm', isCorrect: true, orderIndex: 0 }, { text: '40 cm', isCorrect: false, orderIndex: 1 }, { text: '13 cm', isCorrect: false, orderIndex: 2 }, { text: '20 cm', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuánto es 15% de 80?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: '(15/100)×80=12', options: [{ text: '12', isCorrect: true, orderIndex: 0 }, { text: '15', isCorrect: false, orderIndex: 1 }, { text: '8', isCorrect: false, orderIndex: 2 }, { text: '20', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuántos lados tiene un hexágono?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-I', explanation: 'Hex=6', options: [{ text: '6', isCorrect: true, orderIndex: 0 }, { text: '5', isCorrect: false, orderIndex: 1 }, { text: '8', isCorrect: false, orderIndex: 2 }, { text: '7', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la suma de ángulos internos de un triángulo?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Siempre 180°', options: [{ text: '180°', isCorrect: true, orderIndex: 0 }, { text: '360°', isCorrect: false, orderIndex: 1 }, { text: '90°', isCorrect: false, orderIndex: 2 }, { text: '270°', isCorrect: false, orderIndex: 3 }] },
    { text: 'Si un tren recorre 240km en 3h, ¿cuál es su velocidad?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'v=240/3=80km/h', options: [{ text: '80 km/h', isCorrect: true, orderIndex: 0 }, { text: '60 km/h', isCorrect: false, orderIndex: 1 }, { text: '720 km/h', isCorrect: false, orderIndex: 2 }, { text: '40 km/h', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuánto es 2⁴?', difficulty: 'EASY', subjectId: 'matematica', careerId: 'administracion', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-I', explanation: '2×2×2×2=16', options: [{ text: '16', isCorrect: true, orderIndex: 0 }, { text: '8', isCorrect: false, orderIndex: 1 }, { text: '32', isCorrect: false, orderIndex: 2 }, { text: '6', isCorrect: false, orderIndex: 3 }] },
    // Física UNSAAC
    { text: '¿Cuál es la unidad de medida de la energía en el SI?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Joule (J)', options: [{ text: 'Joule (J)', isCorrect: true, orderIndex: 0 }, { text: 'Watt (W)', isCorrect: false, orderIndex: 1 }, { text: 'Newton (N)', isCorrect: false, orderIndex: 2 }, { text: 'Pascal (Pa)', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué tipo de energía tiene un auto en movimiento?', difficulty: 'EASY', subjectId: 'fisica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'Ec=½mv²', options: [{ text: 'Cinética', isCorrect: true, orderIndex: 0 }, { text: 'Potencial', isCorrect: false, orderIndex: 1 }, { text: 'Térmica', isCorrect: false, orderIndex: 2 }, { text: 'Química', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué ley dice P1V1=P2V2?', difficulty: 'MEDIUM', subjectId: 'fisica', careerId: 'administracion', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-II', explanation: 'Ley de Boyle', options: [{ text: 'Ley de Boyle', isCorrect: true, orderIndex: 0 }, { text: 'Ley de Charles', isCorrect: false, orderIndex: 1 }, { text: 'Ley de Gay-Lussac', isCorrect: false, orderIndex: 2 }, { text: 'Principio de Arquímedes', isCorrect: false, orderIndex: 3 }] },
    // Química UNSAAC
    { text: '¿Qué tipo de enlace se forma entre Na y Cl?', difficulty: 'EASY', subjectId: 'quimica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Metal+No metal=iónico', options: [{ text: 'Iónico', isCorrect: true, orderIndex: 0 }, { text: 'Covalente', isCorrect: false, orderIndex: 1 }, { text: 'Metálico', isCorrect: false, orderIndex: 2 }, { text: 'De hidrógeno', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuál es la masa molar del CO2? (C=12, O=16)', difficulty: 'MEDIUM', subjectId: 'quimica', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: '12+32=44g/mol', options: [{ text: '44 g/mol', isCorrect: true, orderIndex: 0 }, { text: '28 g/mol', isCorrect: false, orderIndex: 1 }, { text: '40 g/mol', isCorrect: false, orderIndex: 2 }, { text: '60 g/mol', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué significa pH = 7?', difficulty: 'EASY', subjectId: 'quimica', careerId: 'administracion', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-I', explanation: 'Neutro', options: [{ text: 'Solución neutra', isCorrect: true, orderIndex: 0 }, { text: 'Solución ácida', isCorrect: false, orderIndex: 1 }, { text: 'Solución básica', isCorrect: false, orderIndex: 2 }, { text: 'Muy ácida', isCorrect: false, orderIndex: 3 }] },
    // Comunicación UNSAAC
    { text: '¿Qué es un sustantivo?', difficulty: 'EASY', subjectId: 'comunicacion', careerId: 'educacion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Palabra que nombra', options: [{ text: 'Palabra que nombra seres/cosas', isCorrect: true, orderIndex: 0 }, { text: 'Palabra que indica acción', isCorrect: false, orderIndex: 1 }, { text: 'Palabra que modifica', isCorrect: false, orderIndex: 2 }, { text: 'Palabra que une', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué tipo de texto es una noticia?', difficulty: 'EASY', subjectId: 'comunicacion', careerId: 'comunicacion-social', universityId: 'unsaac', examYear: 2022, examPeriod: '2022-I', explanation: 'Informa hechos actuales', options: [{ text: 'Informativo', isCorrect: true, orderIndex: 0 }, { text: 'Narrativo', isCorrect: false, orderIndex: 1 }, { text: 'Literario', isCorrect: false, orderIndex: 2 }, { text: 'Publicitario', isCorrect: false, orderIndex: 3 }] },
    // Historia UNSAAC
    { text: '¿Qué imperio se fundó en el Cusco?', difficulty: 'EASY', subjectId: 'historia', careerId: 'turismo', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Tahuantinsuyo (Inca)', options: [{ text: 'Imperio Inca', isCorrect: true, orderIndex: 0 }, { text: 'Imperio Wari', isCorrect: false, orderIndex: 1 }, { text: 'Imperio Mochica', isCorrect: false, orderIndex: 2 }, { text: 'Imperio Tiahuanaco', isCorrect: false, orderIndex: 3 }] },
    { text: '¿En qué siglo se descubrieron las Américas?', difficulty: 'EASY', subjectId: 'historia', careerId: 'turismo', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: '1492 = siglo XV', options: [{ text: 'Siglo XV', isCorrect: true, orderIndex: 0 }, { text: 'Siglo XIV', isCorrect: false, orderIndex: 1 }, { text: 'Siglo XVI', isCorrect: false, orderIndex: 2 }, { text: 'Siglo XIII', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Quién conquistó el Imperio Inca?', difficulty: 'EASY', subjectId: 'historia', careerId: 'turismo', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Francisco Pizarro', options: [{ text: 'Francisco Pizarro', isCorrect: true, orderIndex: 0 }, { text: 'Hernando de Soto', isCorrect: false, orderIndex: 1 }, { text: 'Pedro de Alvarado', isCorrect: false, orderIndex: 2 }, { text: 'Sebastián de Orellana', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué fue la Rebelión de Túpac Amaru II?', difficulty: 'MEDIUM', subjectId: 'historia', careerId: 'derecho', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'Movimiento independentista indígena', options: [{ text: 'Movimiento independentista indígena', isCorrect: true, orderIndex: 0 }, { text: 'Guerra entre criollos', isCorrect: false, orderIndex: 1 }, { text: 'Revuelta por esclavitud', isCorrect: false, orderIndex: 2 }, { text: 'Rebelión por independencia de Brasil', isCorrect: false, orderIndex: 3 }] },
    // Geografía UNSAAC
    { text: '¿Cuál es el río más largo del mundo?', difficulty: 'EASY', subjectId: 'geografia', careerId: 'turismo', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Amazonas (~6400km)', options: [{ text: 'Amazonas', isCorrect: true, orderIndex: 0 }, { text: 'Nilo', isCorrect: false, orderIndex: 1 }, { text: 'Yangtsé', isCorrect: false, orderIndex: 2 }, { text: 'Misisipi', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué cordillera atraviesa el Perú?', difficulty: 'EASY', subjectId: 'geografia', careerId: 'turismo', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'Cordillera de los Andes', options: [{ text: 'Cordillera de los Andes', isCorrect: true, orderIndex: 0 }, { text: 'Cordillera Blanca', isCorrect: false, orderIndex: 1 }, { text: 'Sierra Central', isCorrect: false, orderIndex: 2 }, { text: 'Zona Interandina', isCorrect: false, orderIndex: 3 }] },
    // Economía UNSAAC
    { text: '¿Qué es el PBI?', difficulty: 'MEDIUM', subjectId: 'economia', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Valor total bienes/servicios de un país', options: [{ text: 'Valor total de bienes/servicios', isCorrect: true, orderIndex: 0 }, { text: 'Ingreso per cápita', isCorrect: false, orderIndex: 1 }, { text: 'Total de exportaciones', isCorrect: false, orderIndex: 2 }, { text: 'Deuda externa', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué es la inflación?', difficulty: 'EASY', subjectId: 'economia', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'Aumento generalizado de precios', options: [{ text: 'Aumento generalizado de precios', isCorrect: true, orderIndex: 0 }, { text: 'Caída de precios', isCorrect: false, orderIndex: 1 }, { text: 'Estabilidad de precios', isCorrect: false, orderIndex: 2 }, { text: 'Aumento del desempleo', isCorrect: false, orderIndex: 3 }] },
    // Filosofía UNSAAC
    { text: '¿Quién escribió El Príncipe?', difficulty: 'EASY', subjectId: 'filosofia', careerId: 'derecho', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Nicolás Maquiavelo (1513)', options: [{ text: 'Nicolás Maquiavelo', isCorrect: true, orderIndex: 0 }, { text: 'Thomas Hobbes', isCorrect: false, orderIndex: 1 }, { text: 'Jean-Jacques Rousseau', isCorrect: false, orderIndex: 2 }, { text: 'Platón', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Qué es el método dialéctico?', difficulty: 'MEDIUM', subjectId: 'filosofia', careerId: 'educacion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: 'Tesis+Antítesis=Síntesis (Hegel)', options: [{ text: 'Tesis + Antítesis = Síntesis', isCorrect: true, orderIndex: 0 }, { text: 'Solo observación directa', isCorrect: false, orderIndex: 1 }, { text: 'Experimentación de laboratorio', isCorrect: false, orderIndex: 2 }, { text: 'Intuición pura del conocimiento', isCorrect: false, orderIndex: 3 }] },
    // Biología UNSAAC
    { text: '¿Qué organelo realiza la fotosíntesis?', difficulty: 'EASY', subjectId: 'biologia', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-I', explanation: 'Cloroplasto', options: [{ text: 'Cloroplasto', isCorrect: true, orderIndex: 0 }, { text: 'Mitocondria', isCorrect: false, orderIndex: 1 }, { text: 'Ribosoma', isCorrect: false, orderIndex: 2 }, { text: 'Núcleo', isCorrect: false, orderIndex: 3 }] },
    { text: '¿Cuántos cromosomas tiene una célula humana?', difficulty: 'EASY', subjectId: 'biologia', careerId: 'administracion', universityId: 'unsaac', examYear: 2023, examPeriod: '2023-II', explanation: '46 cromosomas (23 pares)', options: [{ text: '46', isCorrect: true, orderIndex: 0 }, { text: '23', isCorrect: false, orderIndex: 1 }, { text: '48', isCorrect: false, orderIndex: 2 }, { text: '44', isCorrect: false, orderIndex: 3 }] },
  ];

  for (const q of unsaacQuestions) {
    const existing = await prisma.question.findFirst({ where: { text: q.text } });
    if (existing) {
      console.log(`  ⏭️  Skip existing: "${q.text.substring(0, 40)}..."`);
      continue;
    }
    const { options, ...qData } = q;
    await prisma.question.create({
      data: { ...qData, isActive: true, options: { create: options } }
    });
    qCreated++;
    console.log(`  ✅ [UNSAAC] ${q.text.substring(0, 45)}...`);
  }
  console.log('');

  // ==========================================
  // SUMMARY
  // ==========================================
  const counts = await Promise.all([
    prisma.university.count(),
    prisma.subject.count(),
    prisma.career.count(),
    prisma.question.count(),
    prisma.question_Option.count(),
  ]);

  console.log('========================================');
  console.log('📊 SEEDING COMPLETE!');
  console.log('========================================');
  console.log(`   • Universities: ${counts[0]}`);
  console.log(`   • Subjects: ${counts[1]}`);
  console.log(`   • Careers: ${counts[2]}`);
  console.log(`   • Questions: ${counts[3]}`);
  console.log(`   • Question Options: ${counts[4]}`);
  console.log('✨ Ready for testing!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());