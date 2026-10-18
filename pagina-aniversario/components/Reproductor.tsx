
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Cancion = {
  id: number;
  titulo: string;
  artista: string;
  src: string;
  portada: string;
};

const canciones: Cancion[] = [
  {
    id: 1,
    titulo: 'When We Met',
    artista: 'Jonathan Bree',
    src: `/music/${encodeURIComponent('When We Met.mp3')}`,
    portada: '/images/covers/kir1.jpg',
  },
  {
    id: 2,
    titulo: 'So High School',
    artista: 'Taylor Swift',
    src: `/music/${encodeURIComponent('Taylor Swift - So High School『sub. español + letra_ lyrics』.mp3')}`,
    portada: '/images/covers/pm4.jpg',
  },
  {
    id: 3,
    titulo: 'Lover',
    artista: 'Taylor Swift',
    src: `/music/${encodeURIComponent('Taylor Swift - Lover (Official Lyric Video).mp3')}`,
    portada: '/images/covers/pm1.jpg',
  },
  {
    id: 4,
    titulo: 'Día de Enero',
    artista: 'Shakira',
    src: `/music/${encodeURIComponent('Shakira - Día de Enero.mp3')}`,
    portada: '/images/covers/pm6.jpg',
  },
  {
    id: 5,
    titulo: 'Aroma',
    artista: 'Sen Senra',
    src: `/music/${encodeURIComponent('Sen Senra - Aroma.mp3')}`,
    portada: '/images/covers/pm2.jpg',
  },
  {
    id: 6,
    titulo: 'drop dead',
    artista: 'Olivia Rodrigo',
    src: `/music/${encodeURIComponent('Olivia Rodrigo - drop dead (Official Music Video).mp3')}`,
    portada: '/images/covers/pm7.jpg',
  },
  {
    id: 7,
    titulo: 'Miss You',
    artista: 'Jonathan Bree',
    src: `/music/${encodeURIComponent('Miss You.mp3')}`,
    portada: '/images/covers/pm3.jpg',
  },
  {
    id: 8,
    titulo: 'te quiero tanto',
    artista: 'Kevin Kaarl',
    src: `/music/${encodeURIComponent('Kevin Kaarl - te quiero tanto (Letra).mp3')}`,
    portada: '/images/covers/pm5.jpg',
  },
  {
    id: 9,
    titulo: 'Tus Gafitas',
    artista: 'KAROL G',
    src: `/music/${encodeURIComponent('KAROL G - Tus Gafitas (Lyrics _ Letra).mp3')}`,
    portada: '/images/covers/kir1.jpg',
  },
  {
    id: 10,
    titulo: 'Destiny',
    artista: 'Jonathan Bree',
    src: `/music/${encodeURIComponent('Jonathan Bree - Destiny.mp3')}`,
    portada: '/images/covers/pm2.jpg',
  },
  {
    id: 11,
    titulo: 'Honey',
    artista: 'Taylor Swift',
    src: `/music/${encodeURIComponent('Honey.mp3')}`,
    portada: '/images/covers/pm5.jpg',
  },
  {
    id: 12,
    titulo: 'Si no te tengo a ti',
    artista: 'Hombres G',
    src: `/music/${encodeURIComponent('Hombres G - Si no te tengo a ti (Audio Oficial).mp3')}`,
    portada: '/images/covers/pm7.jpg',
  },
  {
    id: 13,
    titulo: 'we fell in love in october',
    artista: 'girl in red',
    src: `/music/${encodeURIComponent('girl in red - we fell in love in october.mp3')}`,
    portada: '/images/covers/pm1.jpg',
  },
  {
    id: 14,
    titulo: 'Vínculo',
    artista: 'Enjambre',
    src: `/music/${encodeURIComponent('Enjambre - Vínculo (Lyric Video).mp3')}`,
    portada: '/images/covers/pm3.jpg',
  },
  {
    id: 15,
    titulo: 'Fuego',
    artista: 'El mató a un policía motorizado',
    src: `/music/${encodeURIComponent('El mató a un policía motorizado - Fuego.mp3')}`,
    portada: '/images/covers/pm6.jpg',
  },
  {
    id: 16,
    titulo: 'Enamorado Tuyo',
    artista: 'El Cuarteto de Nos',
    src: `/music/${encodeURIComponent('El Cuarteto de Nos - Enamorado Tuyo (Lyrics).mp3')}`,
    portada: '/images/covers/pm4.jpg',
  },
  {
    id: 17,
    titulo: 'WELTiTA',
    artista: 'Bad Bunny & Chuwi',
    src: `/music/${encodeURIComponent('Bad Bunny & Chuwi - WELTiTA (Letra_Lyrics).mp3')}`,
    portada: '/images/covers/pm2.jpg',
  },
];

function formatoTiempo(segundos: number) {
  if (!Number.isFinite(segundos)) return '0:00';

  const minutos = Math.floor(segundos / 60);
  const resto = Math.floor(segundos % 60);

  return `${minutos}:${String(resto).padStart(2, '0')}`;
}

function obtenerDuracion(audio: HTMLAudioElement) {
  return Number.isFinite(audio.duration) && audio.duration > 0
    ? audio.duration
    : 0;
}

function Icono({
  tipo,
  className = 'h-5 w-5',
}: {
  tipo: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    play: <path d="M8 5v14l11-7z" fill="currentColor" />,
    pause: (
      <>
        <path d="M7 5h4v14H7z" fill="currentColor" />
        <path d="M15 5h4v14h-4z" fill="currentColor" />
      </>
    ),
    next: (
      <>
        <path d="M6 5v14l10-7z" fill="currentColor" />
        <path d="M18 5v14" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    prev: (
      <>
        <path d="M18 5v14L8 12z" fill="currentColor" />
        <path d="M6 5v14" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    shuffle: (
      <path
        d="M16 3h5v5M4 20 21 3M21 16v5h-5M4 4l5 5M15 15l6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    list: (
      <>
        <path
          d="M9 6h12M9 12h12M9 18h12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="4" cy="6" r="1" fill="currentColor" />
        <circle cx="4" cy="12" r="1" fill="currentColor" />
        <circle cx="4" cy="18" r="1" fill="currentColor" />
      </>
    ),
    volume: (
      <>
        <path d="M4 10v4h4l5 4V6l-5 4z" fill="currentColor" />
        <path
          d="M16 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {paths[tipo]}
    </svg>
  );
}


function RanitaSVG({ className = 'h-14 w-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ranita verde estilo acuarela"
    >
      <defs>
        <radialGradient id="rana-cuerpo" cx="38%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#C3D0A5" />
          <stop offset="48%" stopColor="#96AD7D" />
          <stop offset="100%" stopColor="#637D56" />
        </radialGradient>

        <radialGradient id="rana-barriga" cx="40%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#FFF9E8" />
          <stop offset="65%" stopColor="#E5E4C9" />
          <stop offset="100%" stopColor="#C7D0AE" />
        </radialGradient>

        <radialGradient id="rana-mejilla">
          <stop offset="0%" stopColor="#D89A91" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#D89A91" stopOpacity="0" />
        </radialGradient>

        <filter id="rana-suavidad" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
      </defs>

      {/* Sombra suave de acuarela */}
      <ellipse
        cx="60"
        cy="96"
        rx="34"
        ry="5"
        fill="#8A8B70"
        opacity="0.15"
        filter="url(#rana-suavidad)"
      />

      {/* Hojita */}
      <path
        d="M20 94 Q35 76 54 86 Q76 70 102 85 Q80 103 54 98 Q35 101 20 94Z"
        fill="#A6B58E"
        stroke="#748965"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M27 94 Q56 94 94 85"
        stroke="#71865E"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Patitas traseras */}
      <path
        d="M39 75 Q22 72 22 83 Q23 92 38 91 Q48 89 49 83Z"
        fill="#829C6B"
        stroke="#6C8459"
        strokeWidth="1.1"
      />
      <path
        d="M81 75 Q98 72 98 83 Q97 92 82 91 Q72 89 71 83Z"
        fill="#829C6B"
        stroke="#6C8459"
        strokeWidth="1.1"
      />

      {/* Dedos */}
      <path
        d="M28 86 Q23 87 25 91 M35 88 Q31 92 34 94 M91 86 Q96 87 94 91 M84 88 Q88 92 85 94"
        stroke="#637D56"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Cuerpo principal */}
      <path
        d="M31 57
           Q29 45 38 42
           Q44 29 60 32
           Q76 29 82 42
           Q93 48 89 66
           Q88 82 74 87
           Q60 93 46 87
           Q31 82 29 68Z"
        fill="url(#rana-cuerpo)"
        stroke="#647D55"
        strokeWidth="1.4"
      />

      {/* Manchas suaves de pigmento */}
      <ellipse
        cx="42"
        cy="53"
        rx="10"
        ry="14"
        fill="#D1DAB6"
        opacity="0.3"
        transform="rotate(-25 42 53)"
      />
      <ellipse
        cx="75"
        cy="66"
        rx="9"
        ry="12"
        fill="#526F49"
        opacity="0.17"
        transform="rotate(25 75 66)"
      />
      <path
        d="M47 41 Q55 37 61 41 M36 63 Q39 70 36 74 M78 48 Q84 54 81 59"
        stroke="#E0E5C8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Barriguita */}
      <path
        d="M43 65
           Q43 55 52 55
           Q61 51 70 57
           Q79 65 74 76
           Q68 85 57 84
           Q44 82 43 65Z"
        fill="url(#rana-barriga)"
        opacity="0.95"
      />

      {/* Cabeza y ojos */}
      <path
        d="M32 47
           Q26 35 35 26
           Q43 18 51 29
           Q60 25 69 29
           Q78 18 86 27
           Q95 37 87 49
           Q78 59 60 57
           Q42 59 32 47Z"
        fill="url(#rana-cuerpo)"
        stroke="#647D55"
        strokeWidth="1.4"
      />

      {/* Luces pintadas sobre la cabeza */}
      <path
        d="M34 36 Q36 28 43 28 M77 29 Q84 25 88 34"
        stroke="#E1E7CA"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Ojos */}
      <ellipse cx="43" cy="37" rx="8" ry="9" fill="#F7F2DF" />
      <ellipse cx="77" cy="37" rx="8" ry="9" fill="#F7F2DF" />
      <ellipse cx="45" cy="38" rx="4.5" ry="5.5" fill="#414B35" />
      <ellipse cx="75" cy="38" rx="4.5" ry="5.5" fill="#414B35" />
      <circle cx="46.5" cy="36" r="1.8" fill="#FFFDF3" />
      <circle cx="76.5" cy="36" r="1.8" fill="#FFFDF3" />

      {/* Mejillas de acuarela */}
      <ellipse cx="33" cy="53" rx="10" ry="6" fill="url(#rana-mejilla)" />
      <ellipse cx="87" cy="53" rx="10" ry="6" fill="url(#rana-mejilla)" />

      {/* Sonrisita */}
      <path
        d="M51 48 Q60 56 69 48"
        stroke="#536A48"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Pecas y pequeñas manchas */}
      <circle cx="37" cy="48" r="1" fill="#6D855A" opacity="0.65" />
      <circle cx="40" cy="51" r="0.8" fill="#6D855A" opacity="0.6" />
      <circle cx="82" cy="48" r="1" fill="#6D855A" opacity="0.65" />
      <circle cx="79" cy="51" r="0.8" fill="#6D855A" opacity="0.6" />

      {/* Brillitos delicados */}
      <path
        d="M17 34 V42 M13 38 H21 M101 44 V50 M98 47 H104"
        stroke="#B3A77F"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M94 18 Q97 14 100 18 Q97 22 94 18Z"
        fill="#B3A77F"
        opacity="0.7"
      />
    </svg>
  );
}


function PortadaProvisional() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#dfe2d1]">
      <div className="absolute inset-2 border border-[#a7ad91]/70" />

      <svg
        viewBox="0 0 160 160"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 124 Q44 89 72 111 Q96 77 137 39"
          stroke="#7e8b69"
          strokeWidth="1.5"
        />
        <path
          d="M38 102 Q21 76 20 63 Q45 71 38 102Z"
          fill="#9ca887"
        />
        <path
          d="M70 111 Q58 82 64 68 Q85 86 70 111Z"
          fill="#aeb79a"
        />
        <path
          d="M103 76 Q102 48 117 36 Q124 59 103 76Z"
          fill="#9ca887"
        />
        <path
          d="M49 132 Q77 119 111 128"
          stroke="#a66f5b"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="112" cy="112" r="17" stroke="#a66f5b" strokeWidth="1.2" />
        <circle cx="112" cy="112" r="12" stroke="#a66f5b" strokeWidth="1" />
        <path
          d="M112 104 V112 L118 116"
          stroke="#a66f5b"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M80 25 Q80 17 87 17 Q94 17 94 25 Q94 33 80 42 Q66 33 66 25 Q66 17 73 17 Q80 17 80 25Z"
          fill="#a66f5b"
          opacity="0.75"
        />
      </svg>

      <span className="absolute bottom-3 left-0 right-0 text-center font-serif text-[9px] italic tracking-[0.2em] text-[#687653]">
        una canción, un recuerdo
      </span>
    </div>
  );
}

function PortadaCancion({
  src,
  titulo,
}: {
  src: string;
  titulo: string;
}) {
  const [errorImagen, setErrorImagen] = useState(false);

  useEffect(() => {
    setErrorImagen(false);
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[3px]">
      {errorImagen ? (
        <PortadaProvisional />
      ) : (
        <img
          src={src}
          alt={`Portada de ${titulo}`}
          className="h-full w-full object-cover"
          onError={() => setErrorImagen(true)}
        />
      )}
    </div>
  );
}

export default function Reproductor() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [indice, setIndice] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [aleatorio, setAleatorio] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [mostrarInvitacion, setMostrarInvitacion] = useState(true);
  const [portalListo, setPortalListo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(0.7);
  const [errorAudio, setErrorAudio] = useState(false);
  const [autoplayBloqueado, setAutoplayBloqueado] = useState(false);

  const cancionActual = canciones[indice];

  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => setPortalListo(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mostrarInvitacion || !portalListo) return;

    const overflowAnterior = document.body.style.overflow;
    const overflowRaizAnterior = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.documentElement.style.overflow = overflowRaizAnterior;
    };
  }, [mostrarInvitacion, portalListo]);

  function manejarErrorReproduccion(error: unknown) {
    const nombreError =
      error instanceof Error ? error.name : '';

    if (nombreError === 'AbortError') return;

    setReproduciendo(false);

    if (nombreError === 'NotAllowedError') {
      setAutoplayBloqueado(true);
      return;
    }

    setErrorAudio(true);
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen;
    }
  }, [volumen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setTiempo(0);
    setDuracion(0);
    setErrorAudio(false);

    if (reproduciendo) {
      audio.play()
        .then(() => {
          setReproduciendo(true);
          setAutoplayBloqueado(false);
          setErrorAudio(false);
        })
        .catch(manejarErrorReproduccion);
    }
  }, [indice]);

  function alternarReproduccion() {
    const audio = audioRef.current;
    if (!audio) return;

    if (reproduciendo) {
      audio.pause();
      setReproduciendo(false);
      setAutoplayBloqueado(false);
    } else {
      audio.play()
        .then(() => {
          setReproduciendo(true);
          setAutoplayBloqueado(false);
          setErrorAudio(false);
        })
        .catch(manejarErrorReproduccion);
    }
  }

  function comenzarMusica() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setReproduciendo(true);
        setMostrarInvitacion(false);
        setAutoplayBloqueado(false);
        setErrorAudio(false);
      })
      .catch(manejarErrorReproduccion);
  }

  function cambiarCancion(nuevoIndice: number) {
    const siguiente = (nuevoIndice + canciones.length) % canciones.length;
    setIndice(siguiente);
  }

  function siguienteCancion() {
    if (aleatorio) {
      let siguiente = indice;

      if (canciones.length > 1) {
        while (siguiente === indice) {
          siguiente = Math.floor(Math.random() * canciones.length);
        }
      }

      cambiarCancion(siguiente);
    } else {
      cambiarCancion(indice + 1);
    }
  }

  function anteriorCancion() {
    const audio = audioRef.current;

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setTiempo(0);
      return;
    }

    cambiarCancion(indice - 1);
  }

  function cambiarTiempo(nuevoTiempo: number) {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = nuevoTiempo;
    setTiempo(nuevoTiempo);
  }

  function seleccionarCancion(nuevoIndice: number) {
    setIndice(nuevoIndice);
    setReproduciendo(true);
  }

  return (
    <>
      <section className="w-full overflow-hidden rounded-2xl border border-[#d8ceb8] bg-[#f8f3e7] text-[#4d5940] shadow-[0_12px_35px_rgba(47,55,35,0.12)]">
      <audio
        ref={audioRef}
        src={cancionActual.src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuracion(obtenerDuracion(event.currentTarget));
        }}
        onDurationChange={(event) => {
          setDuracion(obtenerDuracion(event.currentTarget));
        }}
        onTimeUpdate={(event) => {
          setTiempo(event.currentTarget.currentTime);
        }}
        onEnded={siguienteCancion}
        onError={() => {
          setErrorAudio(true);
          setReproduciendo(false);
        }}
      />

      {/* Encabezado */}
      <div className="flex items-center justify-between gap-3 border-b border-[#ded5c2] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <p className="font-serif text-xl italic tracking-wide sm:text-2xl">
            Que suerte el haberte vuelto a encontrar 💗
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#85846a] sm:text-xs">
            Canciones que me recuerdan a nosotros
          </p>
        </div>

        <RanitaSVG
          className={`h-14 w-14 shrink-0 ${
            reproduciendo ? 'animate-bounce' : ''
          }`}
        />
      </div>

      {/* Portada y vinilo */}
      <div className="flex flex-col items-center px-5 pb-5 pt-7">
        <div className="relative flex h-44 w-64 max-w-full items-center justify-center sm:h-48 sm:w-72">
          {/* Portada del álbum */}
          <div className="absolute left-2 top-1 h-36 w-36 rotate-[-5deg] rounded-sm border-[5px] border-[#fffaf0] bg-[#dfe2d1] shadow-[0_7px_16px_rgba(47,55,35,0.18)] sm:left-5 sm:h-40 sm:w-40">
            <PortadaCancion
              src={cancionActual.portada}
              titulo={cancionActual.titulo}
            />
          </div>

          {/* Disco de vinilo */}
          <div
            className={`absolute right-1 top-3 flex h-36 w-36 items-center justify-center rounded-full border border-[#343a2d] bg-[#282d25] shadow-[0_8px_18px_rgba(47,55,35,0.25)] sm:right-3 sm:h-40 sm:w-40 ${
              reproduciendo ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '8s' }}
          >
            <div className="absolute inset-[7px] rounded-full border border-[#626655]/80" />
            <div className="absolute inset-[13px] rounded-full border border-[#626655]/70" />
            <div className="absolute inset-[19px] rounded-full border border-[#626655]/60" />
            <div className="absolute inset-[25px] rounded-full border border-[#626655]/50" />
            <div className="absolute inset-[31px] rounded-full border border-[#626655]/50" />
            <div className="absolute inset-[37px] rounded-full border border-[#626655]/50" />

            <div className="z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#b5b89a] bg-[#87936d] shadow-inner">
              <span className="font-serif text-lg text-[#fff7e7]">♡</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-serif text-xl">
          {cancionActual.titulo}
        </p>
        <p className="mt-1 text-center text-xs tracking-wide text-[#85846a]">
          {cancionActual.artista}
        </p>

        {/* Barra de progreso */}
        <div className="mt-5 w-full max-w-md">
          <input
            type="range"
            min={0}
            max={duracion}
            value={Math.min(tiempo, duracion)}
            onChange={(event) => cambiarTiempo(Number(event.target.value))}
            aria-label="Progreso de la canción"
            disabled={!duracion}
            className="w-full cursor-pointer accent-[#77845f]"
          />

          <div className="flex justify-between text-[10px] tabular-nums text-[#85846a]">
            <span>{formatoTiempo(tiempo)}</span>
            <span>{formatoTiempo(duracion)}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="mt-4 flex items-center justify-center gap-5 sm:gap-7">
          <button
            type="button"
            onClick={() => setAleatorio(!aleatorio)}
            title="Reproducción aleatoria"
            aria-label="Activar o desactivar reproducción aleatoria"
            aria-pressed={aleatorio}
            className={`rounded-full p-2 transition hover:bg-[#e9e2d0] ${
              aleatorio ? 'text-[#7b8b5d]' : 'text-[#a19a85]'
            }`}
          >
            <Icono tipo="shuffle" />
          </button>

          <button
            type="button"
            onClick={anteriorCancion}
            aria-label="Canción anterior"
            className="rounded-full p-2 transition hover:bg-[#e9e2d0]"
          >
            <Icono tipo="prev" className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={alternarReproduccion}
            aria-label={reproduciendo ? 'Pausar' : 'Reproducir'}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#78845f] text-[#fffaf0] shadow-md transition hover:scale-105 hover:bg-[#64734d]"
          >
            <Icono
              tipo={reproduciendo ? 'pause' : 'play'}
              className="h-7 w-7"
            />
          </button>

          <button
            type="button"
            onClick={siguienteCancion}
            aria-label="Siguiente canción"
            className="rounded-full p-2 transition hover:bg-[#e9e2d0]"
          >
            <Icono tipo="next" className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => setMostrarLista(!mostrarLista)}
            title="Ver playlist"
            aria-label="Mostrar u ocultar playlist"
            aria-expanded={mostrarLista}
            className={`rounded-full p-2 transition hover:bg-[#e9e2d0] ${
              mostrarLista ? 'text-[#7b8b5d]' : 'text-[#a19a85]'
            }`}
          >
            <Icono tipo="list" />
          </button>
        </div>

        {/* Volumen */}
        <div className="mt-5 flex w-full max-w-xs items-center gap-3">
          <Icono tipo="volume" className="h-4 w-4 shrink-0 text-[#85846a]" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volumen}
            onChange={(event) => setVolumen(Number(event.target.value))}
            aria-label="Volumen"
            className="w-full cursor-pointer accent-[#77845f]"
          />
        </div>

        {errorAudio && !mostrarInvitacion && (
          <p
            role="status"
            className="mt-4 text-center text-xs leading-relaxed text-[#9b6255]"
          >
            No se encontró el archivo de audio. Agrega la canción a la carpeta
            public/music para escucharla.
          </p>
        )}
      </div>

      {/* Playlist */}
      {mostrarLista && (
        <div className="border-t border-[#ded5c2] bg-[#f2ecde]">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="font-serif text-lg italic">Nuestra playlist</p>
            <span className="text-xs text-[#85846a]">
              {canciones.length} canciones
            </span>
          </div>

          <div className="board-scrollbar max-h-56 overflow-y-auto px-2 pb-3">
            {canciones.map((cancion, i) => (
              <button
                type="button"
                key={cancion.id}
                onClick={() => seleccionarCancion(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  i === indice
                    ? 'bg-[#dfe3d1] text-[#46543b]'
                    : 'hover:bg-[#e9e2d0]'
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d0c7b1] font-serif text-sm">
                  {i === indice && reproduciendo
                    ? '♫'
                    : String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif text-sm">
                    {cancion.titulo}
                  </span>
                  <span className="block text-[10px] text-[#85846a]">
                    {cancion.artista}
                  </span>
                </span>

                {i === indice && (
                  <span className="text-xs text-[#78845f]">Sonando</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pie decorativo */}
      <div className="border-t border-[#ded5c2] px-4 py-3 text-center">
        <p className="font-serif text-sm italic tracking-wide text-[#85846a]">
          ♡ Hecha de canciones y recuerdos ♡
        </p>
      </div>
      </section>

      {mostrarInvitacion && portalListo && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
          style={{
            backgroundColor: '#8C9B7E',
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(155, 168, 142, 0.5) 0%, rgba(125, 138, 112, 0.8) 100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitacion-musica-titulo"
        >
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#d8ceb8] bg-[#f8f3e7] px-7 py-8 text-center text-[#4d5940] shadow-[0_24px_80px_rgba(20,28,16,0.35)]">
            <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] border border-[#ded5c2]" />
            <div className="relative flex flex-col items-center">
              <RanitaSVG className="mb-3 h-20 w-20" />
              <h2
                id="invitacion-musica-titulo"
                className="font-serif text-3xl italic"
              >
                Te amo, Ranibb 💚
              </h2>
              <p className="mt-3 max-w-xs font-serif text-base leading-7 text-[#777665]">
                Dale clic para permitir la música.
              </p>
              {autoplayBloqueado && (
                <p role="status" className="mt-3 text-xs text-[#9b6255]">
                  Tu navegador no permitió iniciar la música. Toca el botón
                  para intentarlo de nuevo.
                </p>
              )}
              {errorAudio && (
                <p role="status" className="mt-3 text-xs text-[#9b6255]">
                  No se pudo cargar la canción. Revisa el archivo de audio e
                  inténtalo de nuevo.
                </p>
              )}
              <button
                type="button"
                onClick={comenzarMusica}
                className="mt-6 rounded-full bg-[#78845f] px-7 py-3 font-serif text-base text-[#fffaf0] shadow-md transition hover:scale-105 hover:bg-[#64734d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#64734d]"
              >
                Permitir música ♫
              </button>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#85846a]">
                Feliz aniversario
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
