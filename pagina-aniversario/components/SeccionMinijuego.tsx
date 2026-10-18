import MiniJuegoRanita from '@/components/MiniJuegoRanita';

export default function SeccionMinijuego() {
  return (
    <section className="animate-fadeIn relative w-full overflow-hidden border border-[#c9c0a8] bg-[#faf6eb] px-5 py-8 text-[#414735] shadow-[0_12px_30px_rgba(35,42,29,0.18)] sm:px-9 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] border border-[#d9cfb8]"
      />

      <div className="relative z-10">
        <MiniJuegoRanita />
      </div>
    </section>
  );
}
