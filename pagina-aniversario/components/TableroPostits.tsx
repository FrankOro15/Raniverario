'use client';

import { useState } from 'react';

type NotaConfig = {
  ranitaImg: string;
  rotacion: number;
};

export default function TableroPostits() {
  // Tus 38 razones completas
  const todasLasRazones = [
    "Me gusta tu sonrisa", "Me gusta tu piel", "Me gustan tus labios", "Porque me haces feliz",
    "Porque eres lo mejor del mundo", "Porque me quieres", "Porque eres la mejor novia del universo",
    "Porque tu sonrisa alegra mis días", "Porque tus ojos lindos brillan tan hermoso",
    "Porque me divierto contigo demasiado", "Porque me río mucho contigo",
    "Porque me cuidas y me abrazas", "Porque amo tus besos", "Porque amo tus abrazos",
    "Porque amo tus manos y amo tu toque", "Porque tu risa me encanta y la podría diferenciar en cualquier lugar del mundo",
    "Amo la forma en la que me miras", "Amo que tenemos a la kirr",
    "Amo cómo me salvas los días con un solo mensajito tuyo",
    "Porque me encanta cuando te quedas dormida en mi hombro",
    "Amo nuestras pláticas de la nada sobre cualquier tontería",
    "Amo que eres mi paz en medio del caos del mundo",
    "Te amo por bonita jeje", "Te amo porque eres mi mundo",
    "Porque eres mi rana melón, mi rana pelón jejej",
    "La verdad no necesito razones para amarte, simplemente no puedo dejar de hacerlo y aun así hay razones infinitas de por qué te amo",
    "Porque eres una rana bb", "Because eres mi conija",
    "Porque quiero una familia tradicional panista cristiana y conservadora contigo",
    "Por eso te amo", "Te amo porque a diario me das razones para amarte",
    "Te amo porque estoy enamorado de ti", "Te amo porque realmente no puedo vivir sin ti",
    "Because puedo ser al lado de ti yo mismo", "Porque me encanta verte feliz",
    "Porque veo un futuro contigo", "Simplemente eres tú", "Te amo y te elegiría mil vidas"
  ];

  const [razonesDescubiertas, setRazonesDescubiertas] = useState<string[]>([]);
  const [notasConfig, setNotasConfig] = useState<NotaConfig[]>([]);

  const agregarPostIt = () => {
    if (razonesDescubiertas.length < todasLasRazones.length) {
      const siguienteIndex = razonesDescubiertas.length;
      setRazonesDescubiertas([todasLasRazones[siguienteIndex], ...razonesDescubiertas]);
      
      const ranitaNum = Math.floor(Math.random() * 9) + 1;
      const ranitaImg = `/images/r${ranitaNum}.jpg`;
      const rotacionAleatoria = Math.random() * 5 - 2.5; 

      setNotasConfig([{ ranitaImg, rotacion: rotacionAleatoria }, ...notasConfig]);
    }
  };

  const tableroCompleto = razonesDescubiertas.length === todasLasRazones.length;

  return (
    <section 
      className="w-[calc(100vw-2rem)] max-w-[1400px] h-[760px] shrink-0 rounded-3xl p-8 sm:p-12 shadow-2xl relative flex flex-col items-center gap-6 border-[10px] border-[#C9B596] ring-1 ring-inset ring-[#F8F1E5]"
      style={{ 
        backgroundColor: '#F1EBDD',
        backgroundImage: 'radial-gradient(ellipse at center, #F8F4E9 0%, #EEE5D3 100%)',
        boxShadow: 'inset 0 0 0 5px rgba(255, 250, 240, 0.55), 0 20px 40px rgba(74, 59, 50, 0.18)',
      }}
    >
      {/* TÍTULO LIMPIO */}
      <div className="text-center bg-[#F4F5E8]/95 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#C8D5B5] shadow-md z-10">
        <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-[#40543B]">Tablero de razones por las que te amo 📌</h3>
        <p className="text-xs text-[#6F8061] mt-0.5">Haz clic para descubrir una nueva razón</p>
      </div>

      {/* BOTÓN O MENSAJE FINAL */}
      {!tableroCompleto ? (
        <button
          onClick={agregarPostIt}
          className="bg-[#718B63] border border-[#5D7651] text-white text-xs px-6 py-3 rounded-full shadow-md hover:bg-[#627D55] transition font-medium tracking-wide z-10"
        >
          Descubre otra razón 💛
        </button>
      ) : (
        <div className="bg-[#F4F5E8] border-2 border-dashed border-[#C8D5B5] p-6 rounded-2xl shadow-lg animate-bounce text-center z-10">
          <p className="font-serif text-base text-[#40543B] font-bold">
            🤍 Te amo melón y siempre lo haré, tú eres mi hogar 🤍
          </p>
        </div>
      )}

      {/* TARJETITAS CON LA IMAGEN DE LA RANITA EN FORMATO .JPG */}
      {razonesDescubiertas.length > 0 && (
        <div className="board-scrollbar grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-[clamp(160px,22vw,260px)] gap-8 pt-4 w-full max-h-[440px] sm:max-h-[520px] overflow-y-auto px-3 z-10">
          {razonesDescubiertas.map((razon, index) => {
            const config = notasConfig[index] || { ranitaImg: '/images/r1.jpg', rotacion: 0 };

            return (
              <div 
                key={index}
                style={{ transform: `rotate(${config.rotacion}deg)` }}
                className="relative h-full min-w-0 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center bg-white transition hover:scale-105 duration-200 border-2 border-[#C8E0C4] overflow-hidden"
              >
                {/* IMAGEN DE LA RANITA EN JPG */}
                <img 
                  src={config.ranitaImg} 
                  alt="Post-it ranita" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
                />

                {/* Texto de la razón superpuesto */}
                <p className="font-serif text-xs md:text-sm text-[#2D3A2E] font-medium leading-relaxed drop-shadow-sm px-3 py-2 z-10 bg-white/80 backdrop-blur-[2px] rounded-xl my-auto">
                  &quot;{razon}&quot;
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
