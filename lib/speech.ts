export const speakText = (text: string, lang: 'pt' | 'en' | 'es') => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any previous utterance to avoid queue buildup
    window.speechSynthesis.cancel();
    
    // Slight delay to ensure cancel resolves properly before a new utterance
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'pt-BR';
      utterance.lang = targetLang;
      // Increase pitch slightly more to sound like a child
      utterance.pitch = 1.4; 
      utterance.rate = 0.9;  // Slightly slower for children to clearly hear and repeat
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Find voices for the language
        const langVoices = voices.filter(v => v.lang.replace('_', '-').startsWith(targetLang) || v.lang.startsWith(lang));
        
        // Prioritize natural sounding (e.g. Google or premium voices) if available
        let preferredVoice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural'));
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        } else if (langVoices.length > 0) {
          // If no specific premium/Google voice, pick the first matching
          utterance.voice = langVoices[0];
        }
      }

      window.speechSynthesis.speak(utterance);
    }, 50);
  }
};
