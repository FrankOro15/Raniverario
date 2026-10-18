
'use client';

import { useEffect, useState } from 'react';

type Foto = {
  id: number;
  src: string;
  titulo: string;
  tipo: 'imagen' | 'video';
};

const videos = new Set([19, 22, 23, 24, 32, 35]);
const imagenesJpeg = new Set([33, 34, ...Array.from({ length: 15 }, (_, i) => i + 36)]);

const fotos: Foto[] = Array.from({ length: 50 }, (_, index) => {
  const numero = index + 1;
  const tipo = videos.has(numero) ? 'video' : 'imagen';
  const extension = videos.has(numero)
    ? 'mp4'
    : imagenesJpeg.has(numero)
      ? 'jpeg'
      : 'jpg';

  return {
    id: numero,
    src: `/album/fr${numero}.${extension}`,
    titulo: `Fotografía ${numero}`,
    tipo,
  };
});

const rotaciones = [
  '-rotate-2',
  'rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-3',
  '-rotate-3',
];

const tamanos = [
  'min-h-[300px]',
  'min-h-[250px]',
  'min-h-[340px]',
  'min-h-[280px]',
  'min-h-[320px]',
  'min-h-[260px]',
];

export default function Galeria() {
  const [fotoAbierta, setFotoAbierta] = useState<number | null>(null);
  const [imagenesFallidas, setImagenesFallidas] = useState<Set<number>>(
    () => new Set()
  );

  const indiceAbierto =
    fotoAbierta === null
      ? -1
      : fotos.findIndex((foto) => foto.id === fotoAbierta);

  const fotoSeleccionada =
    indiceAbierto >= 0 ? fotos[indiceAbierto] : null;

  const cerrarFoto = () => setFotoAbierta(null);

  const cambiarFoto = (direccion: -1 | 1) => {
    if (indiceAbierto < 0) return;

    const nuevoIndice =
      (indiceAbierto + direccion + fotos.length) % fotos.length;

    setFotoAbierta(fotos[nuevoIndice].id);
  };

  useEffect(() => {
    if (fotoAbierta === null) return;

    const manejarTeclas = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') cerrarFoto();
      if (evento.key === 'ArrowRight') cambiarFoto(1);
      if (evento.key === 'ArrowLeft') cambiarFoto(-1);
    };

    const scrollAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', manejarTeclas);

    return () => {
      document.body.style.overflow = scrollAnterior;
      window.removeEventListener('keydown', manejarTeclas);
    };
  }, [fotoAbierta, indiceAbierto]);

  const imagenFallida = (id: number) => {
    setImagenesFallidas((anteriores) => {
      const nuevas = new Set(anteriores);
      nuevas.add(id);
      return nuevas;
    });
  };

  return (
    <>
      <section className="animate-fadeIn relative w-full overflow-hidden border border-[#c9c0a8] bg-[#eee7d7] px-5 py-9 text-[#414735] shadow-[0_12px_30px_rgba(35,42,29,0.18)] sm:px-8 sm:py-12 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7px] border border-[#d9cfb8]"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-5 -top-8 select-none font-serif text-8xl text-[#788465]/15"
        >
          ❧
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-5 rotate-180 select-none font-serif text-8xl text-[#788465]/15"
        >
          ❧
        </span>

        <div className="relative z-10">
          <header className="mx-auto mb-12 max-w-xl text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#85846a]">
              Fotografías, recuerdos y nosotros
            </p>

            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#414735] sm:text-5xl">
              Nuestro álbum
            </h2>

            <div className="editorial-divider mx-auto mt-5 max-w-xs text-xs">
              <span aria-hidden="true">✳</span>
            </div>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#777665] sm:text-base">
              Pongo algunas fotos de antes porque, al final de cuentas, esta es
              nuestra historia. Te amo; hemos creado muchos momentos bonitos y
              memorables, rana princesa. 💜
            </p>
          </header>

          <div className="grid grid-cols-1 items-start gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {fotos.map((foto, indice) => {
              const tieneImagen = !imagenesFallidas.has(foto.id);

              return (
                <article
                  key={foto.id}
                  className={`relative mx-auto w-full max-w-[370px] ${rotaciones[indice % rotaciones.length]} transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.025]`}
                >
                  {/* Cinta decorativa */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-20 -translate-x-1/2 rotate-[-3deg] border border-[#c4b895]/60 bg-[#d8d3b2]/75 shadow-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setFotoAbierta(foto.id)}
                    aria-label={`Abrir ${foto.titulo}`}
                    className="group block w-full cursor-pointer border border-[#d8cdb8] bg-[#faf7ef] p-3 pb-5 text-left shadow-[0_7px_14px_rgba(50,45,31,0.14)] transition-shadow hover:shadow-[0_14px_25px_rgba(50,45,31,0.2)]"
                  >
                    <div
                      className={`relative flex ${tamanos[indice % tamanos.length]} items-center justify-center overflow-hidden border border-[#e5dcc9] bg-[#e8e2d3]`}
                    >
                      {tieneImagen ? (
                        foto.tipo === 'video' ? (
                          <video
                            src={foto.src}
                            aria-label={foto.titulo}
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            onError={() => imagenFallida(foto.id)}
                            className="absolute inset-0 h-full w-full object-contain"
                          />
                        ) : (
                          <img
                            src={foto.src}
                            alt={foto.titulo}
                            loading="lazy"
                            decoding="async"
                            onError={() => imagenFallida(foto.id)}
                            className="absolute inset-0 h-full w-full object-contain"
                          />
                        )
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#f4efe3_0%,#ded6c3_100%)] px-5 text-center">
                          <span className="font-serif text-5xl text-[#9b9a7b]/60">
                            ❧
                          </span>

                          <span className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[#85846a]">
                            Fotografía {foto.id}
                          </span>

                          <span className="mt-2 font-serif text-sm italic text-[#777665]">
                            Aquí va nuestro recuerdo
                          </span>
                        </div>
                      )}

                      <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center border border-white/70 bg-[#f8f4e9]/90 text-[#555d43] opacity-80 shadow-sm transition-opacity group-hover:opacity-100">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        >
                          <path d="M15 3h6v6M14 10l7-7M9 21H3V15M10 14l-7 7" />
                        </svg>
                      </span>
                    </div>

                  </button>
                </article>
              );
            })}
          </div>

          <footer className="mt-14 border-t border-[#d3c7b0] pt-6 text-center">
            <span className="font-serif text-xl italic text-[#85846a]">
              ❧
            </span>
            <p className="mt-2 font-serif text-sm italic text-[#777665]">
              Y todavía nos quedan recuerdos por crear...
            </p>
          </footer>
        </div>
      </section>

      {/* VISOR EMERGENTE */}
      {fotoSeleccionada && (
        <div
          role="presentation"
          onClick={cerrarFoto}
          className="animate-fadeIn fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#22271f]/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Visor de ${fotoSeleccionada.titulo}`}
            onClick={(evento) => evento.stopPropagation()}
            className="relative my-auto w-full max-w-4xl border border-[#c9c0a8] bg-[#f5f0e4] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.4)] sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[5px] border border-[#d8cdb8]"
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#d8cdb8] px-1 pb-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#85846a]">
                    Nuestro álbum
                  </p>

                  <p className="mt-1 font-serif text-lg text-[#414735]">
                    {fotoSeleccionada.titulo}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={cerrarFoto}
                  aria-label="Cerrar fotografía"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9c0a8] text-2xl text-[#555d43] transition-colors hover:bg-[#e5ddca]"
                >
                  ×
                </button>
              </div>

              <div className="flex min-h-[250px] items-center justify-center bg-[#e6dfd0] p-2 sm:min-h-[350px] sm:p-5">
                {!imagenesFallidas.has(fotoSeleccionada.id) ? (
                  fotoSeleccionada.tipo === 'video' ? (
                    <video
                      src={fotoSeleccionada.src}
                      aria-label={fotoSeleccionada.titulo}
                      controls
                      autoPlay
                      playsInline
                      onError={() => imagenFallida(fotoSeleccionada.id)}
                      className="max-h-[65vh] max-w-full object-contain shadow-md"
                    />
                  ) : (
                    <img
                      src={fotoSeleccionada.src}
                      alt={fotoSeleccionada.titulo}
                      onError={() => imagenFallida(fotoSeleccionada.id)}
                      className="max-h-[65vh] max-w-full object-contain shadow-md"
                    />
                  )
                ) : (
                  <div className="flex min-h-[280px] w-full flex-col items-center justify-center px-6 text-center sm:min-h-[400px]">
                    <span className="font-serif text-7xl text-[#92977a]/70">
                      ❧
                    </span>

                    <p className="mt-5 font-serif text-xl text-[#414735]">
                      {fotoSeleccionada.titulo}
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#777665]">
                      Cuando agregues el archivo{' '}
                      <span className="font-semibold">
                        fr{fotoSeleccionada.id}.{fotoSeleccionada.tipo === 'video' ? 'mp4' : 'jpg'}
                      </span>
                      , aparecerá aquí.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => cambiarFoto(-1)}
                  className="flex items-center gap-2 border border-[#c9c0a8] px-3 py-2 text-xs text-[#555d43] transition-colors hover:bg-[#e5ddca] sm:px-5"
                >
                  <span aria-hidden="true">←</span>
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <p className="text-center text-[9px] uppercase tracking-[0.15em] text-[#85846a] sm:text-xs">
                  {String(fotoSeleccionada.id).padStart(2, '0')} /{' '}
                  {fotos.length}
                </p>

                <button
                  type="button"
                  onClick={() => cambiarFoto(1)}
                  className="flex items-center gap-2 border border-[#c9c0a8] px-3 py-2 text-xs text-[#555d43] transition-colors hover:bg-[#e5ddca] sm:px-5"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <p className="mt-4 text-center text-[9px] italic text-[#85846a]">
                Pulsa fuera de la fotografía o presiona Esc para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
