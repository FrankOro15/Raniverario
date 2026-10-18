
'use client';

import { useEffect, useState } from 'react';

export const fechaAniversario = new Date('2026-10-19T20:00:00').getTime();

export default function ContadorAniversario() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = fechaAniversario - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false,
      });
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full overflow-hidden border border-[#d6c9ab] bg-[#faf6eb] px-5 py-8 text-center shadow-[0_16px_40px_rgba(35,42,29,0.22)] sm:px-10 sm:py-10">
      {/* Marco interior */}
      <div className="pointer-events-none absolute inset-[7px] border border-[#d4c5a5]" />

      {/* Detalles decorativos */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -top-8 font-serif text-8xl text-[#788465]/10"
      >
        ❧
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-4 rotate-180 font-serif text-8xl text-[#788465]/10"
      >
        ❧
      </span>

      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#73775d] sm:text-[10px]">
          Una fecha para guardar en el corazón
        </p>

        <h2 className="mt-3 font-serif text-xl font-normal text-[#414735] sm:text-2xl">
          {timeLeft.isFinished
            ? '¡Llegó nuestro aniversario!'
            : 'La espera hasta nuestro día'}
        </h2>

        <div className="editorial-divider mx-auto mt-4 max-w-xs text-xs">
          <span aria-hidden="true">✳</span>
        </div>

        <p className="mt-4 font-serif text-sm italic text-[#777665]">
          19 de octubre · 8:00 de la noche
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-5">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center border-r border-[#d8cbb4] py-2 last:border-r-0"
            >
              <span className="font-serif text-4xl font-normal tabular-nums tracking-tight text-[#414b36] sm:text-5xl">
                {String(unit.value).padStart(2, '0')}
              </span>

              <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#777665]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-7 font-serif text-xs italic text-[#777665]">
          No she se me hace irreal que  ya llevamos un año, estoy muy feliz y yo quiero llorar cada que lo recuerdo, enserio eres mi mayorr adoracion
          Te amo mas que a nada eres lo mejor que jamas me ha pasado, espero que sea el contador de nuestro primer año y que sigan muchisimos más.
        </p>
      </div>
    </section>
  );
}
