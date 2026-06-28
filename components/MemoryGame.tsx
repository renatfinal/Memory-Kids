'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THEME_INFO, generateDeck, ThemeType, LangType, DifficultyType, DeckCard } from '@/lib/game-logic';
import { FLASHCARDS_DATA, FLASHCARD_THEME_INFO, FlashcardCategory, Flashcard } from '@/lib/flashcards-logic';
import { speakText } from '@/lib/speech';
import { RefreshCw, ChevronLeft, Volume2, VolumeX, Medal, BookOpen, Clock } from 'lucide-react';

export default function MemoryGame() {
  const [lang, setLang] = useState<LangType>('pt');
  const [appMode, setAppMode] = useState<'memory' | 'flashcards'>('memory');
  
  // Memory State
  const [theme, setTheme] = useState<ThemeType | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyType>(1);
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Flashcards State
  const [flashcardCategory, setFlashcardCategory] = useState<FlashcardCategory | null>(null);
  const [mathProblem, setMathProblem] = useState({ n1: 1, n2: 1, op: '+', ans: 2 });
  const [mathInput, setMathInput] = useState('');
  const [verbIndex, setVerbIndex] = useState(0);

  // Restart when theme changes
  useEffect(() => {
    if (theme && appMode === 'memory') {
      startNewGame(theme, difficulty);
    }
  }, [theme, difficulty, appMode]);

  useEffect(() => {
    if (appMode === 'flashcards' && flashcardCategory === 'math') {
      const isAdd = Math.random() > 0.5;
      let n1, n2;
      if (isAdd) {
        n1 = Math.floor(Math.random() * 9) + 1;
        n2 = Math.floor(Math.random() * 9) + 1;
      } else {
        n1 = Math.floor(Math.random() * 9) + 5;
        n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
      }
      setMathProblem({ n1, n2, op: isAdd ? '+' : '-', ans: isAdd ? n1 + n2 : n1 - n2 });
      setMathInput('');
    } else if (appMode === 'flashcards' && flashcardCategory === 'verbs') {
      setVerbIndex(0);
    }
  }, [appMode, flashcardCategory]);

  const isVictory = matchedIds.length > 0 && matchedIds.length === deck.length / 2;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft !== null && timeLeft > 0 && !isVictory) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev && prev <= 1) {
            setIsTimerActive(false);
            if (soundEnabled) speakText(lang === 'pt' ? 'Tempo Esgotado!' : lang === 'es' ? '¡Tiempo Agotado!' : "Time's Up!", lang);
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    } else if (timeLeft === 0 && !isVictory) {
       setIsTimerActive(false);
    } else if (isVictory) {
       setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, isVictory, soundEnabled, lang]);

  const startNewGame = (t: ThemeType, d: DifficultyType) => {
    setDeck(generateDeck(t, d));
    setFlippedIds([]);
    setMatchedIds([]);
    setMoves(0);
    setIsLocked(false);
    const initialTime = d === 1 ? 45 : d === 2 ? 60 : 90;
    setTimeLeft(initialTime);
    setIsTimerActive(true);
  };

  const handleCardClick = (card: DeckCard) => {
    if (isLocked || timeLeft === 0) return;
    if (flippedIds.includes(card.uniqueId)) return;
    if (matchedIds.includes(card.id)) return;

    if (soundEnabled) {
       speakText(lang === 'pt' ? card.namePt : lang === 'es' ? card.nameEs : card.nameEn, lang);
    }

    const newFlipped = [...flippedIds, card.uniqueId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const firstCard = deck.find(c => c.uniqueId === newFlipped[0]);
      const secondCard = deck.find(c => c.uniqueId === newFlipped[1]);

      if (firstCard?.id === secondCard?.id) {
        // Match
        setMatchedIds(prev => [...prev, firstCard!.id]);
        setFlippedIds([]);
        setIsLocked(false);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
        }, 1200);
      }
    }
  };

  const handleFlashcardClick = (card: Flashcard) => {
    if (!soundEnabled) return;
    const text = lang === 'pt' ? card.spokenTextPt : lang === 'es' ? card.spokenTextEs : card.spokenTextEn;
    speakText(text, lang);
  };

  // View: Flashcards Game Screen
  if (appMode === 'flashcards' && flashcardCategory) {
    const cards = FLASHCARDS_DATA[flashcardCategory];

    const generateMathProblem = () => {
      const isAdd = Math.random() > 0.5;
      let n1, n2;
      if (isAdd) {
        n1 = Math.floor(Math.random() * 9) + 1;
        n2 = Math.floor(Math.random() * 9) + 1;
      } else {
        n1 = Math.floor(Math.random() * 9) + 5;
        n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
      }
      setMathProblem({ n1, n2, op: isAdd ? '+' : '-', ans: isAdd ? n1 + n2 : n1 - n2 });
      setMathInput('');
    };

    const handleMathKeypad = (num: number) => {
      const newInput = mathInput + num;
      setMathInput(newInput);
      if (parseInt(newInput) === mathProblem.ans) {
        if (soundEnabled) speakText(lang === 'pt' ? 'Acertou!' : lang === 'es' ? '¡Correcto!' : 'Correct!', lang);
        setTimeout(() => generateMathProblem(), 1000);
      } else if (newInput.length >= String(mathProblem.ans).length) {
        if (soundEnabled) speakText(lang === 'pt' ? 'Tente novamente' : lang === 'es' ? 'Inténtalo de nuevo' : 'Try again', lang);
        setTimeout(() => setMathInput(''), 500);
      }
    };

    const handleVerbOption = (isCorrect: boolean) => {
      if (isCorrect) {
        if (soundEnabled) speakText(lang === 'pt' ? 'Muito bem!' : lang === 'es' ? '¡Muy bien!' : 'Well done!', lang);
        setTimeout(() => {
          setVerbIndex((i) => (i + 1) % cards.length);
        }, 1500);
      } else {
        if (soundEnabled) speakText(lang === 'pt' ? 'Tente novamente' : lang === 'es' ? 'Inténtalo de nuevo' : 'Try again', lang);
      }
    };

    const renderInteractiveMode = () => {
      if (flashcardCategory === 'math') {
        const keyColors = ['bg-[#FF6B6B]', 'bg-[#4D96FF]', 'bg-[#FFD93D]', 'bg-[#6BCB77]', 'bg-[#9D4EDD]', 'bg-[#FF9F1C]', 'bg-[#2EC4B6]', 'bg-[#E71D36]', 'bg-[#F4A261]', 'bg-[#2A9D8F]'];
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-8 bg-white p-6 rounded-3xl border-4 border-[#4D96FF] shadow-[6px_6px_0px_#4D96FF] w-full text-5xl sm:text-6xl font-black text-[#4A4A4A]">
              <span>{mathProblem.n1}</span>
              <span className="text-[#FF6B6B]">{mathProblem.op}</span>
              <span>{mathProblem.n2}</span>
              <span className="text-[#6BCB77]">=</span>
              <span className={`w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center border-b-4 border-dashed border-gray-400 ${mathInput ? 'text-[#4D96FF]' : 'text-gray-300'}`}>
                {mathInput || '?'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMathKeypad(num)}
                  className={`flex items-center justify-center p-4 rounded-2xl border-b-4 border-black/20 text-white font-black text-3xl sm:text-4xl shadow-sm ${keyColors[num]} ${num === 0 ? 'col-start-2' : ''}`}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      if (flashcardCategory === 'verbs') {
        const verbData = cards[verbIndex];
        const sentence = lang === 'pt' ? verbData.sentencePt : lang === 'es' ? verbData.sentenceEs : verbData.sentenceEn;
        
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
             <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#9D4EDD] shadow-[6px_6px_0px_#9D4EDD] w-full text-center mb-8 relative">
                <button onClick={() => handleFlashcardClick(verbData)} className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Volume2 className="w-5 h-5 text-[#9D4EDD]" />
                </button>
                <div className="text-2xl sm:text-3xl font-black text-[#4A4A4A] leading-relaxed">
                  {sentence?.split('_____').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-4 border-dashed border-[#FF6B6B] w-24 mx-2 text-[#FF6B6B]">?</span>
                      )}
                    </span>
                  ))}
                </div>
             </div>
             
             <div className="flex flex-col gap-3 w-full">
               {verbData.verbOptions?.map((opt, i) => {
                 const text = lang === 'pt' ? opt.pt : lang === 'es' ? opt.es : opt.en;
                 return (
                   <motion.button
                     key={i}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => handleVerbOption(opt.isCorrect)}
                     className="py-4 px-6 rounded-2xl bg-white border-[3px] border-[#4D96FF] text-xl sm:text-2xl font-black text-[#4D96FF] shadow-[4px_4px_0px_#4D96FF] uppercase tracking-wider text-center"
                   >
                     {text}
                   </motion.button>
                 );
               })}
             </div>
          </div>
        );
      }

      // Normal Flashcards Mode (Numbers, Alphabet, Grammar)
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full content-start pb-8">
          {cards.map(card => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlashcardClick(card)}
              className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-[3px] bg-white ${FLASHCARD_THEME_INFO[flashcardCategory].mainBorder} ${FLASHCARD_THEME_INFO[flashcardCategory].mainShadow.replace('8px_8px', '4px_4px')} min-h-[100px] sm:min-h-[120px]`}
            >
              <span className={`text-2xl sm:text-3xl font-black mb-1 text-center leading-tight ${FLASHCARD_THEME_INFO[flashcardCategory].mainText}`}>{card.content}</span>
              {card.subContent && (
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">{card.subContent}</span>
              )}
            </motion.button>
          ))}
        </div>
      );
    };

    return (
      <div className="min-h-[100dvh] bg-[#FFF9E6] text-[#4A4A4A] flex flex-col py-4 px-2 sm:px-4 font-sans h-[100dvh] overflow-hidden">
        <div className={`max-w-3xl mx-auto w-full flex items-center justify-between mb-4 bg-white p-3 rounded-2xl border-4 flex-shrink-0 ${FLASHCARD_THEME_INFO[flashcardCategory].mainBorder} ${FLASHCARD_THEME_INFO[flashcardCategory].mainShadow.replace('8px_8px', '4px_4px')}`}>
          <button 
            onClick={() => setFlashcardCategory(null)} 
            className="p-2 bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg transition-colors group shadow-sm hover:-translate-y-0.5"
            title={lang === 'pt' ? 'Voltar' : lang === 'es' ? 'Volver' : 'Back'}
          >
            <ChevronLeft className="w-5 h-5 text-[#4A4A4A]" />
          </button>
          
          <div className={`text-lg sm:text-xl font-black uppercase tracking-widest flex items-center gap-2 ${FLASHCARD_THEME_INFO[flashcardCategory].mainText}`}>
            <span className="text-2xl">{FLASHCARD_THEME_INFO[flashcardCategory].icon}</span>
            <span className="hidden sm:inline">{lang === 'pt' ? FLASHCARD_THEME_INFO[flashcardCategory].labelPt : lang === 'es' ? FLASHCARD_THEME_INFO[flashcardCategory].labelEs : FLASHCARD_THEME_INFO[flashcardCategory].labelEn}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className="p-2 border-2 border-[#4D96FF] bg-white text-[#4D96FF] hover:-translate-y-0.5 shadow-[2px_2px_0px_#4D96FF] rounded-lg transition-transform"
              title={lang === 'pt' ? 'Som' : lang === 'es' ? 'Sonido' : 'Sound'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full flex-grow relative overflow-y-auto pb-4 px-1 flex flex-col pt-2">
          {renderInteractiveMode()}
        </div>
      </div>
    );
  }

  // View: Main Menu (Memory or Flashcards)
  if ((appMode === 'memory' && !theme) || (appMode === 'flashcards' && !flashcardCategory)) {
    return (
      <div className="min-h-screen bg-[#FFF9E6] text-[#4A4A4A] font-sans selection:bg-blue-100 flex flex-col items-center py-6 px-4">
        {/* Header (Lang Toggle & Logo Toggle) */}
        <div className="max-w-4xl w-full flex justify-between items-start mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-[3px_3px_0px_rgba(0,0,0,0.2)] transition-colors ${appMode === 'memory' ? 'bg-[#FF6B6B]' : 'bg-[#6BCB77]'}`}>
                {appMode === 'memory' ? 'M' : <BookOpen className="w-5 h-5 text-white" strokeWidth={3} />}
              </div>
              <h1 className="text-xl font-black tracking-tight uppercase flex flex-col items-start leading-none">
                {appMode === 'memory' 
                  ? <><span className="text-[#FF6B6B]">Memory<span className="text-[#4D96FF]">Kids</span></span><span className="text-[10px] text-gray-400 mt-1">{lang === 'pt' ? 'Modo Jogo' : 'Game Mode'}</span></>
                  : <><span className="text-[#6BCB77]">Escola<span className="text-[#FFD93D]">Kids</span></span><span className="text-[10px] text-gray-400 mt-1">{lang === 'pt' ? 'Modo Estudo' : 'Study Mode'}</span></>
                }
              </h1>
            </div>
            
            <button 
              onClick={() => setAppMode(appMode === 'memory' ? 'flashcards' : 'memory')}
              className="flex items-center gap-1 mt-1 px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors shadow-sm"
              title={lang === 'pt' ? 'Mudar Modo' : lang === 'es' ? 'Cambiar Modo' : 'Change Mode'}
            >
              {appMode === 'memory' ? (
                <>
                  <BookOpen className="w-3 h-3 text-[#6BCB77]" strokeWidth={3} />
                  {lang === 'pt' ? 'Ir para Escola Kids' : lang === 'es' ? 'Ir a Escola Kids' : 'Go to Escola Kids'}
                </>
              ) : (
                <>
                  <span className="text-[#FF6B6B] font-black mr-0.5">M</span>
                  {lang === 'pt' ? 'Ir para Memory Kids' : lang === 'es' ? 'Ir a Memory Kids' : 'Go to Memory Kids'}
                </>
              )}
            </button>
          </div>
          <div className="flex bg-gray-100 rounded-full border border-gray-200 p-1 flex-wrap justify-end gap-1 mt-1">
            <button 
              onClick={() => setLang('pt')} 
              className={`px-3 py-1 rounded-full font-bold transition-all text-xs ${lang === 'pt' ? 'bg-white shadow-sm text-[#4A4A4A]' : 'bg-transparent text-gray-500'}`}
            >
              PT 🇧🇷
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-3 py-1 rounded-full font-bold transition-all text-xs ${lang === 'en' ? 'bg-white shadow-sm text-[#4A4A4A]' : 'bg-transparent text-gray-500'}`}
            >
              EN 🇺🇸
            </button>
            <button 
              onClick={() => setLang('es')} 
              className={`px-3 py-1 rounded-full font-bold transition-all text-xs ${lang === 'es' ? 'bg-white shadow-sm text-[#4A4A4A]' : 'bg-transparent text-gray-500'}`}
            >
              ES 🇪🇸
            </button>
          </div>
        </div>

        {appMode === 'memory' && (
          <div className="flex flex-col items-center mb-6 w-full max-w-sm">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FF6B6B] mb-2">
              {lang === 'pt' ? 'Dificuldade' : lang === 'es' ? 'Dificultad' : 'Difficulty'}
            </h3>
            <div className="flex bg-white rounded-2xl border-4 border-[#F7D060] shadow-[4px_4px_0px_#F7D060] p-1 w-full relative">
               <button onClick={() => setDifficulty(1)} className={`flex-1 py-2 font-black rounded-xl text-sm transition-all uppercase ${difficulty === 1 ? 'bg-[#FFD93D] text-[#4A4A4A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {lang === 'pt' ? 'Nível I' : lang === 'es' ? 'Nivel I' : 'Level I'}
               </button>
               <button onClick={() => setDifficulty(2)} className={`flex-1 py-2 font-black rounded-xl text-sm transition-all uppercase ${difficulty === 2 ? 'bg-[#FFD93D] text-[#4A4A4A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {lang === 'pt' ? 'Nível II' : lang === 'es' ? 'Nivel II' : 'Level II'}
               </button>
               <button onClick={() => setDifficulty(3)} className={`flex-1 py-2 font-black rounded-xl text-sm transition-all uppercase ${difficulty === 3 ? 'bg-[#FFD93D] text-[#4A4A4A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {lang === 'pt' ? 'Nível III' : lang === 'es' ? 'Nivel III' : 'Level III'}
               </button>
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <motion.div
            key={appMode} // Force animation on mode switch
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-4xl font-black mb-2 tracking-tight uppercase ${appMode === 'memory' ? 'text-[#FF6B6B] drop-shadow-[2px_2px_0px_#C84B4B]' : 'text-[#6BCB77] drop-shadow-[2px_2px_0px_#4BA856]'}`}>
              {appMode === 'memory' 
                ? (lang === 'pt' ? 'Escolha um Tema' : lang === 'es' ? 'Elige un Tema' : 'Choose a Theme')
                : (lang === 'pt' ? 'Cartilhas' : lang === 'es' ? 'Cartillas' : 'Flashcards')
              }
            </h2>
            <p className="text-lg sm:text-xl text-[#4A4A4A] font-bold tracking-wide">
              {appMode === 'memory'
                 ? (lang === 'pt' ? 'Para aprender e brincar!' : lang === 'es' ? '¡Para aprender y jugar!' : 'Learn and play!')
                 : (lang === 'pt' ? 'Aprenda os conceitos básicos' : lang === 'es' ? 'Aprende los conceptos básicos' : 'Learn the basics')
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-3xl w-full flex-grow content-start pb-8">
          {appMode === 'memory' ? (
            // Memory Themes
            (Object.keys(THEME_INFO) as ThemeType[]).map(t => (
              <button 
                key={t}
                onClick={() => setTheme(t)}
                className={`relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-4 border-solid ${THEME_INFO[t].mainBg} ${THEME_INFO[t].mainBorder} ${THEME_INFO[t].mainText} ${THEME_INFO[t].mainShadow} hover:-translate-y-1 transition-transform group`}
              >
                <div className="absolute top-0 right-[-10px] p-2 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 rotate-12">
                  <span className="text-7xl sm:text-8xl">{THEME_INFO[t].icon}</span>
                </div>
                <span className="text-4xl sm:text-5xl mb-2 sm:mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {THEME_INFO[t].icon}
                </span>
                <span className="text-lg sm:text-2xl font-black uppercase tracking-widest relative z-10 text-center">
                  {lang === 'pt' ? THEME_INFO[t].labelPt : lang === 'es' ? THEME_INFO[t].labelEs : THEME_INFO[t].labelEn}
                </span>
              </button>
            ))
          ) : (
            // Flashcards Themes
            (Object.keys(FLASHCARD_THEME_INFO) as FlashcardCategory[]).map(c => (
              <button 
                key={c}
                onClick={() => setFlashcardCategory(c)}
                className={`relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-4 border-solid ${FLASHCARD_THEME_INFO[c].mainBg} ${FLASHCARD_THEME_INFO[c].mainBorder} ${FLASHCARD_THEME_INFO[c].mainText} ${FLASHCARD_THEME_INFO[c].mainShadow} hover:-translate-y-1 transition-transform group`}
              >
                <div className="absolute top-0 right-[-10px] p-2 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 rotate-12">
                  <span className="text-7xl sm:text-8xl">{FLASHCARD_THEME_INFO[c].icon}</span>
                </div>
                <span className="text-4xl sm:text-5xl mb-2 sm:mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {FLASHCARD_THEME_INFO[c].icon}
                </span>
                <span className="text-lg sm:text-2xl font-black uppercase tracking-widest relative z-10 text-center">
                  {lang === 'pt' ? FLASHCARD_THEME_INFO[c].labelPt : lang === 'es' ? FLASHCARD_THEME_INFO[c].labelEs : FLASHCARD_THEME_INFO[c].labelEn}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex justify-center w-full max-w-3xl pb-8 mt-2">
          <a
            href="https://mpago.li/1DNaUgc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#009EE3] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-sm sm:text-base border-4 border-[#007AB0] shadow-[4px_4px_0px_#007AB0] hover:-translate-y-1 transition-transform"
          >
            Seja um Colaborador desse APP
          </a>
        </div>
      </div>
    );
  }

  // View: Memory Game Screen
  if (!theme) return null;

  return (
    <div className="min-h-[100dvh] bg-[#FFF9E6] text-[#4A4A4A] flex flex-col py-4 px-2 sm:px-4 font-sans h-[100dvh] overflow-hidden">
      <div className={`max-w-3xl mx-auto w-full flex items-center justify-between mb-4 bg-white p-3 rounded-2xl border-4 flex-shrink-0 ${THEME_INFO[theme].mainBorder} ${THEME_INFO[theme].mainShadow.replace('8px_8px', '4px_4px')}`}>
        <button 
          onClick={() => setTheme(null)} 
          className="p-2 bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 rounded-lg transition-colors group shadow-sm hover:-translate-y-0.5"
          title={lang === 'pt' ? 'Voltar' : lang === 'es' ? 'Volver' : 'Back'}
        >
          <ChevronLeft className="w-5 h-5 text-[#4A4A4A]" />
        </button>
        
        <div className={`text-lg sm:text-xl font-black uppercase tracking-widest flex items-center gap-2 ${THEME_INFO[theme].mainText}`}>
          <span className="text-2xl">{THEME_INFO[theme].icon}</span>
          <span className="hidden sm:inline">{lang === 'pt' ? THEME_INFO[theme].labelPt : lang === 'es' ? THEME_INFO[theme].labelEs : THEME_INFO[theme].labelEn}</span>
        </div>

        <div className="flex items-center gap-2">
          {timeLeft !== null && (
            <div className={`px-2 sm:px-3 py-1.5 rounded-lg border-2 font-black flex items-center gap-1 shadow-sm transition-colors ${
              timeLeft <= 10 ? 'border-[#FF6B6B] text-[#FF6B6B] bg-[#FFE0E0] animate-pulse' : 'border-[#4D96FF] text-[#4D96FF] bg-[#E0EFFF]'
            }`}>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="p-2 border-2 border-[#4D96FF] bg-white text-[#4D96FF] hover:-translate-y-0.5 shadow-[2px_2px_0px_#4D96FF] rounded-lg transition-transform"
            title={lang === 'pt' ? 'Som' : lang === 'es' ? 'Sonido' : 'Sound'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => startNewGame(theme, difficulty)} 
            className="p-2 border-2 border-[#FFD93D] bg-[#FFEFA3] text-[#4A4A4A] hover:-translate-y-0.5 shadow-[2px_2px_0px_#E2B300] rounded-lg transition-transform"
            title={lang === 'pt' ? 'Reiniciar' : lang === 'es' ? 'Reiniciar' : 'Restart'}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full flex-grow flex items-center justify-center relative overflow-hidden pb-4">
        <div className={`grid gap-2 sm:gap-3 w-full h-full mx-auto max-h-[85vh] ${
          difficulty === 1 ? 'grid-cols-4 grid-rows-2' : 
          difficulty === 2 ? 'grid-cols-4 grid-rows-3' : 
          'grid-cols-4 grid-rows-4'
        }`}>
          {deck.map(card => {
             const isFlippedOrMatched = flippedIds.includes(card.uniqueId) || matchedIds.includes(card.id);
             return (
              <div
                key={card.uniqueId}
                className="relative w-full h-full cursor-pointer group"
                onClick={() => handleCardClick(card)}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ rotateY: isFlippedOrMatched ? 180 : 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front (Card back pattern) */}
                  <div 
                    className="absolute inset-0 bg-[#FFD93D] rounded-2xl border-[3px] border-white flex items-center justify-center shadow-[4px_4px_0px_#E2B300] hover:-translate-y-1 transition-transform"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-white font-black text-4xl sm:text-5xl">?</span>
                  </div>
                  
                  {/* Back (Card face) */}
                  <div 
                    className={`absolute inset-0 rounded-2xl border-[3px] flex flex-col items-center justify-center p-2 overflow-hidden ${
                      matchedIds.includes(card.id) 
                        ? 'bg-[#E1FFEB] border-[#6BCB77] opacity-60 shadow-[4px_4px_0px_#6BCB77]' 
                        : `bg-white ${THEME_INFO[theme].mainBorder} ${THEME_INFO[theme].mainShadow.replace('8px_8px', '4px_4px')}`
                    }`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <span className={`text-4xl sm:text-5xl mb-1 flex-grow flex items-center justify-center ${matchedIds.includes(card.id) ? 'grayscale' : ''}`}>
                      {card.emoji}
                    </span>
                    <span className={`font-black text-[9px] sm:text-[12px] uppercase text-center leading-tracking-tight break-words line-clamp-1 w-full truncate px-1 ${matchedIds.includes(card.id) ? 'text-[#6BCB77]' : THEME_INFO[theme].mainText}`}>
                      {lang === 'pt' ? card.namePt : lang === 'es' ? card.nameEs : card.nameEn}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {(timeLeft === 0 && !isVictory) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center border-4 border-[#FF6B6B] shadow-[8px_8px_0px_#FF6B6B] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
              
              <motion.div 
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                className="w-24 h-24 mx-auto bg-[#FFE0E0] border-4 border-[#FF6B6B] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#FF6B6B] mb-6 relative z-10"
              >
                <Clock className="w-12 h-12 text-[#FF6B6B]" />
              </motion.div>

              <h2 className="text-3xl font-black uppercase text-[#FF6B6B] tracking-tight mb-2 relative z-10">
                {lang === 'pt' ? 'Tempo Esgotado!' : lang === 'es' ? '¡Tiempo Agotado!' : "Time's Up!"}
              </h2>
              <p className="text-[#4A4A4A] mb-6 font-bold relative z-10 tracking-wide">
                {lang === 'pt' ? 'Tente jogar mais rápido.' : lang === 'es' ? 'Intenta jugar más rápido.' : 'Try to play faster.'}
              </p>
              
              <div className="flex flex-col gap-3 relative z-10">
                  <button 
                    onClick={() => startNewGame(theme, difficulty)}
                    className="w-full py-3 border-4 border-[#4D96FF] bg-white text-[#4D96FF] rounded-2xl font-black uppercase text-base shadow-[4px_4px_0px_#4D96FF] hover:-translate-y-1 transition-transform"
                  >
                    {lang === 'pt' ? 'Tentar Novamente' : lang === 'es' ? 'Intentar de Nuevo' : 'Try Again'}
                  </button>
                  <button 
                  onClick={() => { setTheme(null); setTimeLeft(null); setIsTimerActive(false); }}
                  className="w-full py-3 border-4 border-[#E2B300] bg-[#FFD93D] text-[#4A4A4A] rounded-2xl font-black uppercase text-base shadow-[4px_4px_0px_#E2B300] hover:-translate-y-1 transition-transform"
                >
                  {lang === 'pt' ? 'Voltar' : lang === 'es' ? 'Volver' : 'Back'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVictory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center border-4 border-[#F7D060] shadow-[8px_8px_0px_#F7D060] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              
              <motion.div 
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                className="w-24 h-24 mx-auto bg-[#FFD93D] border-4 border-[#E2B300] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#E2B300] mb-6 relative z-10"
              >
                <Medal className="w-12 h-12 text-[#4A4A4A]" />
              </motion.div>

              <h2 className="text-3xl font-black uppercase text-[#FF6B6B] tracking-tight mb-2 relative z-10">
                {lang === 'pt' ? 'Parabéns!' : lang === 'es' ? '¡Felicidades!' : 'Congratulations!'}
              </h2>
              <p className="text-[#4A4A4A] mb-6 font-bold relative z-10 tracking-wide">
                {lang === 'pt' ? 'Você completou o jogo!' : lang === 'es' ? '¡Completaste el juego!' : 'You completed the game!'}
                <span className="block text-sm opacity-70 mt-1 uppercase text-[#4D96FF]">
                  ({moves} {lang === 'pt' ? 'tentativas' : lang === 'es' ? 'intentos' : 'moves'})
                </span>
              </p>
              
              <div className="flex flex-col gap-3 relative z-10">
                {difficulty < 3 ? (
                  <button 
                    onClick={() => {
                      const nextDiff = (difficulty + 1) as DifficultyType;
                      setDifficulty(nextDiff);
                      startNewGame(theme, nextDiff);
                    }}
                    className="w-full py-3 border-4 border-[#6BCB77] bg-[#E1FFEB] text-[#6BCB77] rounded-2xl font-black uppercase text-base shadow-[4px_4px_0px_#6BCB77] hover:-translate-y-1 transition-transform"
                  >
                    {lang === 'pt' ? 'Próximo Nível' : lang === 'es' ? 'Siguiente Nivel' : 'Next Level'}
                  </button>
                ) : (
                  <button 
                    onClick={() => startNewGame(theme, difficulty)}
                    className="w-full py-3 border-4 border-[#4D96FF] bg-white text-[#4D96FF] rounded-2xl font-black uppercase text-base shadow-[4px_4px_0px_#4D96FF] hover:-translate-y-1 transition-transform"
                  >
                    {lang === 'pt' ? 'Jogar Novamente' : lang === 'es' ? 'Jugar de Nuevo' : 'Play Again'}
                  </button>
                )}
                <button 
                  onClick={() => setTheme(null)}
                  className="w-full py-3 border-4 border-[#E2B300] bg-[#FFD93D] text-[#4A4A4A] rounded-2xl font-black uppercase text-base shadow-[4px_4px_0px_#E2B300] hover:-translate-y-1 transition-transform"
                >
                  {lang === 'pt' ? 'Trocar Tema' : lang === 'es' ? 'Cambiar Tema' : 'Change Theme'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
