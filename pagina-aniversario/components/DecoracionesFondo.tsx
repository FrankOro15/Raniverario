
function Conejito() {
  return (
    <svg viewBox="0 0 100 110" fill="none" className="h-full w-full" aria-hidden="true">
      <ellipse cx="50" cy="99" rx="26" ry="4" fill="#35412F" opacity=".12" />
      <path d="M35 40 Q18 4 29 5 Q41 5 43 38Z" fill="#FFFEFA" stroke="#D8D0C4" strokeWidth="1.4" />
      <path d="M55 38 Q58 4 70 10 Q80 18 63 43Z" fill="#FFFEFA" stroke="#D8D0C4" strokeWidth="1.4" />
      <path d="M29 30 Q25 13 30 13 Q36 19 37 33Z" fill="#EBC9C6" />
      <path d="M62 31 Q66 15 71 17 Q73 23 65 34Z" fill="#EBC9C6" />
      <ellipse cx="50" cy="62" rx="29" ry="30" fill="#FFFEFA" stroke="#D8D0C4" strokeWidth="1.4" />
      <ellipse cx="40" cy="61" rx="2.5" ry="3" fill="#50483F" />
      <ellipse cx="60" cy="61" rx="2.5" ry="3" fill="#50483F" />
      <ellipse cx="50" cy="69" rx="3" ry="2.2" fill="#CE8D88" />
      <path d="M50 71 Q46 76 42 72 M50 71 Q54 76 58 72" stroke="#88756A" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="34" cy="69" rx="6" ry="3" fill="#E9B7B0" opacity=".65" />
      <ellipse cx="66" cy="69" rx="6" ry="3" fill="#E9B7B0" opacity=".65" />
    </svg>
  );
}



function Perrito() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="108" rx="32" ry="4" fill="#35412F" opacity=".12" />

      {/* Cola levantada */}
      <path
        d="M83 82 Q101 77 101 66 Q101 59 95 60"
        stroke="#D5CEC2"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M83 82 Q101 77 101 66 Q101 59 95 60"
        stroke="#FFFEFA"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Cuerpo sentado y patas */}
      <path
        d="M35 71 Q40 63 51 64 L69 64 Q82 66 86 79 L91 94 Q92 103 82 104 L38 104 Q27 103 29 93Z"
        fill="#FFFEFA"
        stroke="#D5CEC2"
        strokeWidth="1.5"
      />
      <ellipse cx="39" cy="98" rx="13" ry="7" fill="#FFFEFA" stroke="#D5CEC2" strokeWidth="1.3" />
      <ellipse cx="81" cy="98" rx="13" ry="7" fill="#FFFEFA" stroke="#D5CEC2" strokeWidth="1.3" />
      <path d="M48 82 Q45 92 48 101 M70 82 Q73 92 70 101" stroke="#E5DED4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 99 L36 102 M41 99 L41 102 M77 99 L77 102 M82 99 L82 102"
        stroke="#D5CEC2" strokeWidth="1" strokeLinecap="round" />
      <path d="M43 69 Q60 76 77 69 L70 82 L60 78 L50 82Z"
        fill="#D4E0C4" stroke="#9AAA88" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="60" cy="75" r="1.5" fill="#718B63" />

      {/* Orejas caídas, detrás de la cabeza */}
      <path
        d="M38 31 Q27 20 20 29 Q14 37 19 53 Q22 63 31 60 L42 46Z"
        fill="#FFFEFA"
        stroke="#D5CEC2"
        strokeWidth="1.5"
      />
      <path
        d="M82 31 Q93 20 100 29 Q106 37 101 53 Q98 63 89 60 L78 46Z"
        fill="#FFFEFA"
        stroke="#D5CEC2"
        strokeWidth="1.5"
      />
      <path d="M31 32 Q23 29 22 38 Q22 46 29 54 L36 43Z" fill="#F0E7DF" />
      <path d="M89 32 Q97 29 98 38 Q98 46 91 54 L84 43Z" fill="#F0E7DF" />

      {/* Cabeza */}
      <path
        d="M32 39 Q31 18 48 15 Q60 10 72 15 Q89 19 88 39 Q88 58 76 66 Q68 72 60 71 Q51 72 43 66 Q31 57 32 39Z"
        fill="#FFFEFA"
        stroke="#D5CEC2"
        strokeWidth="1.6"
      />
      <path d="M47 19 Q52 14 56 19 M61 18 Q66 13 71 19" stroke="#E8E1D7" strokeWidth="2" strokeLinecap="round" />

      {/* Ojos y hocico de cachorro */}
      <ellipse cx="46" cy="39" rx="3.2" ry="4" fill="#383831" />
      <ellipse cx="74" cy="39" rx="3.2" ry="4" fill="#383831" />
      <circle cx="47" cy="37.8" r="1.1" fill="#FFFFFF" />
      <circle cx="75" cy="37.8" r="1.1" fill="#FFFFFF" />
      <ellipse cx="60" cy="53" rx="18" ry="13" fill="#FFFEFA" stroke="#E5DED4" strokeWidth="1" />
      <ellipse cx="60" cy="48" rx="5.5" ry="4" fill="#383831" />
      <path d="M60 52 L60 57 Q54 62 49 58 M60 57 Q66 62 71 58"
        stroke="#88786C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 57 Q59 64 64 64 Q68 63 65 59Z" fill="#E9A5A0" />
      <ellipse cx="39" cy="53" rx="5" ry="3" fill="#E9BEB4" opacity=".55" />
      <ellipse cx="81" cy="53" rx="5" ry="3" fill="#E9BEB4" opacity=".55" />
    </svg>
  );
}



function Corazon() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M20 34 C16 29 4 21 4 12 C4 3 15 1 20 10 C25 1 36 3 36 12 C36 21 24 29 20 34Z"
        fill="#B94D4D"
        stroke="#963C3C"
        strokeWidth="1"
      />
      <path d="M10 10 Q12 6 16 9" stroke="#F6C3B8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function DecoracionesFondo() {
  return (
    <div className="decoraciones-fondo" aria-hidden="true">
      <div className="adorno adorno-conejo conejo-uno"><Conejito /></div>
      <div className="adorno adorno-conejo conejo-dos"><Conejito /></div>
      <div className="adorno adorno-conejo conejo-tres"><Conejito /></div>

      <div className="adorno adorno-perro perro-uno"><Perrito /></div>
      <div className="adorno adorno-perro perro-dos"><Perrito /></div>
      <div className="adorno adorno-perro perro-tres"><Perrito /></div>
      <div className="adorno adorno-perro perro-cuatro"><Perrito /></div>

      <div className="adorno adorno-corazon corazon-uno"><Corazon /></div>
      <div className="adorno adorno-corazon corazon-dos"><Corazon /></div>
      <div className="adorno adorno-corazon corazon-tres"><Corazon /></div>
      <div className="adorno adorno-corazon corazon-cuatro"><Corazon /></div>
      <div className="adorno adorno-corazon corazon-cinco"><Corazon /></div>
      <div className="adorno adorno-corazon corazon-seis"><Corazon /></div>
    </div>
  );
}
