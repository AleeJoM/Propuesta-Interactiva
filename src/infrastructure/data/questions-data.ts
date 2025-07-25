import { Question, QuestionId, QuestionCategory } from '../../domain/entities';

export const QUESTIONS_DATA: Question[] = [
  {
    id: new QuestionId('1'),
    text: 'Del Código Civil, ¿Cuál es tu artículo favorito para conquistarme? 😏',
    category: QuestionCategory.ROMANTIC,
    points: 10,
    options: [
      { id: 'a', text: 'Art. 515: "Los contratos deben celebrarse de buena fe "... como nosotros be 💋', romanticValue: 5 },
      { id: 'b', text: 'Art. 2524: "La posesión es la tenencia"... y yo te quiero poseer jeje 🔥', romanticValue: 5 },
      { id: 'c', text: 'Art. 279: "El consentimiento debe ser libre"... pero quiero mi libertad junto a vos 💍', romanticValue: 4 },
      { id: 'd', text: 'Art. 1724: "El daño comprende lo que se perdió"... perdí mi corazón al dártelo 💕', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('2'),
    text: 'Si fueras abogada y me citaras a declarar, ¿qué harías en tu oficina?',
    category: QuestionCategory.COMEDY,
    points: 10,
    options: [
      { id: 'a', text: 'Te susurraría: "tiene derecho a guardar silencio... pero no conmigo" 😏', romanticValue: 5 },
      { id: 'b', text: 'Haría un interrogatorio privado MUY exhaustivo... 🤭', romanticValue: 5 },
      { id: 'c', text: 'Me acercaría lentamente y te diría... "¿jura decir la verdad y nada más que la verdad?" ❤️‍🔥', romanticValue: 4 },
      { id: 'd', text: 'Te haría firmar un "contrato" muy pero muy particular y especial... 📝✨', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('3'),
    text: '¿Qué rama del Derecho te parece más sexy y por qué?',
    category: QuestionCategory.PREFERENCE,
    points: 10,
    options: [
      { id: 'a', text: 'Derecho de Familia: porque quiero formar una con vos 💍', romanticValue: 5 },
      { id: 'b', text: 'Derecho Penal: me gusta cuando sos "culpable" de hacerme ver las estrellas... 😈', romanticValue: 5 },
      { id: 'c', text: 'Derecho Civil: contratos íntimos de por vida 💕', romanticValue: 4 },
      { id: 'd', text: 'Derecho Laboral: trabajemos juntos en el amor y en el futuro 💪✨', romanticValue: 3 }
    ]
  },
  {
    id: new QuestionId('4'),
    text: 'Si tuvieras que "defender" nuestro amor en tribunales, ¿cuál sería tu argumento?',
    category: QuestionCategory.PERSONALITY,
    points: 10,
    options: [
      { id: 'a', text: 'Señor Juez, este amor es irrefutable y pasional 🫶', romanticValue: 5 },
      { id: 'b', text: 'La evidencia fáctica demuestra química pura entre las partes 😏', romanticValue: 5 },
      { id: 'c', text: 'Su Señoría, solicito cadena perpetua... de besitos y abracitos 💕', romanticValue: 4 },
      { id: 'd', text: 'Este caso amerita una sentencia de amor eterno ✨', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('5'),
    text: 'Una noche estudiando para Constitucional... ¿qué travesuras harías?',
    category: QuestionCategory.PREFERENCE,
    points: 10,
    options: [
      { id: 'a', text: 'Te distraigo con "prácticas" del Art. 19 de la intimidad 😈🔥', romanticValue: 5 },
      { id: 'b', text: 'Hacemos un "simulacro" de juicio muy privado 💋', romanticValue: 4 },
      { id: 'c', text: 'Te convenzo de que "anatomía (?)" es más urgente estudiar 😏', romanticValue: 5 },
      { id: 'd', text: 'Declaro estado de sitio en tu corazón 💕', romanticValue: 3 }
    ]
  },
  {
    id: new QuestionId('6'),
    text: 'Si te digo: "tengo una demanda que presentarte"... ¿qué pensás que es?',
    category: QuestionCategory.COMEDY,
    points: 10,
    options: [
      { id: 'a', text: 'Una propuesta indecente 💋', romanticValue: 5 },
      { id: 'b', text: 'A ver con qué salta este... 🙄', romanticValue: 4 },
      { id: 'c', text: 'Ojalá sea algo picante y prohibido por el Código Penal 😏', romanticValue: 5 },
      { id: 'd', text: '¿Presentarme una demanda? Ojalá demande amor 💘', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('7'),
    text: '¿Cómo demostrarías que te tengo "loca de amor" en términos jurídicos?',
    category: QuestionCategory.ROMANTIC,
    points: 10,
    options: [
      { id: 'a', text: 'Con prueba testimonial: todos saben que me volvés loca 💋', romanticValue: 5 },
      { id: 'b', text: 'Prueba documental: mensajitos hot a cualquier hora 📱🫢', romanticValue: 4 },
      { id: 'c', text: 'Confesión espontánea: gritándote: "te amo!" 💖', romanticValue: 5 },
      { id: 'd', text: 'Presunciones: mis miradas dicen todo 👁️ (SI)', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('8'),
    text: 'En una clase de Procesal, ¿qué excepción opondrías si alguien más me corteja?',
    category: QuestionCategory.PREFERENCE,
    points: 10,
    options: [
      { id: 'a', text: 'Excepción de incompetencia: "Acá la única competente soy yo" 🔫', romanticValue: 5 },
      { id: 'b', text: 'Falta de legitimación: "Él es MÍO desde siempre y hasta siempre" 💋', romanticValue: 5 },
      { id: 'c', text: 'Cosa juzgada: "Este tema ya está resuelto, soy SU novia" 😉💕', romanticValue: 4 },
      { id: 'd', text: 'Prescripción: "Tu tiempo para conquistarlo ya venció" ⏰', romanticValue: 3 }
    ]
  },
  {
    id: new QuestionId('9'),
    text: 'Si fueras mi abogada defensora, ¿qué alegato usarías para excusarme de amarte tanto?',
    category: QuestionCategory.ROMANTIC,
    points: 10,
    options: [
      { id: 'a', text: 'Inimputabilidad emocional: ´no pudo evitar el sentir en alma y corazón´ 💘', romanticValue: 5 },
      { id: 'b', text: 'Actué bajo el efecto de la droga irresistible de tus encantos 😵‍💫', romanticValue: 5 },
      { id: 'c', text: 'No hubo dolo, sólo deseo puro e intenso 🔥', romanticValue: 4 },
      { id: 'd', text: 'Fue un caso de legítima defensa... ¡de mi corazón! 💔🛡️', romanticValue: 4 }
    ]
  },
  {
    id: new QuestionId('10'),
    text: 'En una clase de Derecho Civil, ¿qué cláusula pondrías en nuestro contrato de amor?',
    category: QuestionCategory.PREFERENCE,
    points: 10,
    options: [
      { id: 'a', text: 'Cláusula de exclusividad: solo vos y yo, sin excepciones 💢💍', romanticValue: 5 },
      { id: 'b', text: 'Obligación de besos diarios con derecho a prórroga 💋😏', romanticValue: 5 },
      { id: 'c', text: 'Cláusula penal: cada falta de "te amo" se paga con abrazos besitos y más besitos 🤗', romanticValue: 4 },
      { id: 'd', text: 'Confidencialidad absoluta sobre nuestros chats 🔒📱', romanticValue: 4 }
    ]
  }
];
