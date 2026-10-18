
import Reproductor from '@/components/Reproductor';

export default function Portada() {
  return (
    <header className="relative w-full overflow-hidden border border-[#b7b49a] bg-[#f3eedf] text-[#414735] shadow-[0_12px_40px_rgba(48,53,37,0.12)]">
      {/* Marco interior */}
      <div className="pointer-events-none absolute inset-[7px] border border-[#c9c3a9]" />
      <div className="pointer-events-none absolute inset-[12px] border border-[#ded5c0]" />

      {/* Adornos botánicos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-7 -top-9 select-none font-serif text-[150px] leading-none text-[#788465]/15"
      >
        ❧
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-14 -right-5 rotate-180 select-none font-serif text-[150px] leading-none text-[#788465]/15"
      >
        ❧
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7 px-7 py-10 sm:px-12 sm:py-14">
        {/* Encabezado editorial */}
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#73775d] sm:text-xs">
          <span className="h-px w-8 bg-[#a9a58b] sm:w-12" />
          <span>Nuestro pequeño mundo</span>
          <span className="h-px w-8 bg-[#a9a58b] sm:w-12" />
        </div>

        {/* Título principal */}
        <div className="max-w-2xl text-center">
          <p className="mb-3 font-serif text-lg italic text-[#8b896c] sm:text-xl">
            Para nosotros, por siempre
          </p>

          <h1 className="font-serif text-4xl font-normal leading-[1.12] tracking-[-0.045em] text-[#414735] sm:text-6xl md:text-7xl">
            ¡Feliz
            <span className="mt-1 block italic text-[#788465]">
              Aniversario!
            </span>
          </h1>

          <div className="editorial-divider mx-auto mt-7 max-w-xs text-xs">
            <span aria-hidden="true">✳</span>
          </div>

          <p className="mx-auto mt-5 max-w-md font-serif text-sm leading-7 text-[#777665] sm:text-base">
            Este es mi regalo para ti, con mucho amor
            <br />
            Te amo mucho miamor ranita melonnn 🐸💖
          </p>
        </div>

        {/* Reproductor */}
        <div className="w-full max-w-md border-t border-[#d5cbb5] pt-5">
          <div className="flex justify-center">
            <Reproductor />
          </div>
        </div>

        {/* Pie decorativo */}
        <div className="flex items-center gap-3 font-serif text-xs italic text-[#85846a]">
          <span aria-hidden="true">❧</span>
          <span>Hecho de recuerdos, código y muchísimo amor</span>
          <span aria-hidden="true">❧</span>
        </div>
      </div>
    </header>
  );
}
