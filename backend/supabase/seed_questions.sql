-- ============================================
-- SEED QUESTIONS for Amauta
-- 3 universities x multiple subjects
-- ============================================

BEGIN;

-- ============================================
-- QUESTIONS (14 blocks)
-- Columns: id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt"
-- ============================================

-- UNI MATEMATICA (5 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-uni-mat', 'uni', 'matematica', NULL, 'Si x + 3 = 10, ¿cuál es el valor de x?', 'EASY', NOW()),
('q2-uni-mat', 'uni', 'matematica', NULL, 'Calcule el área de un círculo con radio 7 cm. (Use π = 22/7)', 'MEDIUM', NOW()),
('q3-uni-mat', 'uni', 'matematica', NULL, 'Resuelva: 2x² - 8 = 0', 'MEDIUM', NOW()),
('q4-uni-mat', 'uni', 'matematica', NULL, 'Si f(x) = 3x + 2, calcule f(5)', 'EASY', NOW()),
('q5-uni-mat', 'uni', 'matematica', NULL, '¿Cuál es el resultado de log₁₀(100)?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNI FISICA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-uni-fis', 'uni', 'fisica', NULL, 'Un auto recorre 150 km en 3 horas. ¿Cuál es su velocidad promedio?', 'EASY', NOW()),
('q2-uni-fis', 'uni', 'fisica', NULL, 'Calcule la fuerza resultante sobre un objeto de 10 kg con aceleración de 5 m/s²', 'EASY', NOW()),
('q3-uni-fis', 'uni', 'fisica', NULL, '¿Cuál es la energía cinética de un cuerpo de 4 kg a 6 m/s?', 'MEDIUM', NOW()),
('q4-uni-fis', 'uni', 'fisica', NULL, 'Un objeto cae libremente desde 80 m. ¿Cuánto tiempo tarda en llegar al suelo? (g=10m/s²)', 'MEDIUM', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNI QUIMICA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-uni-qui', 'uni', 'quimica', NULL, '¿Cuál es el número atómico del oxígeno?', 'EASY', NOW()),
('q2-uni-qui', 'uni', 'quimica', NULL, 'Balancee: Fe + O₂ → Fe₂O₃', 'MEDIUM', NOW()),
('q3-uni-qui', 'uni', 'quimica', NULL, '¿Cuántos moles hay en 36 g de agua (H₂O)?', 'MEDIUM', NOW()),
('q4-uni-qui', 'uni', 'quimica', NULL, '¿Qué tipo de enlace tiene el NaCl?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNI COMUNICACION (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-uni-com', 'uni', 'comunicacion', NULL, '¿Cuál es la clase de la palabra "rápidamente"?', 'EASY', NOW()),
('q2-uni-com', 'uni', 'comunicacion', NULL, 'Señale la oración que tiene sujeto compuesto:', 'MEDIUM', NOW()),
('q3-uni-com', 'uni', 'comunicacion', NULL, 'Identifique el tipo de texto: "La isla Langerhans es una isla ubicada en el océano Pacífico..."', 'MEDIUM', NOW()),
('q4-uni-com', 'uni', 'comunicacion', NULL, '¿Qué es un adverbio?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNI HISTORIA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-uni-his', 'uni', 'historia', NULL, '¿En qué año se fundó la Universidad Nacional de Ingeniería?', 'MEDIUM', NOW()),
('q2-uni-his', 'uni', 'historia', NULL, '¿Quién descubrió el Perú en 1527?', 'EASY', NOW()),
('q3-uni-his', 'uni', 'historia', NULL, '¿En qué año fue la Batalla de Ayacucho?', 'EASY', NOW()),
('q4-uni-his', 'uni', 'historia', NULL, '¿Qué imperio统治ó el Tahuantinsuyo?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNMSM MATEMATICA (5 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unmsm-mat', 'unmsm', 'matematica', NULL, 'Simplifique: √(48)', 'EASY', NOW()),
('q2-unmsm-mat', 'unmsm', 'matematica', NULL, 'Calcule: 3! / 4!', 'EASY', NOW()),
('q3-unmsm-mat', 'unmsm', 'matematica', NULL, 'Si log₂(x) = 5, ¿cuál es x?', 'MEDIUM', NOW()),
('q4-unmsm-mat', 'unmsm', 'matematica', NULL, '¿Cuánto es (2³)⁴?', 'EASY', NOW()),
('q5-unmsm-mat', 'unmsm', 'matematica', NULL, 'Resuelva: |x - 3| = 7', 'MEDIUM', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNMSM FISICA (3 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unmsm-fis', 'unmsm', 'fisica', NULL, '¿Cuál es la unidad de la fuerza en el SI?', 'EASY', NOW()),
('q2-unmsm-fis', 'unmsm', 'fisica', NULL, 'Un móvil con velocidad de 20 m/s frena con aceleración de -4 m/s². ¿Cuánto recorre hasta detenerse?', 'MEDIUM', NOW()),
('q3-unmsm-fis', 'unmsm', 'fisica', NULL, '¿Qué es la gravedad específica?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNMSM QUIMICA (3 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unmsm-qui', 'unmsm', 'quimica', NULL, '¿Qué es un isótopo?', 'EASY', NOW()),
('q2-unmsm-qui', 'unmsm', 'quimica', NULL, '¿Cuál es la configuración electrónica del carbono?', 'MEDIUM', NOW()),
('q3-unmsm-qui', 'unmsm', 'quimica', NULL, '¿Cuántos electrones tiene el ion Cl⁻?', 'MEDIUM', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNMSM BIOLOGIA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unmsm-bio', 'unmsm', 'biologia', NULL, '¿Cuál es la unidad básica de la vida?', 'EASY', NOW()),
('q2-unmsm-bio', 'unmsm', 'biologia', NULL, '¿Qué organelo produce ATP en la célula?', 'MEDIUM', NOW()),
('q3-unmsm-bio', 'unmsm', 'biologia', NULL, '¿Cuántos cromosomas tiene una célula humana diploide?', 'MEDIUM', NOW()),
('q4-unmsm-bio', 'unmsm', 'biologia', NULL, '¿Qué es la mitosis?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNMSM COMUNICACION (3 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unmsm-com', 'unmsm', 'comunicacion', NULL, '¿Qué es un sustantivo?', 'EASY', NOW()),
('q2-unmsm-com', 'unmsm', 'comunicacion', NULL, 'Identifique el verbo: "Ellos caminaron por el parque"', 'EASY', NOW()),
('q3-unmsm-com', 'unmsm', 'comunicacion', NULL, '¿Qué tipo de palabra es "increíble"?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNSAAC MATEMATICA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unsaac-mat', 'unsaac', 'matematica', NULL, 'Calcule: √144 + √25', 'EASY', NOW()),
('q2-unsaac-mat', 'unsaac', 'matematica', NULL, 'Si x/4 = 12, x = ?', 'EASY', NOW()),
('q3-unsaac-mat', 'unsaac', 'matematica', NULL, '¿Cuánto es 25% de 80?', 'EASY', NOW()),
('q4-unsaac-mat', 'unsaac', 'matematica', NULL, 'Calcule el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNSAAC HISTORIA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unsaac-his', 'unsaac', 'historia', NULL, '¿Qué ciudad fue la capital del Imperio Inca?', 'EASY', NOW()),
('q2-unsaac-his', 'unsaac', 'historia', NULL, '¿En qué año se fundó el Cusco?', 'HARD', NOW()),
('q3-unsaac-his', 'unsaac', 'historia', NULL, '¿Quién fue Túpac Amaru II?', 'MEDIUM', NOW()),
('q4-unsaac-his', 'unsaac', 'historia', NULL, '¿Qué significa "Tahuantinsuyo"?', 'MEDIUM', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNSAAC GEOGRAFIA (4 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unsaac-geo', 'unsaac', 'geografia', NULL, '¿Cuál es la capital del Cusco?', 'EASY', NOW()),
('q2-unsaac-geo', 'unsaac', 'geografia', NULL, '¿Qué cordillera atraviesa el Perú?', 'EASY', NOW()),
('q3-unsaac-geo', 'unsaac', 'geografia', NULL, '¿Cuál es el río más largo del Perú?', 'EASY', NOW()),
('q4-unsaac-geo', 'unsaac', 'geografia', NULL, '¿Qué es el fenómeno de El Niño?', 'MEDIUM', NOW())
ON CONFLICT (id) DO NOTHING;

-- UNSAAC COMUNICACION (3 questions)
INSERT INTO questions (id, "universityId", "subjectId", "careerId", text, difficulty, "updatedAt") VALUES
('q1-unsaac-com', 'unsaac', 'comunicacion', NULL, '¿Qué es un adverbio?', 'EASY', NOW()),
('q2-unsaac-com', 'unsaac', 'comunicacion', NULL, 'Identifique el sujeto: "Los estudiantes estudian mucho"', 'EASY', NOW()),
('q3-unsaac-com', 'unsaac', 'comunicacion', NULL, '¿Qué tipo de texto es una noticia?', 'EASY', NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- QUESTION OPTIONS (14 blocks)
-- Columns: id, "questionId", "text", "orderIndex", "isCorrect"
-- ============================================

-- UNI MATEMATICA options (5 questions x 4 options = 20)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-uni-mat-1-a', 'q1-uni-mat', '5', 0, true),
('opt-uni-mat-1-b', 'q1-uni-mat', '7', 1, false),
('opt-uni-mat-1-c', 'q1-uni-mat', '13', 2, false),
('opt-uni-mat-1-d', 'q1-uni-mat', '4', 3, false),
('opt-uni-mat-2-a', 'q2-uni-mat', '154 cm²', 0, true),
('opt-uni-mat-2-b', 'q2-uni-mat', '44 cm²', 1, false),
('opt-uni-mat-2-c', 'q2-uni-mat', '22 cm²', 2, false),
('opt-uni-mat-2-d', 'q2-uni-mat', '308 cm²', 3, false),
('opt-uni-mat-3-a', 'q3-uni-mat', 'x = ±2', 0, true),
('opt-uni-mat-3-b', 'q3-uni-mat', 'x = 4', 1, false),
('opt-uni-mat-3-c', 'q3-uni-mat', 'x = ±4', 2, false),
('opt-uni-mat-3-d', 'q3-uni-mat', 'x = 8', 3, false),
('opt-uni-mat-4-a', 'q4-uni-mat', '17', 0, true),
('opt-uni-mat-4-b', 'q4-uni-mat', '15', 1, false),
('opt-uni-mat-4-c', 'q4-uni-mat', '12', 2, false),
('opt-uni-mat-4-d', 'q4-uni-mat', '19', 3, false),
('opt-uni-mat-5-a', 'q5-uni-mat', '2', 0, true),
('opt-uni-mat-5-b', 'q5-uni-mat', '10', 1, false),
('opt-uni-mat-5-c', 'q5-uni-mat', '100', 2, false),
('opt-uni-mat-5-d', 'q5-uni-mat', '1', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNI FISICA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-uni-fis-1-a', 'q1-uni-fis', '50 km/h', 0, true),
('opt-uni-fis-1-b', 'q1-uni-fis', '45 km/h', 1, false),
('opt-uni-fis-1-c', 'q1-uni-fis', '150 km/h', 2, false),
('opt-uni-fis-1-d', 'q1-uni-fis', '30 km/h', 3, false),
('opt-uni-fis-2-a', 'q2-uni-fis', '50 N', 0, true),
('opt-uni-fis-2-b', 'q2-uni-fis', '5 N', 1, false),
('opt-uni-fis-2-c', 'q2-uni-fis', '500 N', 2, false),
('opt-uni-fis-2-d', 'q2-uni-fis', '15 N', 3, false),
('opt-uni-fis-3-a', 'q3-uni-fis', '72 J', 0, true),
('opt-uni-fis-3-b', 'q3-uni-fis', '36 J', 1, false),
('opt-uni-fis-3-c', 'q3-uni-fis', '144 J', 2, false),
('opt-uni-fis-3-d', 'q3-uni-fis', '24 J', 3, false),
('opt-uni-fis-4-a', 'q4-uni-fis', '4 s', 0, true),
('opt-uni-fis-4-b', 'q4-uni-fis', '8 s', 1, false),
('opt-uni-fis-4-c', 'q4-uni-fis', '2 s', 2, false),
('opt-uni-fis-4-d', 'q4-uni-fis', '16 s', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNI QUIMICA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-uni-qui-1-a', 'q1-uni-qui', '8', 0, true),
('opt-uni-qui-1-b', 'q1-uni-qui', '16', 1, false),
('opt-uni-qui-1-c', 'q1-uni-qui', '6', 2, false),
('opt-uni-qui-1-d', 'q1-uni-qui', '2', 3, false),
('opt-uni-qui-2-a', 'q2-uni-qui', '4Fe + 3O2 → 2Fe2O3', 0, true),
('opt-uni-qui-2-b', 'q2-uni-qui', '2Fe + O2 → Fe2O3', 1, false),
('opt-uni-qui-2-c', 'q2-uni-qui', 'Fe + O2 → FeO', 2, false),
('opt-uni-qui-2-d', 'q2-uni-qui', '4Fe + O2 → 2FeO', 3, false),
('opt-uni-qui-3-a', 'q3-uni-qui', '2 moles', 0, true),
('opt-uni-qui-3-b', 'q3-uni-qui', '1 moles', 1, false),
('opt-uni-qui-3-c', 'q3-uni-qui', '36 moles', 2, false),
('opt-uni-qui-3-d', 'q3-uni-qui', '0.5 moles', 3, false),
('opt-uni-qui-4-a', 'q4-uni-qui', 'Iónico', 0, true),
('opt-uni-qui-4-b', 'q4-uni-qui', 'Covalente', 1, false),
('opt-uni-qui-4-c', 'q4-uni-qui', 'Metálico', 2, false),
('opt-uni-qui-4-d', 'q4-uni-qui', 'Hidrógeno', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNI COMUNICACION options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-uni-com-1-a', 'q1-uni-com', 'Adverbio', 0, true),
('opt-uni-com-1-b', 'q1-uni-com', 'Adjetivo', 1, false),
('opt-uni-com-1-c', 'q1-uni-com', 'Verbo', 2, false),
('opt-uni-com-1-d', 'q1-uni-com', 'Sustantivo', 3, false),
('opt-uni-com-2-a', 'q2-uni-com', '"Ellos y nosotras caminamos"', 0, true),
('opt-uni-com-2-b', 'q2-uni-com', '"Juan camina solo"', 1, false),
('opt-uni-com-2-c', 'q2-uni-com', '"María estudia"', 2, false),
('opt-uni-com-2-d', 'q2-uni-com', '"El perro duerme"', 3, false),
('opt-uni-com-3-a', 'q3-uni-com', 'Informativo', 0, true),
('opt-uni-com-3-b', 'q3-uni-com', 'Narrativo', 1, false),
('opt-uni-com-3-c', 'q3-uni-com', 'Descriptivo', 2, false),
('opt-uni-com-3-d', 'q3-uni-com', 'Argumentativo', 3, false),
('opt-uni-com-4-a', 'q4-uni-com', 'Palabra que modifica al verbo, adjetivo u otro adverbio', 0, true),
('opt-uni-com-4-b', 'q4-uni-com', 'Palabra que indica acción', 1, false),
('opt-uni-com-4-c', 'q4-uni-com', 'Palabra que nombra objetos', 2, false),
('opt-uni-com-4-d', 'q4-uni-com', 'Palabra que describe sustantivos', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNI HISTORIA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-uni-his-1-a', 'q1-uni-his', '1955', 0, true),
('opt-uni-his-1-b', 'q1-uni-his', '1876', 1, false),
('opt-uni-his-1-c', 'q1-uni-his', '1945', 2, false),
('opt-uni-his-1-d', 'q1-uni-his', '1960', 3, false),
('opt-uni-his-2-a', 'q2-uni-his', 'Francisco Pizarro', 0, true),
('opt-uni-his-2-b', 'q2-uni-his', 'Hernando de Soto', 1, false),
('opt-uni-his-2-c', 'q2-uni-his', 'Cristóbal Colón', 2, false),
('opt-uni-his-2-d', 'q2-uni-his', 'Diego de Almagro', 3, false),
('opt-uni-his-3-a', 'q3-uni-his', '1824', 0, true),
('opt-uni-his-3-b', 'q3-uni-his', '1821', 1, false),
('opt-uni-his-3-c', 'q3-uni-his', '1820', 2, false),
('opt-uni-his-3-d', 'q3-uni-his', '1826', 3, false),
('opt-uni-his-4-a', 'q4-uni-his', 'El Imperio de los Incas', 0, true),
('opt-uni-his-4-b', 'q4-uni-his', 'El Imperio Español', 1, false),
('opt-uni-his-4-c', 'q4-uni-his', 'El Imperio Azteca', 2, false),
('opt-uni-his-4-d', 'q4-uni-his', 'El Imperio Maya', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNMSM MATEMATICA options (5 questions x 4 = 20)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unmsm-mat-1-a', 'q1-unmsm-mat', '4√3', 0, true),
('opt-unmsm-mat-1-b', 'q1-unmsm-mat', '2√3', 1, false),
('opt-unmsm-mat-1-c', 'q1-unmsm-mat', '6√3', 2, false),
('opt-unmsm-mat-1-d', 'q1-unmsm-mat', '8√3', 3, false),
('opt-unmsm-mat-2-a', 'q2-unmsm-mat', '1/4', 0, true),
('opt-unmsm-mat-2-b', 'q2-unmsm-mat', '1/2', 1, false),
('opt-unmsm-mat-2-c', 'q2-unmsm-mat', '1/3', 2, false),
('opt-unmsm-mat-2-d', 'q2-unmsm-mat', '1', 3, false),
('opt-unmsm-mat-3-a', 'q3-unmsm-mat', '32', 0, true),
('opt-unmsm-mat-3-b', 'q3-unmsm-mat', '25', 1, false),
('opt-unmsm-mat-3-c', 'q3-unmsm-mat', '64', 2, false),
('opt-unmsm-mat-3-d', 'q3-unmsm-mat', '10', 3, false),
('opt-unmsm-mat-4-a', 'q4-unmsm-mat', '4096', 0, true),
('opt-unmsm-mat-4-b', 'q4-unmsm-mat', '1024', 1, false),
('opt-unmsm-mat-4-c', 'q4-unmsm-mat', '2048', 2, false),
('opt-unmsm-mat-4-d', 'q4-unmsm-mat', '256', 3, false),
('opt-unmsm-mat-5-a', 'q5-unmsm-mat', '10 y -4', 0, true),
('opt-unmsm-mat-5-b', 'q5-unmsm-mat', '4 y -10', 1, false),
('opt-unmsm-mat-5-c', 'q5-unmsm-mat', '7 y -7', 2, false),
('opt-unmsm-mat-5-d', 'q5-unmsm-mat', '5 y -5', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNMSM FISICA options (3 questions x 4 = 12)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unmsm-fis-1-a', 'q1-unmsm-fis', 'Newton (N)', 0, true),
('opt-unmsm-fis-1-b', 'q1-unmsm-fis', 'Joule (J)', 1, false),
('opt-unmsm-fis-1-c', 'q1-unmsm-fis', 'Pascal (Pa)', 2, false),
('opt-unmsm-fis-1-d', 'q1-unmsm-fis', 'Watt (W)', 3, false),
('opt-unmsm-fis-2-a', 'q2-unmsm-fis', '50 m', 0, true),
('opt-unmsm-fis-2-b', 'q2-unmsm-fis', '100 m', 1, false),
('opt-unmsm-fis-2-c', 'q2-unmsm-fis', '25 m', 2, false),
('opt-unmsm-fis-2-d', 'q2-unmsm-fis', '75 m', 3, false),
('opt-unmsm-fis-3-a', 'q3-unmsm-fis', 'Relación entre el peso de una sustancia y el peso de un volumen igual de agua', 0, true),
('opt-unmsm-fis-3-b', 'q3-unmsm-fis', 'La fuerza de gravedad', 1, false),
('opt-unmsm-fis-3-c', 'q3-unmsm-fis', 'La densidad del aire', 2, false),
('opt-unmsm-fis-3-d', 'q3-unmsm-fis', 'El peso específico', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNMSM QUIMICA options (3 questions x 4 = 12)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unmsm-qui-1-a', 'q1-unmsm-qui', 'Átomos del mismo elemento con diferente número de neutrones', 0, true),
('opt-unmsm-qui-1-b', 'q1-unmsm-qui', 'Átomos de diferentes elementos', 1, false),
('opt-unmsm-qui-1-c', 'q1-unmsm-qui', 'Moléculas con diferente estructura', 2, false),
('opt-unmsm-qui-1-d', 'q1-unmsm-qui', 'Iones con carga positiva', 3, false),
('opt-unmsm-qui-2-a', 'q2-unmsm-qui', '1s2 2s2 2p2', 0, true),
('opt-unmsm-qui-2-b', 'q2-unmsm-qui', '1s2 2s2 2p6', 1, false),
('opt-unmsm-qui-2-c', 'q2-unmsm-qui', '1s2 2s2 2p6 3s2', 2, false),
('opt-unmsm-qui-2-d', 'q2-unmsm-qui', '1s2 2s2', 3, false),
('opt-unmsm-qui-3-a', 'q3-unmsm-qui', '18 electrones', 0, true),
('opt-unmsm-qui-3-b', 'q3-unmsm-qui', '17 electrones', 1, false),
('opt-unmsm-qui-3-c', 'q3-unmsm-qui', '16 electrones', 2, false),
('opt-unmsm-qui-3-d', 'q3-unmsm-qui', '19 electrones', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNMSM BIOLOGIA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unmsm-bio-1-a', 'q1-unmsm-bio', 'La célula', 0, true),
('opt-unmsm-bio-1-b', 'q1-unmsm-bio', 'El tejido', 1, false),
('opt-unmsm-bio-1-c', 'q1-unmsm-bio', 'El órgano', 2, false),
('opt-unmsm-bio-1-d', 'q1-unmsm-bio', 'El átomo', 3, false),
('opt-unmsm-bio-2-a', 'q2-unmsm-bio', 'Mitocondria', 0, true),
('opt-unmsm-bio-2-b', 'q2-unmsm-bio', 'Núcleo', 1, false),
('opt-unmsm-bio-2-c', 'q2-unmsm-bio', 'Ribosoma', 2, false),
('opt-unmsm-bio-2-d', 'q2-unmsm-bio', 'Lisosoma', 3, false),
('opt-unmsm-bio-3-a', 'q3-unmsm-bio', '46', 0, true),
('opt-unmsm-bio-3-b', 'q3-unmsm-bio', '23', 1, false),
('opt-unmsm-bio-3-c', 'q3-unmsm-bio', '48', 2, false),
('opt-unmsm-bio-3-d', 'q3-unmsm-bio', '44', 3, false),
('opt-unmsm-bio-4-a', 'q4-unmsm-bio', 'División celular que produce dos células hijas idénticas', 0, true),
('opt-unmsm-bio-4-b', 'q4-unmsm-bio', 'Fusión de células', 1, false),
('opt-unmsm-bio-4-c', 'q4-unmsm-bio', 'Reproducción sexual', 2, false),
('opt-unmsm-bio-4-d', 'q4-unmsm-bio', 'Formación de gametos', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNMSM COMUNICACION options (3 questions x 4 = 12)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unmsm-com-1-a', 'q1-unmsm-com', 'Palabra que nombra personas, lugares o cosas', 0, true),
('opt-unmsm-com-1-b', 'q1-unmsm-com', 'Palabra que indica acción', 1, false),
('opt-unmsm-com-1-c', 'q1-unmsm-com', 'Palabra que describe', 2, false),
('opt-unmsm-com-1-d', 'q1-unmsm-com', 'Palabra que modifica al verbo', 3, false),
('opt-unmsm-com-2-a', 'q2-unmsm-com', 'caminaron', 0, true),
('opt-unmsm-com-2-b', 'q2-unmsm-com', 'ellos', 1, false),
('opt-unmsm-com-2-c', 'q2-unmsm-com', 'parque', 2, false),
('opt-unmsm-com-2-d', 'q2-unmsm-com', 'por', 3, false),
('opt-unmsm-com-3-a', 'q3-unmsm-com', 'Adjetivo', 0, true),
('opt-unmsm-com-3-b', 'q3-unmsm-com', 'Sustantivo', 1, false),
('opt-unmsm-com-3-c', 'q3-unmsm-com', 'Verbo', 2, false),
('opt-unmsm-com-3-d', 'q3-unmsm-com', 'Adverbio', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNSAAC MATEMATICA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unsaac-mat-1-a', 'q1-unsaac-mat', '17', 0, true),
('opt-unsaac-mat-1-b', 'q1-unsaac-mat', '13', 1, false),
('opt-unsaac-mat-1-c', 'q1-unsaac-mat', '19', 2, false),
('opt-unsaac-mat-1-d', 'q1-unsaac-mat', '15', 3, false),
('opt-unsaac-mat-2-a', 'q2-unsaac-mat', '48', 0, true),
('opt-unsaac-mat-2-b', 'q2-unsaac-mat', '12', 1, false),
('opt-unsaac-mat-2-c', 'q2-unsaac-mat', '36', 2, false),
('opt-unsaac-mat-2-d', 'q2-unsaac-mat', '24', 3, false),
('opt-unsaac-mat-3-a', 'q3-unsaac-mat', '20', 0, true),
('opt-unsaac-mat-3-b', 'q3-unsaac-mat', '15', 1, false),
('opt-unsaac-mat-3-c', 'q3-unsaac-mat', '25', 2, false),
('opt-unsaac-mat-3-d', 'q3-unsaac-mat', '30', 3, false),
('opt-unsaac-mat-4-a', 'q4-unsaac-mat', '26 cm', 0, true),
('opt-unsaac-mat-4-b', 'q4-unsaac-mat', '40 cm', 1, false),
('opt-unsaac-mat-4-c', 'q4-unsaac-mat', '13 cm', 2, false),
('opt-unsaac-mat-4-d', 'q4-unsaac-mat', '20 cm', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNSAAC HISTORIA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unsaac-his-1-a', 'q1-unsaac-his', 'Cusco', 0, true),
('opt-unsaac-his-1-b', 'q1-unsaac-his', 'Lima', 1, false),
('opt-unsaac-his-1-c', 'q1-unsaac-his', 'Arequipa', 2, false),
('opt-unsaac-his-1-d', 'q1-unsaac-his', 'Trujillo', 3, false),
('opt-unsaac-his-2-a', 'q2-unsaac-his', 'Siglo XII', 0, true),
('opt-unsaac-his-2-b', 'q2-unsaac-his', 'Siglo XV', 1, false),
('opt-unsaac-his-2-c', 'q2-unsaac-his', 'Siglo X', 2, false),
('opt-unsaac-his-2-d', 'q2-unsaac-his', 'Siglo XIII', 3, false),
('opt-unsaac-his-3-a', 'q3-unsaac-his', 'Líder de la rebelión indígena de 1780', 0, true),
('opt-unsaac-his-3-b', 'q3-unsaac-his', 'Primer presidente del Perú', 1, false),
('opt-unsaac-his-3-c', 'q3-unsaac-his', 'Conquistador español', 2, false),
('opt-unsaac-his-3-d', 'q3-unsaac-his', 'Emperador del Tahuantinsuyo', 3, false),
('opt-unsaac-his-4-a', 'q4-unsaac-his', 'Las cuatro regiones del imperio Inca', 0, true),
('opt-unsaac-his-4-b', 'q4-unsaac-his', 'Los cuatrocientos años del incanato', 1, false),
('opt-unsaac-his-4-c', 'q4-unsaac-his', 'Las cuatro partes del mundo', 2, false),
('opt-unsaac-his-4-d', 'q4-unsaac-his', 'Los cuatro suyos principales', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNSAAC GEOGRAFIA options (4 questions x 4 = 16)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unsaac-geo-1-a', 'q1-unsaac-geo', 'Cusco', 0, true),
('opt-unsaac-geo-1-b', 'q1-unsaac-geo', 'Arequipa', 1, false),
('opt-unsaac-geo-1-c', 'q1-unsaac-geo', 'Puno', 2, false),
('opt-unsaac-geo-1-d', 'q1-unsaac-geo', 'Tacna', 3, false),
('opt-unsaac-geo-2-a', 'q2-unsaac-geo', 'Cordillera de los Andes', 0, true),
('opt-unsaac-geo-2-b', 'q2-unsaac-geo', 'Cordillera de la Costa', 1, false),
('opt-unsaac-geo-2-c', 'q2-unsaac-geo', 'Cordillera Oriental', 2, false),
('opt-unsaac-geo-2-d', 'q2-unsaac-geo', 'Sierra Central', 3, false),
('opt-unsaac-geo-3-a', 'q3-unsaac-geo', 'Utcubamba', 0, true),
('opt-unsaac-geo-3-b', 'q3-unsaac-geo', 'Marañón', 1, false),
('opt-unsaac-geo-3-c', 'q3-unsaac-geo', 'Rímac', 2, false),
('opt-unsaac-geo-3-d', 'q3-unsaac-geo', 'Amazonas', 3, false),
('opt-unsaac-geo-4-a', 'q4-unsaac-geo', 'Calentamiento anómalo del océano Pacífico tropical', 0, true),
('opt-unsaac-geo-4-b', 'q4-unsaac-geo', 'Una tormenta tropical', 1, false),
('opt-unsaac-geo-4-c', 'q4-unsaac-geo', 'Un fenómeno sísmico', 2, false),
('opt-unsaac-geo-4-d', 'q4-unsaac-geo', 'Una erupción volcánica', 3, false)
ON CONFLICT (id) DO NOTHING;

-- UNSAAC COMUNICACION options (3 questions x 4 = 12)
INSERT INTO question_options (id, "questionId", "text", "orderIndex", "isCorrect") VALUES
('opt-unsaac-com-1-a', 'q1-unsaac-com', 'Palabra que modifica al verbo, adjetivo u otro adverbio', 0, true),
('opt-unsaac-com-1-b', 'q1-unsaac-com', 'Palabra que indica acción', 1, false),
('opt-unsaac-com-1-c', 'q1-unsaac-com', 'Palabra que nombra objetos', 2, false),
('opt-unsaac-com-1-d', 'q1-unsaac-com', 'Palabra que describe sustantivos', 3, false),
('opt-unsaac-com-2-a', 'q2-unsaac-com', 'Los estudiantes', 0, true),
('opt-unsaac-com-2-b', 'q2-unsaac-com', 'mucho', 1, false),
('opt-unsaac-com-2-c', 'q2-unsaac-com', 'estudian', 2, false),
('opt-unsaac-com-2-d', 'q2-unsaac-com', 'por', 3, false),
('opt-unsaac-com-3-a', 'q3-unsaac-com', 'Informativo', 0, true),
('opt-unsaac-com-3-b', 'q3-unsaac-com', 'Narrativo', 1, false),
('opt-unsaac-com-3-c', 'q3-unsaac-com', 'Descriptivo', 2, false),
('opt-unsaac-com-3-d', 'q3-unsaac-com', 'Argumentativo', 3, false)
ON CONFLICT (id) DO NOTHING;

COMMIT;
