import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // ==========================================
  // SEED UNIVERSITIES
  // ==========================================
  
  const universities = [
    {
      id: 'unmsm',
      name: 'Universidad Nacional Mayor de San Marcos',
      shortName: 'UNMSM',
      city: 'Lima',
      region: 'Lima',
      country: 'Peru'
    },
    {
      id: 'uni',
      name: 'Universidad Nacional de Ingeniería',
      shortName: 'UNI',
      city: 'Lima',
      region: 'Lima',
      country: 'Peru'
    },
    {
      id: 'unsaac',
      name: 'Universidad Nacional de San Antonio Abad del Cusco',
      shortName: 'UNSAAC',
      city: 'Cusco',
      region: 'Cusco',
      country: 'Peru'
    }
  ]

  console.log('📚 Seeding universities...')
  for (const uni of universities) {
    await prisma.university.upsert({
      where: { id: uni.id },
      update: uni,
      create: uni
    })
    console.log(`✅ Created/Updated university: ${uni.shortName}`)
  }

  // ==========================================
  // SEED SUBJECTS
  // ==========================================
  
  const subjects = [
    {
      id: 'matematica',
      name: 'Matemática',
      description: 'Álgebra, Aritmética, Geometría, Trigonometría'
    },
    {
      id: 'comunicacion',
      name: 'Comunicación',
      description: 'Comprensión lectora, Gramática, Literatura'
    },
    {
      id: 'historia',
      name: 'Historia del Perú y Universal',
      description: 'Historia peruana, mundial y procesos históricos'
    },
    {
      id: 'geografia',
      name: 'Geografía',
      description: 'Geografía física y humana del Perú y el mundo'
    },
    {
      id: 'economia',
      name: 'Economía',
      description: 'Principios económicos y economía peruana'
    },
    {
      id: 'filosofia',
      name: 'Filosofía',
      description: 'Filosofía occidental y pensamiento crítico'
    },
    {
      id: 'fisica',
      name: 'Física',
      description: 'Mecánica, Termodinámica, Electromagnetismo'
    },
    {
      id: 'quimica',
      name: 'Química',
      description: 'Química general, orgánica e inorgánica'
    },
    {
      id: 'biologia',
      name: 'Biología',
      description: 'Biología celular, genética, evolución'
    },
    {
      id: 'psicologia',
      name: 'Psicología',
      description: 'Psicología general y educativa'
    }
  ]

  console.log('📖 Seeding subjects...')
  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { id: subject.id },
      update: subject,
      create: subject
    })
    console.log(`✅ Created/Updated subject: ${subject.name}`)
  }

  // ==========================================
  // SEED CAREERS
  // ==========================================
  
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
    { id: 'derecho', name: 'Derecho' },
    { id: 'administracion', name: 'Administración' },
    { id: 'contabilidad', name: 'Contabilidad' },
    { id: 'economia-carrera', name: 'Economía' },
    { id: 'psicologia-carrera', name: 'Psicología' },
    { id: 'educacion', name: 'Educación' },
    { id: 'comunicacion-social', name: 'Comunicación Social' },
    { id: 'turismo', name: 'Turismo y Hotelería' },
    { id: 'arquitectura', name: 'Arquitectura' },
    { id: 'arte', name: 'Arte y Diseño' }
  ]

  console.log('🎓 Seeding careers...')
  for (const career of careers) {
    await prisma.career.upsert({
      where: { id: career.id },
      update: career,
      create: career
    })
    console.log(`✅ Created/Updated career: ${career.name}`)
  }

  // ==========================================
  // SEED SAMPLE QUESTIONS (Limited for MVP)
  // ==========================================
  
  console.log('❓ Seeding sample questions...')

  // Sample questions for UNMSM - Matemática
  const sampleQuestions = [
    {
      id: 'q1-unmsm-mat',
      text: 'Si x² + 3x - 4 = 0, ¿cuáles son los valores de x?',
      difficulty: 'MEDIUM' as const,
      examYear: 2023,
      examPeriod: '2023-I',
      universityId: 'unmsm',
      subjectId: 'matematica',
      careerId: 'ing-sistemas',
      options: [
        { text: 'x = 1, x = -4', isCorrect: true, orderIndex: 0 },
        { text: 'x = 2, x = -2', isCorrect: false, orderIndex: 1 },
        { text: 'x = 4, x = -1', isCorrect: false, orderIndex: 2 },
        { text: 'x = 3, x = 1', isCorrect: false, orderIndex: 3 },
        { text: 'No tiene solución real', isCorrect: false, orderIndex: 4 }
      ]
    },
    {
      id: 'q2-unmsm-com',
      text: '¿Cuál es la función principal del sujeto en una oración?',
      difficulty: 'EASY' as const,
      examYear: 2023,
      examPeriod: '2023-I',
      universityId: 'unmsm',
      subjectId: 'comunicacion',
      careerId: 'derecho',
      options: [
        { text: 'Realizar la acción del verbo', isCorrect: true, orderIndex: 0 },
        { text: 'Complementar al objeto directo', isCorrect: false, orderIndex: 1 },
        { text: 'Modificar al predicado', isCorrect: false, orderIndex: 2 },
        { text: 'Funcionar como circunstancial', isCorrect: false, orderIndex: 3 }
      ]
    },
    {
      id: 'q3-uni-fis',
      text: 'La velocidad de la luz en el vacío es aproximadamente:',
      difficulty: 'EASY' as const,
      examYear: 2023,
      examPeriod: '2023-II',
      universityId: 'uni',
      subjectId: 'fisica',
      careerId: 'ing-electronica',
      options: [
        { text: '300,000 km/s', isCorrect: true, orderIndex: 0 },
        { text: '150,000 km/s', isCorrect: false, orderIndex: 1 },
        { text: '450,000 km/s', isCorrect: false, orderIndex: 2 },
        { text: '200,000 km/s', isCorrect: false, orderIndex: 3 },
        { text: '100,000 km/s', isCorrect: false, orderIndex: 4 }
      ]
    },
    {
      id: 'q4-unsaac-hist',
      text: '¿En qué año se fundó la ciudad del Cusco según la tradición inca?',
      difficulty: 'MEDIUM' as const,
      examYear: 2023,
      examPeriod: '2023-I',
      universityId: 'unsaac',
      subjectId: 'historia',
      careerId: 'turismo',
      options: [
        { text: 'Siglo XII (aprox. 1200 d.C.)', isCorrect: true, orderIndex: 0 },
        { text: 'Siglo X (aprox. 1000 d.C.)', isCorrect: false, orderIndex: 1 },
        { text: 'Siglo XIV (aprox. 1400 d.C.)', isCorrect: false, orderIndex: 2 },
        { text: 'Siglo XV (aprox. 1500 d.C.)', isCorrect: false, orderIndex: 3 }
      ]
    }
  ]

  for (const questionData of sampleQuestions) {
    // Create question
    const question = await prisma.question.upsert({
      where: { id: questionData.id },
      update: {
        text: questionData.text,
        difficulty: questionData.difficulty,
        examYear: questionData.examYear,
        examPeriod: questionData.examPeriod
      },
      create: {
        id: questionData.id,
        text: questionData.text,
        difficulty: questionData.difficulty,
        examYear: questionData.examYear,
        examPeriod: questionData.examPeriod,
        universityId: questionData.universityId,
        subjectId: questionData.subjectId,
        careerId: questionData.careerId,
        isActive: true
      }
    })

    // Create options
    for (const optionData of questionData.options) {
      await prisma.question_Option.upsert({
        where: {
          questionId_orderIndex: {
            questionId: question.id,
            orderIndex: optionData.orderIndex
          }
        },
        update: {
          text: optionData.text,
          isCorrect: optionData.isCorrect
        },
        create: {
          text: optionData.text,
          isCorrect: optionData.isCorrect,
          orderIndex: optionData.orderIndex,
          questionId: question.id
        }
      })
    }

    console.log(`✅ Created/Updated question: ${questionData.text.substring(0, 50)}...`)
  }

  // ==========================================
  // SUMMARY
  // ==========================================
  
  const counts = await Promise.all([
    prisma.university.count(),
    prisma.subject.count(),
    prisma.career.count(),
    prisma.question.count(),
    prisma.question_Option.count()
  ])

  console.log('📊 Seeding completed successfully!')
  console.log('📈 Database summary:')
  console.log(`   • Universities: ${counts[0]}`)
  console.log(`   • Subjects: ${counts[1]}`)
  console.log(`   • Careers: ${counts[2]}`)
  console.log(`   • Questions: ${counts[3]}`)
  console.log(`   • Question Options: ${counts[4]}`)
  console.log('✨ Ready for MVP testing!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })