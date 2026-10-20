'use client';

type CartitasProps = {
  openCard: number | null;
  onToggleCard: (cardId: number) => void;
  bloqueada: boolean;
};

export default function Cartitas({
  openCard,
  onToggleCard,
  bloqueada,
}: CartitasProps) {
  const cartas = [
    {
      id: 1,
      title: 'Feliz aniversario, mi amor',
      content: [
        'Rana Melon Te amo mucho, eres lo mejor que me ha pasado en la vida, espero que este sea el primero de muchos años juntos.',
        'Hola amor',
        'No sé si para ti está carta sea algo normal o sea algo diferente a todo lo que te he escrito pero te quiero expresar cuan feliz estoy de tu regreso, la vida es mejor, el mundo tiene más color y yo simplemente deje de estar triste y aburrido, tu siempre me haces reír mucho y me haces feliz. Aunque peleamos aveces eso no importa porque la vida es mejor si estamos juntitos.',
        'Antes de que volvieras te extrañaba muchísimo y la verdad a pesar del miedo que tenía.',
        'Yo quería volver a estar feliz en tus brazos y tomar tu mano; besarte era algo que yo moría de ganas de hacer.',
        'Este año ha tenido muchísimas cosas, te quiero pedir perdón si la cago mucho te juro que intento hacerlo todo de mejor manera porque no te quiero perder.',
        'Para mí eres TODO.',
        'Me pone muy feliz estar contigo y que hayamos hecho nuestra pequeña familia.',
        'Todos los días lucho para que tengamos un porvenir tu, yo y la kirrr.',
        'Espero que esté año sea el primero de muchos y que nuestra pequeña familia crezca mucho.',
        'Yo tengo mucho sueños y en todos estas tú.',
        'Tu mi linda princesa',
        'Tu mi linda rana melón.',
        'Creeme que no cambiaría lo nuestro por nada del mundo.',
        'Para mí esto es algo tan especial algún de uno en un millón.',
        'Quiero pasar el resto de mi vida viéndote y riendo contigo.',
        'Jejeje espero que estés feliz igual que yo y te guste este pequeño pedazo de mi corazón que siempre será tuyo.',
        'Te amo mucho jamás olvides eso.',
        'Siempre tuyo Frank.',
      ],
      sello: '✿',
    },
  ];

  return (
    <section className="animate-fadeIn relative w-full overflow-hidden border border-[#c9c0a8] bg-[#faf6eb] px-5 py-9 text-[#414735] shadow-[0_12px_30px_rgba(35,42,29,0.18)] sm:px-9 sm:py-11">
      {/* Marco de papel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] border border-[#ded4bd]"
      />

      {/* Detalles decorativos */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-8 select-none font-serif text-8xl text-[#788465]/15"
      >
        ❧
      </span>

      <div className="relative z-10">
        <header className="mx-auto mb-8 max-w-lg text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#85846a]">
            Solo para ti
          </p>

          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#414735] sm:text-4xl">
            Cartita
          </h2>

          <div className="editorial-divider mx-auto mt-4 max-w-xs text-xs">
            <span aria-hidden="true">✳</span>
          </div>

          <p className="mt-4 font-serif text-sm italic leading-6 text-[#777665]">
            Pequeñas palabras para volver a leer cuando quieras.
          </p>
        </header>

        <div className="relative">
          <div
            aria-hidden={bloqueada}
            inert={bloqueada}
            className={`grid grid-cols-1 gap-5 text-left sm:grid-cols-2 ${
              bloqueada ? 'pointer-events-none select-none blur-md' : ''
            }`}
          >
            {cartas.map((carta) => {
              const isOpen = openCard === carta.id;

              return (
                <button
                  key={carta.id}
                  type="button"
                  onClick={() => onToggleCard(carta.id)}
                  aria-expanded={isOpen}
                  className={`group relative min-h-[150px] overflow-hidden border text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#687653] ${
                    isOpen
                      ? 'border-[#b5b394] shadow-[0_8px_20px_rgba(65,71,53,0.10)]'
                      : 'border-[#d8cbb4] shadow-[0_3px_10px_rgba(65,71,53,0.06)] hover:-translate-y-0.5 hover:border-[#aeb397] hover:shadow-[0_8px_18px_rgba(65,71,53,0.10)]'
                  }`}
                >
                {/* Papel rayado */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundColor: '#fffdf6',
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(135, 153, 126, 0.19) 28px, transparent 29px)',
                    backgroundPosition: '0 9px',
                  }}
                />

                {/* Margen de libreta */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-8 top-0 border-l border-[#c98e82]/45"
                />

                <div className="relative z-10 p-5 pl-11 sm:p-6 sm:pl-12">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="font-serif text-[10px] italic text-[#8b896c]">
                      Nota n.º {String(carta.id).padStart(2, '0')}
                    </span>

                    <span
                      aria-hidden="true"
                      className="font-serif text-xl leading-none text-[#788465]"
                    >
                      {carta.sello}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-normal leading-snug text-[#414735] sm:text-lg">
                    {carta.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-px w-5 bg-[#b9b49b]" />

                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#85846a]">
                      {isOpen ? 'Cerrar cartita' : 'Leer cartita'}
                    </span>

                    <span className="text-xs text-[#85846a]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mt-4 border-t border-[#c8c9b4]/70 pt-3">
                      <div className="space-y-3 font-serif text-sm italic leading-7 text-[#555b48]">
                        {carta.content.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </button>
              );
            })}
          </div>

          {bloqueada && (
            <div
              role="status"
              className="absolute inset-0 flex items-center justify-center px-5 text-center"
            >
              <p className="border border-[#d8cbb4] bg-[#faf6eb]/90 px-5 py-4 font-serif text-base italic text-[#555b48] shadow-sm">
                Esta cartita se abrirá cuando la cuenta atrás llegue a cero 💌
              </p>
            </div>
          )}
        </div>

        <p className="mt-8 text-center font-serif text-xs italic text-[#85846a]">
          Algunas palabras merecen guardarse para siempre.
        </p>
      </div>
    </section>
  );
}