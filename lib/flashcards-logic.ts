export type FlashcardCategory = 'math' | 'numbers' | 'alphabet' | 'grammar' | 'verbs';

export type Flashcard = {
  id: string;
  content: string;
  subContent?: string;
  spokenTextPt: string;
  spokenTextEn: string;
  spokenTextEs: string;
  // For interactive modes
  options?: string[];
  answer?: string;
  sentencePt?: string;
  sentenceEn?: string;
  sentenceEs?: string;
};

export const FLASHCARDS_DATA: Record<FlashcardCategory, Flashcard[]> = {
  numbers: Array.from({ length: 20 }, (_, i) => {
    const n = i + 1;
    const pt = ['Um','Dois','Três','Quatro','Cinco','Seis','Sete','Oito','Nove','Dez','Onze','Doze','Treze','Quatorze','Quinze','Dezesseis','Dezessete','Dezoito','Dezenove','Vinte'][i];
    const en = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty'][i];
    const es = ['Uno','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve','Diez','Once','Doce','Trece','Catorce','Quince','Dieciséis','Diecisiete','Dieciocho','Diecinueve','Veinte'][i];
    return {
      id: `n${n}`,
      content: n.toString(),
      subContent: pt,
      spokenTextPt: pt,
      spokenTextEn: en,
      spokenTextEs: es,
    };
  }),
  alphabet: [
    { id: 'A', content: 'A', subContent: 'Abelha', spokenTextPt: 'A de Abelha', spokenTextEn: 'A for Apple', spokenTextEs: 'A de Abeja' },
    { id: 'B', content: 'B', subContent: 'Bola', spokenTextPt: 'B de Bola', spokenTextEn: 'B for Ball', spokenTextEs: 'B de Balón' },
    { id: 'C', content: 'C', subContent: 'Casa', spokenTextPt: 'C de Casa', spokenTextEn: 'C for Cat', spokenTextEs: 'C de Casa' },
    { id: 'D', content: 'D', subContent: 'Dado', spokenTextPt: 'D de Dado', spokenTextEn: 'D for Dog', spokenTextEs: 'D de Dado' },
    { id: 'E', content: 'E', subContent: 'Elefante', spokenTextPt: 'E de Elefante', spokenTextEn: 'E for Elephant', spokenTextEs: 'E de Elefante' },
    { id: 'F', content: 'F', subContent: 'Foca', spokenTextPt: 'F de Foca', spokenTextEn: 'F for Fish', spokenTextEs: 'F de Foca' },
    { id: 'G', content: 'G', subContent: 'Gato', spokenTextPt: 'G de Gato', spokenTextEn: 'G for Goat', spokenTextEs: 'G de Gato' },
    { id: 'H', content: 'H', subContent: 'Hipopótamo', spokenTextPt: 'H de Hipopótamo', spokenTextEn: 'H for Horse', spokenTextEs: 'H de Hipopótamo' },
    { id: 'I', content: 'I', subContent: 'Igreja', spokenTextPt: 'I de Igreja', spokenTextEn: 'I for Ice cream', spokenTextEs: 'I de Iglesia' },
    { id: 'J', content: 'J', subContent: 'Jacaré', spokenTextPt: 'J de Jacaré', spokenTextEn: 'J for Juice', spokenTextEs: 'J de Jirafa' },
    { id: 'K', content: 'K', subContent: 'Kiwi', spokenTextPt: 'K de Kiwi', spokenTextEn: 'K for Kite', spokenTextEs: 'K de Koala' },
    { id: 'L', content: 'L', subContent: 'Leão', spokenTextPt: 'L de Leão', spokenTextEn: 'L for Lion', spokenTextEs: 'L de León' },
    { id: 'M', content: 'M', subContent: 'Macaco', spokenTextPt: 'M de Macaco', spokenTextEn: 'M for Monkey', spokenTextEs: 'M de Mono' },
    { id: 'N', content: 'N', subContent: 'Navio', spokenTextPt: 'N de Navio', spokenTextEn: 'N for Nest', spokenTextEs: 'N de Nido' },
    { id: 'O', content: 'O', subContent: 'Ovo', spokenTextPt: 'O de Ovo', spokenTextEn: 'O for Orange', spokenTextEs: 'O de Oso' },
    { id: 'P', content: 'P', subContent: 'Pato', spokenTextPt: 'P de Pato', spokenTextEn: 'P for Pig', spokenTextEs: 'P de Pato' },
    { id: 'Q', content: 'Q', subContent: 'Queijo', spokenTextPt: 'Q de Queijo', spokenTextEn: 'Q for Queen', spokenTextEs: 'Q de Queso' },
    { id: 'R', content: 'R', subContent: 'Rato', spokenTextPt: 'R de Rato', spokenTextEn: 'R for Rabbit', spokenTextEs: 'R de Ratón' },
    { id: 'S', content: 'S', subContent: 'Sapo', spokenTextPt: 'S de Sapo', spokenTextEn: 'S for Sun', spokenTextEs: 'S de Sapo' },
    { id: 'T', content: 'T', subContent: 'Tatu', spokenTextPt: 'T de Tatu', spokenTextEn: 'T for Train', spokenTextEs: 'T de Tren' },
    { id: 'U', content: 'U', subContent: 'Uva', spokenTextPt: 'U de Uva', spokenTextEn: 'U for Umbrella', spokenTextEs: 'U de Uva' },
    { id: 'V', content: 'V', subContent: 'Vaca', spokenTextPt: 'V de Vaca', spokenTextEn: 'V for Van', spokenTextEs: 'V de Vaca' },
    { id: 'W', content: 'W', subContent: 'Web', spokenTextPt: 'W de Web', spokenTextEn: 'W for Water', spokenTextEs: 'W de Web' },
    { id: 'X', content: 'X', subContent: 'Xícara', spokenTextPt: 'X de Xícara', spokenTextEn: 'X for Xylophone', spokenTextEs: 'X de Xilófono' },
    { id: 'Y', content: 'Y', subContent: 'Yoga', spokenTextPt: 'Y de Yoga', spokenTextEn: 'Y for Yogurt', spokenTextEs: 'Y de Yoga' },
    { id: 'Z', content: 'Z', subContent: 'Zebra', spokenTextPt: 'Z de Zebra', spokenTextEn: 'Z for Zebra', spokenTextEs: 'Z de Cebra' },
  ],
  math: [
    // We will generate the questions dynamically in the component, but we can leave this here or use it as a fallback.
    { id: 'm1', content: '1 + 1 = ?', answer: '2', spokenTextPt: 'Quanto é um mais um?', spokenTextEn: 'What is one plus one?', spokenTextEs: '¿Cuánto es uno más uno?' },
  ],
  grammar: [
    { id: 'w1', content: 'P-A-I', subContent: 'PAI', spokenTextPt: 'P A I, forma a palavra Pai', spokenTextEn: 'P A I forms the word Father', spokenTextEs: 'P A I forma la palabra Padre' },
    { id: 'w2', content: 'M-Ã-E', subContent: 'MÃE', spokenTextPt: 'M Ã E, forma a palavra Mãe', spokenTextEn: 'M O T H E R forms the word Mother', spokenTextEs: 'M A D R E forma la palabra Madre' },
    { id: 'w3', content: 'S-O-L', subContent: 'SOL', spokenTextPt: 'S O L, forma a palavra Sol', spokenTextEn: 'S U N forms the word Sun', spokenTextEs: 'S O L forma la palabra Sol' },
    { id: 'w4', content: 'B-O-L-A', subContent: 'BOLA', spokenTextPt: 'B O L A, forma a palavra Bola', spokenTextEn: 'B A L L forms the word Ball', spokenTextEs: 'B A L Ó N forma la palabra Balón' },
    { id: 'w5', content: 'C-A-S-A', subContent: 'CASA', spokenTextPt: 'C A S A, forma a palavra Casa', spokenTextEn: 'H O U S E forms the word House', spokenTextEs: 'C A S A forma la palabra Casa' },
  ],
  verbs: [
    { 
      id: 'v1', 
      content: 'CORRER', 
      sentencePt: 'Eu gosto de _____ no parque.', 
      sentenceEn: 'I like to _____ in the park.', 
      sentenceEs: 'Me gusta _____ en el parque.', 
      options: ['Correr', 'Pular', 'Dormir'], 
      answer: 'Correr',
      spokenTextPt: 'Correr, uma ação muito rápida.', 
      spokenTextEn: 'Run, a very fast action.', 
      spokenTextEs: 'Correr, una acción muy rápida.' 
    },
    { 
      id: 'v2', 
      content: 'COMER', 
      sentencePt: 'Na hora do almoço, eu vou _____.', 
      sentenceEn: 'At lunchtime, I will _____.', 
      sentenceEs: 'A la hora del almuerzo, voy a _____.', 
      options: ['Comer', 'Voar', 'Cantar'], 
      answer: 'Comer',
      spokenTextPt: 'Comer uma comida deliciosa!', 
      spokenTextEn: 'Eat delicious food!', 
      spokenTextEs: '¡Comer una comida deliciosa!' 
    },
    { 
      id: 'v3', 
      content: 'BRINCAR', 
      sentencePt: 'Meus amigos chegaram para _____.', 
      sentenceEn: 'My friends arrived to _____.', 
      sentenceEs: 'Mis amigos llegaron para _____.', 
      options: ['Estudar', 'Brincar', 'Chorar'], 
      answer: 'Brincar',
      spokenTextPt: 'Brincar com os amigos.', 
      spokenTextEn: 'Play with friends.', 
      spokenTextEs: 'Jugar con los amigos.' 
    },
    { 
      id: 'v4', 
      content: 'DORMIR', 
      sentencePt: 'À noite, eu vou para a cama _____.', 
      sentenceEn: 'At night, I go to bed to _____.', 
      sentenceEs: 'Por la noche, voy a la cama a _____.', 
      options: ['Pular', 'Dormir', 'Correr'], 
      answer: 'Dormir',
      spokenTextPt: 'Dormir para descansar.', 
      spokenTextEn: 'Sleep to rest.', 
      spokenTextEs: 'Dormir para descansar.' 
    },
  ]
};

export const FLASHCARD_THEME_INFO: Record<FlashcardCategory, { icon: string, labelPt: string, labelEn: string, labelEs: string, mainBg: string, mainBorder: string, mainText: string, mainShadow: string }> = {
  numbers: { icon: '🔢', labelPt: 'Aprender Números', labelEn: 'Learn Numbers', labelEs: 'Aprender Números', mainBg: 'bg-[#FFD93D]', mainBorder: 'border-[#E2B300]', mainText: 'text-[#4A4A4A]', mainShadow: 'shadow-[8px_8px_0px_#E2B300]' },
  math: { icon: '➕', labelPt: 'Praticar Contas', labelEn: 'Practice Math', labelEs: 'Practicar Matemáticas', mainBg: 'bg-white', mainBorder: 'border-[#4D96FF]', mainText: 'text-[#4D96FF]', mainShadow: 'shadow-[8px_8px_0px_#4D96FF]' },
  alphabet: { icon: '🔤', labelPt: 'Alfabeto', labelEn: 'Alphabet', labelEs: 'Alfabeto', mainBg: 'bg-white', mainBorder: 'border-[#FF6B6B]', mainText: 'text-[#FF6B6B]', mainShadow: 'shadow-[8px_8px_0px_#FF6B6B]' },
  grammar: { icon: '📝', labelPt: 'Soletrar', labelEn: 'Spelling', labelEs: 'Deletrear', mainBg: 'bg-white', mainBorder: 'border-[#6BCB77]', mainText: 'text-[#6BCB77]', mainShadow: 'shadow-[8px_8px_0px_#6BCB77]' },
  verbs: { icon: '🏃‍♂️', labelPt: 'Verbos', labelEn: 'Verbs', labelEs: 'Verbos', mainBg: 'bg-white', mainBorder: 'border-[#9D4EDD]', mainText: 'text-[#9D4EDD]', mainShadow: 'shadow-[8px_8px_0px_#9D4EDD]' },
};
