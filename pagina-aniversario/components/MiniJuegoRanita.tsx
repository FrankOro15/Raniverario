'use client';

import { useEffect, useRef, useState } from 'react';

const anchoJuego = 800;
const altoJuego = 250;
const suelo = 205;

type Obstaculo = {
  x: number;
  tipo: 'corazon' | 'ave' | 'piedra';
  y: number;
};

function dibujarCorazon(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  context.save();
  context.translate(x, y);
  context.scale(0.75, 0.75);
  context.beginPath();
  context.moveTo(0, 10);
  context.bezierCurveTo(-32, -9, -20, -28, -7, -21);
  context.bezierCurveTo(-2, -19, 0, -13, 0, -12);
  context.bezierCurveTo(8, -30, 28, -23, 26, -9);
  context.bezierCurveTo(25, 0, 14, 8, 0, 18);
  context.closePath();
  context.fillStyle = '#c9788d';
  context.fill();
  context.restore();
}

function dibujarAve(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  tiempo: number
) {
  const aleteo = Math.sin(tiempo / 90) * 7;
  context.save();
  context.lineWidth = 4;
  context.lineCap = 'round';
  context.strokeStyle = '#74795f';
  context.beginPath();
  context.moveTo(x - 17, y + 4);
  context.quadraticCurveTo(x - 7, y - 9 - aleteo, x, y + 2);
  context.quadraticCurveTo(x + 9, y - 8 + aleteo, x + 18, y + 2);
  context.stroke();
  context.restore();
}

function dibujarPiedra(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  context.save();
  context.fillStyle = '#898b78';
  context.beginPath();
  context.moveTo(x - 18, y);
  context.lineTo(x - 15, y - 13);
  context.lineTo(x - 5, y - 21);
  context.lineTo(x + 7, y - 18);
  context.lineTo(x + 17, y - 8);
  context.lineTo(x + 18, y);
  context.closePath();
  context.fill();
  context.strokeStyle = '#747763';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x - 7, y - 15);
  context.lineTo(x - 2, y - 7);
  context.lineTo(x + 7, y - 12);
  context.stroke();
  context.restore();
}

function dibujarRanita(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  saltando: boolean
) {
  context.save();
  context.translate(x, y);
  context.fillStyle = 'rgba(69, 82, 53, 0.16)';
  context.beginPath();
  context.ellipse(0, 2, saltando ? 17 : 22, 4, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#81986b';
  context.beginPath();
  context.ellipse(0, -19, 21, 16, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(-12, -34, 8, 0, Math.PI * 2);
  context.arc(12, -34, 8, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#f7f2df';
  context.beginPath();
  context.arc(-12, -35, 5, 0, Math.PI * 2);
  context.arc(12, -35, 5, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#414b35';
  context.beginPath();
  context.arc(-11, -35, 2.5, 0, Math.PI * 2);
  context.arc(13, -35, 2.5, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = '#536a48';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(0, -25, 7, 0.2, Math.PI - 0.2);
  context.stroke();
  context.restore();
}

export default function MiniJuegoRanita() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saltarRef = useRef<() => void>(() => {});
  const [jugando, setJugando] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    if (!jugando || terminado) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let anterior = 0;
    let tiempo = 0;
    let velocidad = 300;
    let proximoObstaculo = 850;
    let posicionRanita = 0;
    let velocidadSalto = 0;
    let puntosActuales = 0;
    const obstaculos: Obstaculo[] = [];

    const saltar = () => {
      if (posicionRanita === 0) velocidadSalto = -590;
    };
    saltarRef.current = saltar;

    const manejarTeclado = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        saltar();
      }
    };

    window.addEventListener('keydown', manejarTeclado);

    const dibujar = (marcaTiempo: number) => {
      const delta = anterior === 0 ? 0 : Math.min((marcaTiempo - anterior) / 1000, 0.04);
      anterior = marcaTiempo;
      tiempo += delta * 1000;
      velocidad = Math.min(300 + tiempo * 0.012, 520);
      const escala = window.devicePixelRatio || 1;
      const ancho = canvas.clientWidth;
      const alto = canvas.clientHeight;

      if (canvas.width !== Math.round(ancho * escala) || canvas.height !== Math.round(alto * escala)) {
        canvas.width = Math.round(ancho * escala);
        canvas.height = Math.round(alto * escala);
      }
      context.setTransform(
        (canvas.width / anchoJuego),
        0,
        0,
        (canvas.height / altoJuego),
        0,
        0
      );

      const cielo = context.createLinearGradient(0, 0, 0, altoJuego);
      cielo.addColorStop(0, '#f5f0e3');
      cielo.addColorStop(1, '#e7e5d5');
      context.fillStyle = cielo;
      context.fillRect(0, 0, anchoJuego, altoJuego);

      context.fillStyle = 'rgba(255, 255, 255, 0.48)';
      context.beginPath();
      context.ellipse(160, 58, 52, 13, 0, 0, Math.PI * 2);
      context.ellipse(193, 55, 32, 17, 0, 0, Math.PI * 2);
      context.ellipse(600, 95, 48, 12, 0, 0, Math.PI * 2);
      context.ellipse(628, 91, 30, 16, 0, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = '#a9ad91';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, suelo + 1);
      context.lineTo(anchoJuego, suelo + 1);
      context.stroke();

      if (tiempo >= proximoObstaculo) {
        const tipoSorteado = Math.random();
        const tipo =
          tipoSorteado < 0.4
            ? 'corazon'
            : tipoSorteado < 0.7
              ? 'ave'
              : 'piedra';
        obstaculos.push({
          x: anchoJuego + 20,
          tipo,
          y:
            tipo === 'corazon'
              ? 78 + Math.random() * 100
              : tipo === 'ave'
                ? suelo - 48 - Math.random() * 20
                : suelo,
        });
        proximoObstaculo = tiempo + 900 + Math.random() * 700;
      }

      velocidadSalto += 1500 * delta;
      posicionRanita = Math.min(0, posicionRanita + velocidadSalto * delta);
      if (posicionRanita === 0) velocidadSalto = 0;
      const baseRanita = suelo + posicionRanita;
      dibujarRanita(context, 105, baseRanita, posicionRanita !== 0);

      for (let i = obstaculos.length - 1; i >= 0; i--) {
        const obstaculo = obstaculos[i];
        obstaculo.x -= velocidad * delta;

        if (obstaculo.x < -40) {
          obstaculos.splice(i, 1);
          continue;
        }

        if (obstaculo.tipo === 'corazon') {
          dibujarCorazon(context, obstaculo.x, obstaculo.y);
          const atrapaCorazon =
            obstaculo.x - 15 < 127 &&
            obstaculo.x + 15 > 83 &&
            obstaculo.y - 16 < baseRanita &&
            obstaculo.y + 16 > baseRanita - 48;

          if (atrapaCorazon) {
            puntosActuales += 1;
            setPuntaje(puntosActuales);
            obstaculos.splice(i, 1);
          }
          continue;
        }

        if (obstaculo.tipo === 'ave') {
          dibujarAve(context, obstaculo.x, obstaculo.y, tiempo);
        } else {
          dibujarPiedra(context, obstaculo.x, obstaculo.y);
        }

        const anchoObstaculo = obstaculo.tipo === 'ave' ? 18 : 17;
        const arribaObstaculo =
          obstaculo.tipo === 'ave' ? obstaculo.y - 10 : obstaculo.y - 21;
        const abajoObstaculo =
          obstaculo.tipo === 'ave' ? obstaculo.y + 10 : obstaculo.y;
        if (
          obstaculo.x - anchoObstaculo < 127 &&
          obstaculo.x + anchoObstaculo > 83 &&
          arribaObstaculo < baseRanita &&
          abajoObstaculo > baseRanita - 48
        ) {
          setPuntaje(puntosActuales);
          setTerminado(true);
          return;
        }
      }

      context.fillStyle = '#687653';
      context.font = '16px Georgia, serif';
      context.textAlign = 'right';
      context.fillText(`Corazones: ${puntosActuales}`, anchoJuego - 24, 30);
      frame = window.requestAnimationFrame(dibujar);
    };

    frame = window.requestAnimationFrame(dibujar);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', manejarTeclado);
    };
  }, [jugando, terminado]);

  const comenzar = () => {
    setPuntaje(0);
    setTerminado(false);
    setJugando(true);
  };

  return (
    <div>
      <header className="mb-5 text-center">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#85846a]">
          Un ratito para jugar
        </p>
        <h2 className="mt-2 font-serif text-2xl text-[#414735] sm:text-3xl">
          Minijuego
        </h2>
        <p className="mt-2 font-serif text-sm italic text-[#777665]">
          Atrapa corazones para sumar puntos y esquiva los pajaritos y las
          piedras. Usa espacio, ↑ o toca el juego.
        </p>
      </header>

      <div className="overflow-hidden border border-[#d8cdb8] bg-[#f5f0e3] shadow-inner">
        <canvas
          ref={canvasRef}
          width={anchoJuego}
          height={altoJuego}
          aria-label="Minijuego: atrapa corazones y esquiva pajaritos y piedras"
          onPointerDown={() => {
            if (jugando && !terminado) {
              saltarRef.current();
            }
          }}
          className="block h-[190px] w-full touch-none sm:h-[250px]"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {jugando && !terminado && (
          <p aria-live="polite" className="font-serif text-sm text-[#687653]">
            Corazones: {puntaje}
          </p>
        )}
        {terminado && (
          <p className="font-serif text-sm italic text-[#777665]">
            ¡Atrapaste {puntaje} {puntaje === 1 ? 'corazón' : 'corazones'}! 💜
          </p>
        )}
        <button
          type="button"
          onClick={comenzar}
          className="border border-[#aeb397] bg-[#78845f] px-5 py-2 font-serif text-sm text-[#fffaf0] transition hover:bg-[#64734d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64734d]"
        >
          {terminado ? 'Jugar otra vez' : jugando ? 'Reiniciar' : '¡Jugar!'}
        </button>
      </div>
    </div>
  );
}
