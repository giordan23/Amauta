import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuración de materias por carrera (definida via prompt de IA)
// Esta configuración determina qué materias entran en cada carrera
const careerSubjectsConfig = [
  // Administración - materias base
  { careerName: 'Administración', subjectNames: ['Matemática', 'Comunicación', 'Economía', 'Historia'] },
  
  // Medicina
  { careerName: 'Medicina', subjectNames: ['Biología', 'Química', 'Física', 'Matemática'] },
  
  // Ingeniería de Sistemas
  { careerName: 'Ingeniería de Sistemas', subjectNames: ['Matemática', 'Física', 'Comunicación'] },
  
  // Derecho
  { careerName: 'Derecho', subjectNames: ['Historia', 'Comunicación', 'Filosofía', 'Economía'] },
  
  // Educación
  { careerName: 'Educación', subjectNames: ['Comunicación', 'Historia', 'Filosofía', 'Matemática'] },
  
  // Comunicación Social
  { careerName: 'Comunicación Social', subjectNames: ['Comunicación', 'Historia', 'Filosofía'] },
  
  // Turismo
  { careerName: 'Turismo', subjectNames: ['Historia', 'Geografía', 'Economía', 'Comunicación'] },
  
  // Economía
  { careerName: 'Economía', subjectNames: ['Matemática', 'Economía', 'Historia', 'Geografía'] },
  
  // Ingeniería Civil
  { careerName: 'Ingeniería Civil', subjectNames: ['Matemática', 'Física', 'Química'] },
  
  // Arquitectura
  { careerName: 'Arquitectura', subjectNames: ['Matemática', 'Física', 'Historia', 'Geografía'] },
];

async function main() {
  console.log('🌱 Initializing Career-Subject configuration...\n');

  for (const config of careerSubjectsConfig) {
    // Find career
    const career = await prisma.career.findUnique({
      where: { name: config.careerName }
    });

    if (!career) {
      console.log(`⚠️  Career not found: ${config.careerName}`);
      continue;
    }

    // Find subjects and create relations
    const subjectIds: string[] = [];
    for (const subjectName of config.subjectNames) {
      const subject = await prisma.subject.findUnique({
        where: { name: subjectName }
      });
      if (subject) {
        subjectIds.push(subject.id);
      } else {
        console.log(`  ⚠️  Subject not found: ${subjectName}`);
      }
    }

    // Delete existing relations
    await prisma.careerSubject.deleteMany({
      where: { careerId: career.id }
    });

    // Create new relations
    for (const subjectId of subjectIds) {
      await prisma.careerSubject.create({
        data: {
          careerId: career.id,
          subjectId: subjectId
        }
      });
    }

    console.log(`✅ ${config.careerName}: ${subjectIds.length} subjects configured`);
  }

  console.log('\n✨ Career-Subject configuration complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding career subjects:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
