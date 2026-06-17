export type ThemeType = 'fruits' | 'colors' | 'animals' | 'bible';
export type LangType = 'pt' | 'en' | 'es';
export type DifficultyType = 1 | 2 | 3;

export type CardData = {
  id: string;
  emoji: string;
  namePt: string;
  nameEn: string;
  nameEs: string;
};

export type DeckCard = CardData & {
  uniqueId: string;
};

export const THEMES_DATA: Record<ThemeType, CardData[]> = {
  fruits: [
    { id: 'apple', emoji: '🍎', namePt: 'Maçã', nameEn: 'Apple', nameEs: 'Manzana' },
    { id: 'banana', emoji: '🍌', namePt: 'Banana', nameEn: 'Banana', nameEs: 'Plátano' },
    { id: 'orange', emoji: '🍊', namePt: 'Laranja', nameEn: 'Orange', nameEs: 'Naranja' },
    { id: 'grape', emoji: '🍇', namePt: 'Uva', nameEn: 'Grape', nameEs: 'Uva' },
    { id: 'strawberry', emoji: '🍓', namePt: 'Morango', nameEn: 'Strawberry', nameEs: 'Fresa' },
    { id: 'watermelon', emoji: '🍉', namePt: 'Melancia', nameEn: 'Watermelon', nameEs: 'Sandía' },
    { id: 'pineapple', emoji: '🍍', namePt: 'Abacaxi', nameEn: 'Pineapple', nameEs: 'Piña' },
    { id: 'kiwi', emoji: '🥝', namePt: 'Kiwi', nameEn: 'Kiwi', nameEs: 'Kiwi' },
  ],
  colors: [
    { id: 'red', emoji: '🔴', namePt: 'Vermelho', nameEn: 'Red', nameEs: 'Rojo' },
    { id: 'blue', emoji: '🔵', namePt: 'Azul', nameEn: 'Blue', nameEs: 'Azul' },
    { id: 'green', emoji: '🟢', namePt: 'Verde', nameEn: 'Green', nameEs: 'Verde' },
    { id: 'yellow', emoji: '🟡', namePt: 'Amarelo', nameEn: 'Yellow', nameEs: 'Amarillo' },
    { id: 'purple', emoji: '🟣', namePt: 'Roxo', nameEn: 'Purple', nameEs: 'Morado' },
    { id: 'orange-c', emoji: '🟠', namePt: 'Laranja', nameEn: 'Orange', nameEs: 'Naranja' },
    { id: 'pink', emoji: '🩷', namePt: 'Rosa', nameEn: 'Pink', nameEs: 'Rosa' },
    { id: 'brown', emoji: '🟤', namePt: 'Marrom', nameEn: 'Brown', nameEs: 'Marrón' },
  ],
  animals: [
    { id: 'dog', emoji: '🐶', namePt: 'Cachorro', nameEn: 'Dog', nameEs: 'Perro' },
    { id: 'cat', emoji: '🐱', namePt: 'Gato', nameEn: 'Cat', nameEs: 'Gato' },
    { id: 'lion', emoji: '🦁', namePt: 'Leão', nameEn: 'Lion', nameEs: 'León' },
    { id: 'monkey', emoji: '🐵', namePt: 'Macaco', nameEn: 'Monkey', nameEs: 'Mono' },
    { id: 'elephant', emoji: '🐘', namePt: 'Elefante', nameEn: 'Elephant', nameEs: 'Elefante' },
    { id: 'pig', emoji: '🐷', namePt: 'Porco', nameEn: 'Pig', nameEs: 'Cerdo' },
    { id: 'cow', emoji: '🐮', namePt: 'Vaca', nameEn: 'Cow', nameEs: 'Vaca' },
    { id: 'horse', emoji: '🐴', namePt: 'Cavalo', nameEn: 'Horse', nameEs: 'Caballo' },
  ],
  bible: [
    { id: 'jesus', emoji: '👑', namePt: 'Jesus', nameEn: 'Jesus', nameEs: 'Jesús' },
    { id: 'ark', emoji: '🚢', namePt: 'Arca de Noé', nameEn: "Noah's Ark", nameEs: 'Arca de Noé' },
    { id: 'whale', emoji: '🐳', namePt: 'A Baleia', nameEn: 'The Whale', nameEs: 'La Ballena' },
    { id: 'david', emoji: '🪨', namePt: 'Davi', nameEn: 'David', nameEs: 'David' },
    { id: 'angel', emoji: '👼', namePt: 'Anjo', nameEn: 'Angel', nameEs: 'Ángel' },
    { id: 'cross', emoji: '✝️', namePt: 'A Cruz', nameEn: 'The Cross', nameEs: 'La Cruz' },
    { id: 'moses', emoji: '🌊', namePt: 'Moisés', nameEn: 'Moses', nameEs: 'Moisés' },
    { id: 'star', emoji: '⭐', namePt: 'A Estrela', nameEn: 'The Star', nameEs: 'La Estrella' },
  ],
};

export const THEME_INFO: Record<ThemeType, { icon: string, labelPt: string, labelEn: string, labelEs: string, mainBg: string, mainBorder: string, mainText: string, mainShadow: string }> = {
  fruits: { icon: '🍎', labelPt: 'Frutas', labelEn: 'Fruits', labelEs: 'Frutas', mainBg: 'bg-[#FFD93D]', mainBorder: 'border-[#E2B300]', mainText: 'text-[#4A4A4A]', mainShadow: 'shadow-[8px_8px_0px_#E2B300]' },
  colors: { icon: '🎨', labelPt: 'Cores', labelEn: 'Colors', labelEs: 'Colores', mainBg: 'bg-white', mainBorder: 'border-[#FF6B6B]', mainText: 'text-[#FF6B6B]', mainShadow: 'shadow-[8px_8px_0px_#FF6B6B]' },
  animals: { icon: '🐵', labelPt: 'Animais', labelEn: 'Animals', labelEs: 'Animales', mainBg: 'bg-white', mainBorder: 'border-[#4D96FF]', mainText: 'text-[#4D96FF]', mainShadow: 'shadow-[8px_8px_0px_#4D96FF]' },
  bible: { icon: '📖', labelPt: 'Bíblia', labelEn: 'Bible', labelEs: 'Biblia', mainBg: 'bg-white', mainBorder: 'border-[#6BCB77]', mainText: 'text-[#6BCB77]', mainShadow: 'shadow-[8px_8px_0px_#6BCB77]' },
};

export const generateDeck = (theme: ThemeType, difficulty: DifficultyType): DeckCard[] => {
  const allItems = THEMES_DATA[theme];
  const itemsCount = difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8;
  const items = allItems.slice(0, itemsCount);
  const paired = [...items, ...items];
  return paired
    .map(item => ({ ...item, uniqueId: Math.random().toString(36).substring(2, 9) }))
    .sort(() => Math.random() - 0.5);
};
