
'use client';

import { useEffect, useState } from 'react';
import Cartitas from '@/components/Cartitas';
import ContadorAniversario, {
  fechaAniversario,
} from '@/components/ContadorAniversario';
import DecoracionesFondo from '@/components/DecoracionesFondo';
import Galeria from '@/components/Galeria';
import Navegacion, { type Seccion } from '@/components/Navegacion';
import Portada from '@/components/Portada';
import SeccionMinijuego from '@/components/SeccionMinijuego';
import TableroPostits from '@/components/TableroPostits';

export default function AniversarioPage() {
  const [activeSection, setActiveSection] =
    useState<Seccion>('minijuego');

  const [openCard, setOpenCard] = useState<number | null>(null);
  const [cartitaDesbloqueada, setCartitaDesbloqueada] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const revisarDesbloqueo = () => {
      const tiempoRestante = fechaAniversario - Date.now();

      if (tiempoRestante <= 0) {
        setCartitaDesbloqueada(true);
        return;
      }

      timeout = setTimeout(
        revisarDesbloqueo,
        Math.min(tiempoRestante, 1000)
      );
    };

    timeout = setTimeout(revisarDesbloqueo, 0);

    return () => clearTimeout(timeout);
  }, []);

  const toggleCard = (cardId: number) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  return (
    <main
      className="relative isolate min-h-screen overflow-x-clip text-[#3A4535] font-sans selection:bg-[#D4E0C4] pb-16 px-4"
      style={{
        backgroundColor: '#8C9B7E',
        backgroundImage:
          'radial-gradient(ellipse at center, rgba(155, 168, 142, 0.5) 0%, rgba(125, 138, 112, 0.8) 100%)',
      }}
    >
      {/* Decoraciones del fondo */}
      <DecoracionesFondo />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto py-10 flex flex-col items-center gap-10">
        <Portada />

        <ContadorAniversario />

        <Navegacion
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {activeSection === 'minijuego' && <SeccionMinijuego />}

        {activeSection === 'galeria' && <Galeria />}

        {activeSection === 'cartitas' && (
          <Cartitas
            openCard={openCard}
            onToggleCard={toggleCard}
            bloqueada={!cartitaDesbloqueada}
          />
        )}

        {/* Tablero de post-its: se conserva intacto */}
        <TableroPostits />

        <footer className="text-center text-[12px] text-[#D4E0C4] pt-4 border-t border-white/10 w-full font-serif">
          Hecho con todo mi amor para ti 🤍
        </footer>
      </div>
    </main>
  );
}
