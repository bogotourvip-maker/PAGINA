// Tipos para códigos médicos
export interface CIE10Code {
  code: string
  description: string
  category?: string
}

export interface CUPSCode {
  code: string
  description: string
  category?: string
}

export interface CUMSCode {
  code: string
  description: string
  presentation?: string
}

// Datos CIE-10 más comunes (muestra representativa)
export const CIE10_CODES: CIE10Code[] = [
  // Enfermedades infecciosas
  { code: "A09", description: "Diarrea y gastroenteritis de presunto origen infeccioso", category: "Infecciosas" },
  { code: "A15", description: "Tuberculosis respiratoria", category: "Infecciosas" },
  { code: "A41", description: "Otras septicemias", category: "Infecciosas" },
  { code: "A49", description: "Infección bacteriana de sitio no especificado", category: "Infecciosas" },
  { code: "B34", description: "Infección viral de sitio no especificado", category: "Infecciosas" },
  
  // Tumores
  { code: "C34", description: "Tumor maligno de los bronquios y del pulmón", category: "Tumores" },
  { code: "C50", description: "Tumor maligno de la mama", category: "Tumores" },
  { code: "C61", description: "Tumor maligno de la próstata", category: "Tumores" },
  { code: "D25", description: "Leiomioma del útero", category: "Tumores" },
  
  // Enfermedades de la sangre
  { code: "D50", description: "Anemias por deficiencia de hierro", category: "Sangre" },
  { code: "D64", description: "Otras anemias", category: "Sangre" },
  
  // Endocrinas y metabólicas
  { code: "E10", description: "Diabetes mellitus insulinodependiente", category: "Endocrinas" },
  { code: "E11", description: "Diabetes mellitus no insulinodependiente", category: "Endocrinas" },
  { code: "E03", description: "Otros hipotiroidismos", category: "Endocrinas" },
  { code: "E05", description: "Tirotoxicosis [hipertiroidismo]", category: "Endocrinas" },
  { code: "E66", description: "Obesidad", category: "Endocrinas" },
  { code: "E78", description: "Trastornos del metabolismo de las lipoproteínas", category: "Endocrinas" },
  { code: "E86", description: "Depleción del volumen", category: "Endocrinas" },
  { code: "E87", description: "Otros trastornos de los líquidos, electrolitos y del equilibrio ácido-básico", category: "Endocrinas" },
  
  // Trastornos mentales
  { code: "F10", description: "Trastornos mentales debidos al uso de alcohol", category: "Mental" },
  { code: "F20", description: "Esquizofrenia", category: "Mental" },
  { code: "F31", description: "Trastorno afectivo bipolar", category: "Mental" },
  { code: "F32", description: "Episodio depresivo", category: "Mental" },
  { code: "F33", description: "Trastorno depresivo recurrente", category: "Mental" },
  { code: "F41", description: "Otros trastornos de ansiedad", category: "Mental" },
  
  // Sistema nervioso
  { code: "G20", description: "Enfermedad de Parkinson", category: "Nervioso" },
  { code: "G30", description: "Enfermedad de Alzheimer", category: "Nervioso" },
  { code: "G40", description: "Epilepsia", category: "Nervioso" },
  { code: "G43", description: "Migraña", category: "Nervioso" },
  { code: "G45", description: "Ataques de isquemia cerebral transitoria", category: "Nervioso" },
  
  // Enfermedades del ojo
  { code: "H10", description: "Conjuntivitis", category: "Ojo" },
  { code: "H25", description: "Catarata senil", category: "Ojo" },
  { code: "H40", description: "Glaucoma", category: "Ojo" },
  
  // Enfermedades del oído
  { code: "H60", description: "Otitis externa", category: "Oído" },
  { code: "H66", description: "Otitis media supurativa y la no especificada", category: "Oído" },
  
  // Sistema circulatorio
  { code: "I10", description: "Hipertensión esencial (primaria)", category: "Circulatorio" },
  { code: "I11", description: "Enfermedad cardíaca hipertensiva", category: "Circulatorio" },
  { code: "I20", description: "Angina de pecho", category: "Circulatorio" },
  { code: "I21", description: "Infarto agudo del miocardio", category: "Circulatorio" },
  { code: "I25", description: "Enfermedad isquémica crónica del corazón", category: "Circulatorio" },
  { code: "I42", description: "Cardiomiopatía", category: "Circulatorio" },
  { code: "I48", description: "Fibrilación y aleteo auricular", category: "Circulatorio" },
  { code: "I50", description: "Insuficiencia cardíaca", category: "Circulatorio" },
  { code: "I61", description: "Hemorragia intracerebral", category: "Circulatorio" },
  { code: "I63", description: "Infarto cerebral", category: "Circulatorio" },
  { code: "I64", description: "Accidente vascular encefálico agudo no especificado", category: "Circulatorio" },
  { code: "I70", description: "Aterosclerosis", category: "Circulatorio" },
  { code: "I80", description: "Flebitis y tromboflebitis", category: "Circulatorio" },
  { code: "I83", description: "Venas varicosas de los miembros inferiores", category: "Circulatorio" },
  
  // Sistema respiratorio
  { code: "J00", description: "Rinofaringitis aguda [resfriado común]", category: "Respiratorio" },
  { code: "J02", description: "Faringitis aguda", category: "Respiratorio" },
  { code: "J03", description: "Amigdalitis aguda", category: "Respiratorio" },
  { code: "J06", description: "Infecciones agudas de las vías respiratorias superiores", category: "Respiratorio" },
  { code: "J10", description: "Influenza debida a virus de la influenza identificado", category: "Respiratorio" },
  { code: "J11", description: "Influenza debida a virus no identificado", category: "Respiratorio" },
  { code: "J12", description: "Neumonía viral no clasificada en otra parte", category: "Respiratorio" },
  { code: "J15", description: "Neumonía bacteriana no clasificada en otra parte", category: "Respiratorio" },
  { code: "J18", description: "Neumonía, organismo no especificado", category: "Respiratorio" },
  { code: "J20", description: "Bronquitis aguda", category: "Respiratorio" },
  { code: "J40", description: "Bronquitis no especificada como aguda o crónica", category: "Respiratorio" },
  { code: "J44", description: "Otras enfermedades pulmonares obstructivas crónicas", category: "Respiratorio" },
  { code: "J45", description: "Asma", category: "Respiratorio" },
  { code: "J96", description: "Insuficiencia respiratoria no clasificada en otra parte", category: "Respiratorio" },
  
  // Sistema digestivo
  { code: "K21", description: "Enfermedad por reflujo gastroesofágico", category: "Digestivo" },
  { code: "K25", description: "Úlcera gástrica", category: "Digestivo" },
  { code: "K26", description: "Úlcera duodenal", category: "Digestivo" },
  { code: "K29", description: "Gastritis y duodenitis", category: "Digestivo" },
  { code: "K35", description: "Apendicitis aguda", category: "Digestivo" },
  { code: "K40", description: "Hernia inguinal", category: "Digestivo" },
  { code: "K50", description: "Enfermedad de Crohn", category: "Digestivo" },
  { code: "K51", description: "Colitis ulcerativa", category: "Digestivo" },
  { code: "K56", description: "Íleo paralítico y obstrucción intestinal sin hernia", category: "Digestivo" },
  { code: "K57", description: "Enfermedad diverticular del intestino", category: "Digestivo" },
  { code: "K70", description: "Enfermedad alcohólica del hígado", category: "Digestivo" },
  { code: "K74", description: "Fibrosis y cirrosis del hígado", category: "Digestivo" },
  { code: "K80", description: "Colelitiasis", category: "Digestivo" },
  { code: "K81", description: "Colecistitis", category: "Digestivo" },
  { code: "K85", description: "Pancreatitis aguda", category: "Digestivo" },
  { code: "K92", description: "Otras enfermedades del sistema digestivo", category: "Digestivo" },
  
  // Piel
  { code: "L02", description: "Absceso cutáneo, furúnculo y carbunco", category: "Piel" },
  { code: "L03", description: "Celulitis", category: "Piel" },
  { code: "L20", description: "Dermatitis atópica", category: "Piel" },
  { code: "L30", description: "Otras dermatitis", category: "Piel" },
  { code: "L50", description: "Urticaria", category: "Piel" },
  
  // Sistema osteomuscular
  { code: "M15", description: "Poliartrosis", category: "Osteomuscular" },
  { code: "M16", description: "Coxartrosis [artrosis de la cadera]", category: "Osteomuscular" },
  { code: "M17", description: "Gonartrosis [artrosis de la rodilla]", category: "Osteomuscular" },
  { code: "M19", description: "Otras artrosis", category: "Osteomuscular" },
  { code: "M25", description: "Otros trastornos articulares", category: "Osteomuscular" },
  { code: "M41", description: "Escoliosis", category: "Osteomuscular" },
  { code: "M43", description: "Otras dorsopatías deformantes", category: "Osteomuscular" },
  { code: "M51", description: "Otros trastornos de los discos intervertebrales", category: "Osteomuscular" },
  { code: "M54", description: "Dorsalgia", category: "Osteomuscular" },
  { code: "M62", description: "Otros trastornos de los músculos", category: "Osteomuscular" },
  { code: "M75", description: "Lesiones del hombro", category: "Osteomuscular" },
  { code: "M79", description: "Otros trastornos de los tejidos blandos", category: "Osteomuscular" },
  
  // Sistema genitourinario
  { code: "N10", description: "Nefritis tubulointersticial aguda", category: "Genitourinario" },
  { code: "N17", description: "Insuficiencia renal aguda", category: "Genitourinario" },
  { code: "N18", description: "Enfermedad renal crónica", category: "Genitourinario" },
  { code: "N20", description: "Cálculo del riñón y del uréter", category: "Genitourinario" },
  { code: "N30", description: "Cistitis", category: "Genitourinario" },
  { code: "N39", description: "Otros trastornos del sistema urinario", category: "Genitourinario" },
  { code: "N40", description: "Hiperplasia de la próstata", category: "Genitourinario" },
  
  // Embarazo y parto
  { code: "O14", description: "Hipertensión gestacional con proteinuria significativa", category: "Embarazo" },
  { code: "O20", description: "Hemorragia precoz del embarazo", category: "Embarazo" },
  { code: "O42", description: "Ruptura prematura de membranas", category: "Embarazo" },
  { code: "O60", description: "Parto prematuro", category: "Embarazo" },
  { code: "O80", description: "Parto único espontáneo", category: "Embarazo" },
  
  // Periodo perinatal
  { code: "P07", description: "Trastornos relacionados con la prematuridad", category: "Perinatal" },
  { code: "P22", description: "Dificultad respiratoria del recién nacido", category: "Perinatal" },
  { code: "P36", description: "Sepsis bacteriana del recién nacido", category: "Perinatal" },
  
  // Malformaciones congénitas
  { code: "Q21", description: "Malformaciones congénitas de los tabiques cardíacos", category: "Congénitas" },
  { code: "Q90", description: "Síndrome de Down", category: "Congénitas" },
  
  // Síntomas y signos
  { code: "R00", description: "Anormalidades del latido cardíaco", category: "Síntomas" },
  { code: "R05", description: "Tos", category: "Síntomas" },
  { code: "R06", description: "Anormalidades de la respiración", category: "Síntomas" },
  { code: "R07", description: "Dolor de garganta y en el pecho", category: "Síntomas" },
  { code: "R10", description: "Dolor abdominal y pélvico", category: "Síntomas" },
  { code: "R11", description: "Náusea y vómito", category: "Síntomas" },
  { code: "R50", description: "Fiebre de origen desconocido", category: "Síntomas" },
  { code: "R51", description: "Cefalea", category: "Síntomas" },
  { code: "R55", description: "Síncope y colapso", category: "Síntomas" },
  { code: "R56", description: "Convulsiones no clasificadas en otra parte", category: "Síntomas" },
  { code: "R57", description: "Choque no clasificado en otra parte", category: "Síntomas" },
  
  // Traumatismos
  { code: "S00", description: "Traumatismo superficial de la cabeza", category: "Traumatismos" },
  { code: "S01", description: "Herida de la cabeza", category: "Traumatismos" },
  { code: "S02", description: "Fractura de huesos del cráneo y de la cara", category: "Traumatismos" },
  { code: "S06", description: "Traumatismo intracraneal", category: "Traumatismos" },
  { code: "S22", description: "Fractura de las costillas, del esternón y de la columna torácica", category: "Traumatismos" },
  { code: "S32", description: "Fractura de la columna lumbar y de la pelvis", category: "Traumatismos" },
  { code: "S42", description: "Fractura del hombro y del brazo", category: "Traumatismos" },
  { code: "S52", description: "Fractura del antebrazo", category: "Traumatismos" },
  { code: "S62", description: "Fractura a nivel de la muñeca y de la mano", category: "Traumatismos" },
  { code: "S72", description: "Fractura del fémur", category: "Traumatismos" },
  { code: "S82", description: "Fractura de la pierna, inclusive el tobillo", category: "Traumatismos" },
  { code: "S92", description: "Fractura del pie", category: "Traumatismos" },
  { code: "T14", description: "Traumatismo de región no especificada del cuerpo", category: "Traumatismos" },
  { code: "T78", description: "Efectos adversos no clasificados en otra parte", category: "Traumatismos" },
  
  // Factores de riesgo
  { code: "Z00", description: "Examen general e investigación de personas sin quejas o sin diagnóstico", category: "Factores" },
  { code: "Z01", description: "Otros exámenes especiales e investigaciones", category: "Factores" },
  { code: "Z03", description: "Observación y evaluación médicas por sospecha de enfermedades", category: "Factores" },
  { code: "Z34", description: "Supervisión de embarazo normal", category: "Factores" },
]

// Datos CUPS más comunes (procedimientos en salud)
export const CUPS_CODES: CUPSCode[] = [
  // Consultas
  { code: "890101", description: "Consulta de primera vez por medicina general", category: "Consultas" },
  { code: "890102", description: "Consulta de primera vez por medicina especializada", category: "Consultas" },
  { code: "890201", description: "Consulta de control o seguimiento por medicina general", category: "Consultas" },
  { code: "890202", description: "Consulta de control o seguimiento por medicina especializada", category: "Consultas" },
  { code: "890301", description: "Consulta de urgencias por medicina general", category: "Consultas" },
  { code: "890302", description: "Consulta de urgencias por medicina especializada", category: "Consultas" },
  
  // Laboratorio clínico
  { code: "903841", description: "Hemograma [Hemoglobina, hematocrito, recuento de eritrocitos]", category: "Laboratorio" },
  { code: "903818", description: "Glucosa en suero u otro fluido diferente a orina", category: "Laboratorio" },
  { code: "903825", description: "Creatinina en suero, orina u otros", category: "Laboratorio" },
  { code: "903856", description: "Uroanálisis con sedimento y densidad urinaria", category: "Laboratorio" },
  { code: "903895", description: "Perfil lipídico (colesterol total, HDL, LDL, triglicéridos)", category: "Laboratorio" },
  { code: "906916", description: "Hemocultivo aerobio", category: "Laboratorio" },
  { code: "906919", description: "Urocultivo", category: "Laboratorio" },
  { code: "903866", description: "Tiempo de protrombina [PT]", category: "Laboratorio" },
  { code: "903867", description: "Tiempo de tromboplastina parcial [PTT]", category: "Laboratorio" },
  { code: "903810", description: "Bilirrubinas total y directa", category: "Laboratorio" },
  { code: "903809", description: "Amilasa en suero", category: "Laboratorio" },
  { code: "903855", description: "Transaminasas [ALT, AST]", category: "Laboratorio" },
  { code: "906010", description: "Prueba rápida para detección de antígeno de SARS-CoV-2", category: "Laboratorio" },
  { code: "906041", description: "PCR para SARS-CoV-2", category: "Laboratorio" },
  { code: "903016", description: "Troponina cardíaca", category: "Laboratorio" },
  { code: "903426", description: "Hormona estimulante del tiroides [TSH]", category: "Laboratorio" },
  { code: "903427", description: "Tiroxina libre [T4 libre]", category: "Laboratorio" },
  { code: "903605", description: "Antígeno prostático específico [PSA] total", category: "Laboratorio" },
  
  // Imágenes diagnósticas
  { code: "871121", description: "Radiografía de tórax", category: "Imágenes" },
  { code: "873210", description: "Radiografía de abdomen simple", category: "Imágenes" },
  { code: "871010", description: "Radiografía de cráneo", category: "Imágenes" },
  { code: "873320", description: "Radiografía de columna vertebral", category: "Imágenes" },
  { code: "879101", description: "Ecografía abdominal total", category: "Imágenes" },
  { code: "881301", description: "Ecografía pélvica transvaginal o transrectal", category: "Imágenes" },
  { code: "881305", description: "Ecografía obstétrica con perfil biofísico", category: "Imágenes" },
  { code: "883101", description: "Tomografía computarizada de cráneo simple", category: "Imágenes" },
  { code: "883201", description: "Tomografía computarizada de tórax simple", category: "Imágenes" },
  { code: "883301", description: "Tomografía computarizada de abdomen simple", category: "Imágenes" },
  { code: "883520", description: "Resonancia magnética de cerebro simple", category: "Imágenes" },
  { code: "883620", description: "Resonancia magnética de columna simple", category: "Imágenes" },
  { code: "881202", description: "Ecocardiografía transtorácica", category: "Imágenes" },
  
  // Procedimientos cardíacos
  { code: "895101", description: "Electrocardiograma de reposo", category: "Cardiología" },
  { code: "895201", description: "Monitoreo electrocardiográfico de 24 horas [Holter]", category: "Cardiología" },
  { code: "895301", description: "Prueba de esfuerzo", category: "Cardiología" },
  
  // Procedimientos quirúrgicos
  { code: "470100", description: "Apendicectomía", category: "Cirugía" },
  { code: "512200", description: "Colecistectomía laparoscópica", category: "Cirugía" },
  { code: "530100", description: "Herniorrafia inguinal", category: "Cirugía" },
  { code: "740300", description: "Cesárea", category: "Cirugía" },
  { code: "681000", description: "Histerectomía", category: "Cirugía" },
  
  // Procedimientos de urgencias
  { code: "930800", description: "Intubación orotraqueal", category: "Urgencias" },
  { code: "930801", description: "Reanimación cardiopulmonar", category: "Urgencias" },
  { code: "930802", description: "Desfibrilación", category: "Urgencias" },
  { code: "861001", description: "Curación de herida", category: "Urgencias" },
  { code: "862101", description: "Sutura de herida", category: "Urgencias" },
  { code: "782101", description: "Inmovilización con férula", category: "Urgencias" },
  
  // Terapias
  { code: "931000", description: "Terapia respiratoria", category: "Terapias" },
  { code: "931100", description: "Fisioterapia", category: "Terapias" },
  { code: "943100", description: "Terapia ocupacional", category: "Terapias" },
  { code: "943200", description: "Terapia del lenguaje", category: "Terapias" },
  
  // Otros procedimientos
  { code: "990101", description: "Administración de medicamento vía oral", category: "Administración" },
  { code: "990201", description: "Administración de medicamento vía intramuscular", category: "Administración" },
  { code: "990301", description: "Administración de medicamento vía intravenosa", category: "Administración" },
  { code: "990401", description: "Administración de medicamento vía subcutánea", category: "Administración" },
  { code: "990115", description: "Canalización de vena periférica", category: "Administración" },
  { code: "990116", description: "Catéter venoso central", category: "Administración" },
  { code: "990501", description: "Oxigenoterapia", category: "Administración" },
  { code: "990601", description: "Nebulización", category: "Administración" },
]

// Datos CUMS más comunes (medicamentos)
export const CUMS_CODES: CUMSCode[] = [
  // Analgésicos y antiinflamatorios
  { code: "19944399", description: "IBUPROFENO TABLETAS 400 MG", presentation: "Tabletas" },
  { code: "20027170", description: "IBUPROFENO TABLETAS RECUBIERTAS 800 MG", presentation: "Tabletas" },
  { code: "39114", description: "NAPROXENO 250 MG TABLETA", presentation: "Tabletas" },
  { code: "20028367", description: "NAPROXENO TABLETAS RECUBIERTAS 500 MG", presentation: "Tabletas" },
  { code: "19959398", description: "ACETILSALICILICO ACIDO 81 MG TABLETAS CUBIERTA ENTERICA", presentation: "Tabletas" },
  { code: "20000001", description: "ACETAMINOFEN 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000002", description: "ACETAMINOFEN 150 MG/5 ML JARABE", presentation: "Jarabe" },
  { code: "20000003", description: "DICLOFENACO 50 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000004", description: "DICLOFENACO 75 MG/3 ML SOLUCION INYECTABLE", presentation: "Inyectable" },
  { code: "20000005", description: "TRAMADOL 50 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000006", description: "MORFINA 10 MG TABLETAS", presentation: "Tabletas" },
  
  // Antibióticos
  { code: "36575", description: "AMOXICILINA CAPSULAS 500 MG", presentation: "Cápsulas" },
  { code: "20102583", description: "AMOXICILINA 250 MG/5 ML POLVO PARA SUSPENSIÓN ORAL", presentation: "Suspensión" },
  { code: "32566", description: "AMOXICILINA + ACIDO CLAVULANICO 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000010", description: "AMPICILINA 500 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000011", description: "AMPICILINA 1 G POLVO PARA INYECCION", presentation: "Inyectable" },
  { code: "20000012", description: "AZITROMICINA 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000013", description: "CIPROFLOXACINA 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000014", description: "CLARITROMICINA 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000015", description: "METRONIDAZOL 500 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000016", description: "CEFALEXINA 500 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000017", description: "CEFTRIAXONA 1 G POLVO PARA INYECCION", presentation: "Inyectable" },
  { code: "20000018", description: "VANCOMICINA 500 MG POLVO PARA INYECCION", presentation: "Inyectable" },
  { code: "20000019", description: "MEROPENEM 1 G POLVO PARA INYECCION", presentation: "Inyectable" },
  { code: "20000020", description: "PIPERACILINA + TAZOBACTAM 4.5 G POLVO PARA INYECCION", presentation: "Inyectable" },
  
  // Cardiovasculares
  { code: "20000030", description: "LOSARTAN 50 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000031", description: "ENALAPRIL 20 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000032", description: "AMLODIPINO 5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000033", description: "METOPROLOL 50 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000034", description: "FUROSEMIDA 40 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000035", description: "HIDROCLOROTIAZIDA 25 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000036", description: "ATORVASTATINA 20 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000037", description: "CLOPIDOGREL 75 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000038", description: "WARFARINA 5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000039", description: "ENOXAPARINA 40 MG SOLUCION INYECTABLE", presentation: "Inyectable" },
  { code: "20000040", description: "DIGOXINA 0.25 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000041", description: "AMIODARONA 200 MG TABLETAS", presentation: "Tabletas" },
  
  // Antidiabéticos
  { code: "20000050", description: "METFORMINA 850 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000051", description: "GLIBENCLAMIDA 5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000052", description: "INSULINA CRISTALINA 100 UI/ML SOLUCION INYECTABLE", presentation: "Inyectable" },
  { code: "20000053", description: "INSULINA NPH 100 UI/ML SUSPENSION INYECTABLE", presentation: "Inyectable" },
  { code: "20000054", description: "INSULINA GLARGINA 100 UI/ML SOLUCION INYECTABLE", presentation: "Inyectable" },
  
  // Gastrointestinales
  { code: "20000060", description: "OMEPRAZOL 20 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000061", description: "RANITIDINA 150 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000062", description: "METOCLOPRAMIDA 10 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000063", description: "ONDANSETRON 8 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000064", description: "LOPERAMIDA 2 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000065", description: "LACTULOSA 3.33 G/5 ML JARABE", presentation: "Jarabe" },
  
  // Respiratorios
  { code: "20000070", description: "SALBUTAMOL 100 MCG INHALADOR", presentation: "Inhalador" },
  { code: "20000071", description: "BECLOMETASONA 250 MCG INHALADOR", presentation: "Inhalador" },
  { code: "20000072", description: "BUDESONIDA 200 MCG INHALADOR", presentation: "Inhalador" },
  { code: "20000073", description: "MONTELUKAST 10 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000074", description: "LORATADINA 10 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000075", description: "CETIRIZINA 10 MG TABLETAS", presentation: "Tabletas" },
  
  // Sistema nervioso
  { code: "20000080", description: "DIAZEPAM 10 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000081", description: "CLONAZEPAM 2 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000082", description: "ALPRAZOLAM 0.5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000083", description: "SERTRALINA 50 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000084", description: "FLUOXETINA 20 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000085", description: "AMITRIPTILINA 25 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000086", description: "CARBAMAZEPINA 200 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000087", description: "ACIDO VALPROICO 250 MG CAPSULAS", presentation: "Cápsulas" },
  { code: "20000088", description: "FENITOINA 100 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000089", description: "LEVODOPA + CARBIDOPA 250/25 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000090", description: "HALOPERIDOL 5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000091", description: "RISPERIDONA 2 MG TABLETAS", presentation: "Tabletas" },
  
  // Corticosteroides
  { code: "20000100", description: "PREDNISOLONA 5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000101", description: "DEXAMETASONA 0.5 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000102", description: "HIDROCORTISONA 100 MG POLVO PARA INYECCION", presentation: "Inyectable" },
  { code: "20000103", description: "METILPREDNISOLONA 500 MG POLVO PARA INYECCION", presentation: "Inyectable" },
  
  // Soluciones intravenosas
  { code: "20000110", description: "SOLUCION SALINA 0.9% 500 ML", presentation: "Solución IV" },
  { code: "20000111", description: "DEXTROSA 5% EN AGUA 500 ML", presentation: "Solución IV" },
  { code: "20000112", description: "LACTATO DE RINGER 500 ML", presentation: "Solución IV" },
  { code: "20000113", description: "CLORURO DE POTASIO 10% AMPOLLA", presentation: "Ampolla" },
  
  // Otros
  { code: "20000120", description: "LEVOTIROXINA 50 MCG TABLETAS", presentation: "Tabletas" },
  { code: "20000121", description: "HIERRO SULFATO 300 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000122", description: "ACIDO FOLICO 1 MG TABLETAS", presentation: "Tabletas" },
  { code: "20000123", description: "VITAMINA B12 1000 MCG SOLUCION INYECTABLE", presentation: "Inyectable" },
  { code: "20000124", description: "CALCIO CARBONATO 600 MG TABLETAS", presentation: "Tabletas" },
]

// Función para buscar códigos CIE-10
export function searchCIE10(query: string, limit: number = 20): CIE10Code[] {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  return CIE10_CODES.filter(code => {
    const normalizedCode = code.code.toLowerCase()
    const normalizedDesc = code.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    return normalizedCode.includes(normalizedQuery) || normalizedDesc.includes(normalizedQuery)
  }).slice(0, limit)
}

// Función para buscar códigos CUPS
export function searchCUPS(query: string, limit: number = 20): CUPSCode[] {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  return CUPS_CODES.filter(code => {
    const normalizedCode = code.code.toLowerCase()
    const normalizedDesc = code.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    return normalizedCode.includes(normalizedQuery) || normalizedDesc.includes(normalizedQuery)
  }).slice(0, limit)
}

// Función para buscar códigos CUMS
export function searchCUMS(query: string, limit: number = 20): CUMSCode[] {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  return CUMS_CODES.filter(code => {
    const normalizedCode = code.code.toLowerCase()
    const normalizedDesc = code.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    return normalizedCode.includes(normalizedQuery) || normalizedDesc.includes(normalizedQuery)
  }).slice(0, limit)
}
