export type FlashcardCategory = 'math' | 'numbers' | 'alphabet' | 'grammar' | 'verbs';

export type Flashcard = {
  id: string;
  content: string;
  subContent?: string;
  spokenTextPt: string;
  spokenTextEn: string;
  spokenTextEs: string;
  // For interactive modes
  answer?: string;
  sentencePt?: string;
  sentenceEn?: string;
  sentenceEs?: string;
  verbOptions?: {
    pt: string;
    en: string;
    es: string;
    isCorrect: boolean;
  }[];
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
    { id: 'w6', content: 'G-A-T-O', subContent: 'GATO', spokenTextPt: 'G A T O, forma a palavra Gato', spokenTextEn: 'C A T forms the word Cat', spokenTextEs: 'G A T O forma la palabra Gato' },
    { id: 'w7', content: 'U-V-A', subContent: 'UVA', spokenTextPt: 'U V A, forma a palavra Uva', spokenTextEn: 'G R A P E forms the word Grape', spokenTextEs: 'U V A forma la palabra Uva' },
    { id: 'w8', content: 'P-I-P-A', subContent: 'PIPA', spokenTextPt: 'P I P A, forma a palavra Pipa', spokenTextEn: 'K I T E forms the word Kite', spokenTextEs: 'C O M E T A forma la palabra Cometa' },
    { id: 'w9', content: 'D-A-D-O', subContent: 'DADO', spokenTextPt: 'D A D O, forma a palavra Dado', spokenTextEn: 'D I C E forms the word Dice', spokenTextEs: 'D A D O forma la palabra Dado' },
    { id: 'w10', content: 'F-O-C-A', subContent: 'FOCA', spokenTextPt: 'F O C A, forma a palavra Foca', spokenTextEn: 'S E A L forms the word Seal', spokenTextEs: 'F O C A forma la palabra Foca' },
    { id: 'w11', content: 'R-A-T-O', subContent: 'RATO', spokenTextPt: 'R A T O, forma a palavra Rato', spokenTextEn: 'R A T forms the word Rat', spokenTextEs: 'R A T Ó N forma la palabra Ratón' },
    { id: 'w12', content: 'B-O-L-O', subContent: 'BOLO', spokenTextPt: 'B O L O, forma a palavra Bolo', spokenTextEn: 'C A K E forms the word Cake', spokenTextEs: 'P A S T E L forma la palabra Pastel' },
    { id: 'w13', content: 'T-R-E-M', subContent: 'TREM', spokenTextPt: 'T R E M, forma a palavra Trem', spokenTextEn: 'T R A I N forms the word Train', spokenTextEs: 'T R E N forma la palabra Tren' },
  ],
  verbs: [
    { 
      id: 'v1', 
      content: 'CORRER', 
      sentencePt: 'Eu gosto de _____ no parque.', 
      sentenceEn: 'I like to _____ in the park.', 
      sentenceEs: 'Me gusta _____ en el parque.', 
      verbOptions: [
        { pt: 'Correr', en: 'Run', es: 'Correr', isCorrect: true },
        { pt: 'Pular', en: 'Jump', es: 'Saltar', isCorrect: false },
        { pt: 'Dormir', en: 'Sleep', es: 'Dormir', isCorrect: false }
      ],
      spokenTextPt: 'Eu gosto de correr no parque.', 
      spokenTextEn: 'I like to run in the park.', 
      spokenTextEs: 'Me gusta correr en el parque.' 
    },
    { 
      id: 'v2', 
      content: 'COMER', 
      sentencePt: 'Na hora do almoço, eu vou _____.', 
      sentenceEn: 'At lunchtime, I will _____.', 
      sentenceEs: 'A la hora del almuerzo, voy a _____.', 
      verbOptions: [
        { pt: 'Cantar', en: 'Sing', es: 'Cantar', isCorrect: false },
        { pt: 'Comer', en: 'Eat', es: 'Comer', isCorrect: true },
        { pt: 'Voar', en: 'Fly', es: 'Volar', isCorrect: false }
      ],
      spokenTextPt: 'Na hora do almoço, eu vou comer.', 
      spokenTextEn: 'At lunchtime, I will eat.', 
      spokenTextEs: 'A la hora del almuerzo, voy a comer.' 
    },
    { 
      id: 'v3', 
      content: 'BRINCAR', 
      sentencePt: 'Meus amigos chegaram para _____.', 
      sentenceEn: 'My friends arrived to _____.', 
      sentenceEs: 'Mis amigos llegaron para _____.', 
      verbOptions: [
        { pt: 'Estudar', en: 'Study', es: 'Estudiar', isCorrect: false },
        { pt: 'Chorar', en: 'Cry', es: 'Llorar', isCorrect: false },
        { pt: 'Brincar', en: 'Play', es: 'Jugar', isCorrect: true }
      ],
      spokenTextPt: 'Meus amigos chegaram para brincar.', 
      spokenTextEn: 'My friends arrived to play.', 
      spokenTextEs: 'Mis amigos llegaron para jugar.' 
    },
    { 
      id: 'v4', 
      content: 'DORMIR', 
      sentencePt: 'À noite, eu vou para a cama _____.', 
      sentenceEn: 'At night, I go to bed to _____.', 
      sentenceEs: 'Por la noche, voy a la cama a _____.', 
      verbOptions: [
        { pt: 'Dormir', en: 'Sleep', es: 'Dormir', isCorrect: true },
        { pt: 'Correr', en: 'Run', es: 'Correr', isCorrect: false },
        { pt: 'Nadar', en: 'Swim', es: 'Nadar', isCorrect: false }
      ],
      spokenTextPt: 'À noite, eu vou para a cama dormir.', 
      spokenTextEn: 'At night, I go to bed to sleep.', 
      spokenTextEs: 'Por la noche, voy a la cama a dormir.' 
    },
    { 
      id: 'v5', 
      content: 'LER', 
      sentencePt: 'Eu sento na cadeira para _____ um livro.', 
      sentenceEn: 'I sit on the chair to _____ a book.', 
      sentenceEs: 'Me siento en la silla para _____ un libro.', 
      verbOptions: [
        { pt: 'Cozinhar', en: 'Cook', es: 'Cocinar', isCorrect: false },
        { pt: 'Ler', en: 'Read', es: 'Leer', isCorrect: true },
        { pt: 'Pular', en: 'Jump', es: 'Saltar', isCorrect: false }
      ],
      spokenTextPt: 'Eu sento na cadeira para ler um livro.', 
      spokenTextEn: 'I sit on the chair to read a book.', 
      spokenTextEs: 'Me siento en la silla para leer un libro.' 
    },
    { 
      id: 'v6', 
      content: 'NADAR', 
      sentencePt: 'No verão, nós gostamos de _____ na piscina.', 
      sentenceEn: 'In summer, we like to _____ in the pool.', 
      sentenceEs: 'En verano, nos gusta _____ en la piscina.', 
      verbOptions: [
        { pt: 'Voar', en: 'Fly', es: 'Volar', isCorrect: false },
        { pt: 'Pintar', en: 'Paint', es: 'Pintar', isCorrect: false },
        { pt: 'Nadar', en: 'Swim', es: 'Nadar', isCorrect: true }
      ],
      spokenTextPt: 'No verão, nós gostamos de nadar na piscina.', 
      spokenTextEn: 'In summer, we like to swim in the pool.', 
      spokenTextEs: 'En verano, nos gusta nadar en la piscina.' 
    },
    { 
      id: 'v7', 
      content: 'PINTAR', 
      sentencePt: 'Vou usar minhas tintas para _____ um quadro.', 
      sentenceEn: 'I will use my paints to _____ a picture.', 
      sentenceEs: 'Usaré mis pinturas para _____ un cuadro.', 
      verbOptions: [
        { pt: 'Beber', en: 'Drink', es: 'Beber', isCorrect: false },
        { pt: 'Pintar', en: 'Paint', es: 'Pintar', isCorrect: true },
        { pt: 'Vestir', en: 'Wear', es: 'Llevar', isCorrect: false }
      ],
      spokenTextPt: 'Vou usar minhas tintas para pintar um quadro.', 
      spokenTextEn: 'I will use my paints to paint a picture.', 
      spokenTextEs: 'Usaré mis pinturas para pintar un cuadro.' 
    },
    { 
      id: 'v8', 
      content: 'BEBER', 
      sentencePt: 'Quando estou com sede, preciso _____ água.', 
      sentenceEn: 'When I am thirsty, I need to _____ water.', 
      sentenceEs: 'Cuando tengo sed, necesito _____ agua.', 
      verbOptions: [
        { pt: 'Beber', en: 'Drink', es: 'Beber', isCorrect: true },
        { pt: 'Comer', en: 'Eat', es: 'Comer', isCorrect: false },
        { pt: 'Cantar', en: 'Sing', es: 'Cantar', isCorrect: false }
      ],
      spokenTextPt: 'Quando estou com sede, preciso beber água.', 
      spokenTextEn: 'When I am thirsty, I need to drink water.', 
      spokenTextEs: 'Cuando tengo sed, necesito beber agua.' 
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
