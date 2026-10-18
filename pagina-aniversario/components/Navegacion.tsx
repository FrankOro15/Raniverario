
'use client';

export type Seccion = 'minijuego' | 'galeria' | 'cartitas';

type NavegacionProps = {
  activeSection: Seccion;
  onSectionChange: (section: Seccion) => void;
};

const secciones: {
  id: Seccion;
  numero: string;
  titulo: string;
  detalle: string;
}[] = [
  {
    id: 'galeria',
    numero: 'I',
    titulo: 'Galería',
    detalle: 'En fotografías',
  },
  {
    id: 'cartitas',
    numero: 'II',
    titulo: 'Cartita',
    detalle: 'Solo para ti',
  },
  {
    id: 'minijuego',
    numero: 'III',
    titulo: 'Minijuego',
    detalle: 'Atrapa corazones',
  },
];

export default function Navegacion({
  activeSection,
  onSectionChange,
}: NavegacionProps) {
  return (
    <nav
      aria-label="Secciones del aniversario"
      className="w-full max-w-2xl"
    >
      <div className="mb-3 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.28em] text-[#e4dfca]/80">
        <span className="h-px w-8 bg-[#e4dfca]/40" />
        Elige qué quieres hacer
        <span className="h-px w-8 bg-[#e4dfca]/40" />
      </div>

      <div className="grid grid-cols-3 items-stretch gap-2 sm:gap-3">
        {secciones.map((seccion) => {
          const isActive = activeSection === seccion.id;

          return (
            <button
              key={seccion.id}
              type="button"
              onClick={() => onSectionChange(seccion.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative flex min-h-[100px] flex-col items-center justify-center gap-1 border px-2 py-4 text-center transition-all duration-300 sm:min-h-[112px] sm:px-4 ${
                isActive
                  ? 'border-[#e0d3b7] bg-[#f7f1e3] text-[#414735] shadow-[0_5px_16px_rgba(35,42,29,0.15)]'
                  : 'border-[#d8ddc7]/35 bg-[#43513a]/30 text-[#f0ead9] hover:border-[#e0d3b7]/70 hover:bg-[#f7f1e3]/10'
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-2 right-2 top-1 h-px bg-[#c9b995] sm:left-3 sm:right-3"
                />
              )}

              <span
                className={`font-serif text-xs italic ${
                  isActive ? 'text-[#8b896c]' : 'text-[#d8ddc7]'
                }`}
              >
                {seccion.numero}
              </span>

              <span className="font-serif text-sm sm:text-base">
                {seccion.titulo}
              </span>

              <span
                className={`text-[8px] tracking-wide sm:text-[9px] ${
                  isActive ? 'text-[#85846a]' : 'text-[#e0e3d3]/75'
                }`}
              >
                {seccion.detalle}
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[#e0d3b7] bg-[#f7f1e3]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
