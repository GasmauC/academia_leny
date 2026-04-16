import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Settings, Sparkles, BookOpen, KeySquare, ShieldAlert } from 'lucide-react';
import EditorialText from './EditorialText';
import { askTutor, initAITutor, hasValidKey, clearAIKey } from '../services/aiOrchestrator';

export default function TutorAI() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "¡Hola! Soy **Leny**, tu Tutor Académico basado estrictamente en *La Biblia del Pequeño Leny*. ¿En qué módulo teórico te encuentras estancado o qué tirada te gustaría que analicemos paso a paso?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsConfigured(hasValidKey());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSaveKey = () => {
    if (apiKeyInput.trim() && initAITutor(apiKeyInput.trim())) {
      setIsConfigured(true);
      setApiKeyInput('');
    }
  };

  const handleClearKey = () => {
    clearAIKey();
    setIsConfigured(false);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Send the entire past history (excluding the first greeting, optionally, but it's fine)
      const currentHistory = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await askTutor(currentHistory, userMsg);
      
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: `**Error de Conexión:** ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const insertShortcut = (text) => {
    setInputValue(text);
  };

  // VISTA DE CONFIGURACIÓN DE API KEY
  if (!isConfigured) {
    return (
      <div className="h-full flex items-center justify-center bg-leny-darker p-6 fade-in">
        <div className="max-w-md w-full bg-leny-dark border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-leny-accent/5 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none"></div>
           
           <div className="w-16 h-16 bg-leny-accent/10 rounded-2xl flex items-center justify-center mb-6 border border-leny-accent/20">
             <KeySquare className="w-8 h-8 text-leny-accent" />
           </div>
           
           <h2 className="text-3xl font-serif text-white mb-2">Llave de Acceso</h2>
           <p className="text-leny-dim text-sm mb-8 leading-relaxed">
             Para despertar al Tutor Leny, necesitas una clave gratuita de <strong>Google Gemini API</strong>. Esto permite que el motor procese todo nuestro libro en segundos directamente desde tu navegador, sin servidores intermediarios.
           </p>

           <div className="space-y-4">
             <div>
               <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">
                 Google AI Studio API Key
               </label>
               <input 
                 type="password"
                 value={apiKeyInput}
                 onChange={(e) => setApiKeyInput(e.target.value)}
                 placeholder="AIzaSy..."
                 className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-leny-accent transition-colors"
                 onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
               />
             </div>
             
             <button 
               onClick={handleSaveKey}
               className="w-full bg-leny-accent hover:bg-yellow-500 text-black font-bold rounded-xl py-3 transition-colors flex items-center justify-center gap-2"
             >
               <Settings className="w-5 h-5" /> Iniciar Motor Neuronal
             </button>

             <div className="mt-4 p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 text-xs text-blue-200 flex flex-col gap-2">
               <span className="font-bold flex items-center gap-1"><ShieldAlert className="w-4 h-4"/> Privacidad Absoluta</span>
               Tu clave se guarda exclusivamente en el almacenamiento local de tu navegador (localStorage). Nadie más tiene acceso a ella.
             </div>
           </div>
        </div>
      </div>
    );
  }

  // VISTA DEL CHAT INTERACTIVO
  return (
    <div className="h-full flex flex-col bg-leny-darker text-white fade-in relative">
      <div className="flex-shrink-0 border-b border-white/5 bg-leny-dark/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-leny-accent/10 rounded-xl flex items-center justify-center border border-leny-accent/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]">
              <Bot className="w-6 h-6 text-leny-accent" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-leny-dark rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-serif text-white leading-tight">Profesor Leny</h2>
            <div className="text-xs font-medium text-leny-accent flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Base de Datos Cerrada Activa
            </div>
          </div>
        </div>

        <button 
          onClick={handleClearKey}
          className="p-2 rounded-lg hover:bg-white/5 text-leny-dim hover:text-red-400 transition-colors"
          title="Desconectar Tutor (Borrar API Key)"
        >
          <KeySquare className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-4 md:p-8 space-y-6">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full slide-up`}>
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${isUser ? 'bg-white/10 text-white/50' : 'bg-leny-accent/20 text-leny-accent'}`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 md:p-5 rounded-2xl shadow-sm text-[15px] leading-relaxed
                  ${isUser 
                    ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none' 
                    : 'bg-leny-dark border border-white/10 text-white/90 rounded-tl-none prose prose-invert prose-leny'}`}>
                  
                  {isUser ? (
                    <div className="text-white font-medium">{msg.content}</div>
                  ) : (
                    <EditorialText text={msg.content} className="prose-leny" />
                  )}
                </div>

              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-leny-accent/20 text-leny-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-5 rounded-2xl bg-leny-dark border border-white/10 rounded-tl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-leny-accent/50 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-leny-accent/50 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-leny-accent/50 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                <span className="text-xs text-leny-dim ml-2 font-serif italic">Leny está consultando el libro...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 p-4 bg-leny-darker border-t border-white/5 relative">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar hidden-scroll-bar-mobile mb-2">
            <button onClick={() => insertShortcut("Explícame la regla de Carta Dominante y Carta Modificadora")} className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs text-leny-dim hover:text-white border border-white/5 transition-colors whitespace-nowrap">
              <Sparkles className="w-3 h-3 inline mr-1" /> Regla Dominante/Modificadora
            </button>
            <button onClick={() => insertShortcut("Dame un ejemplo nuevo de tirada de 3 cartas analizando la Carta Bisagra")} className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs text-leny-dim hover:text-white border border-white/5 transition-colors whitespace-nowrap">
              <Sparkles className="w-3 h-3 inline mr-1" /> Ejemplo Tríada Nueva
            </button>
            <button onClick={() => insertShortcut("¿Por qué fallan las lecturas de Grand Tableau sin la técnica del Salto de Caballo?")} className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs text-leny-dim hover:text-white border border-white/5 transition-colors whitespace-nowrap">
               El Salto del Caballo en GT
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregunta a tu profesor..."
              disabled={isLoading}
              className="w-full bg-leny-dark border border-white/10 focus:border-leny-accent text-white rounded-2xl py-4 pl-6 pr-14 outline-none transition-colors disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-3 p-2 bg-leny-accent text-leny-dark rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-leny-accent transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-3 text-[10px] text-white/30">
            Tutor Leny procesa todo el compendio teórico directamente en memoria (RAG). Las falsas predicciones serán rechazadas.
          </div>
        </div>
      </div>
    </div>
  );
}
