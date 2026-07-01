import portrait from "../assets/portrait.webp";

/** Header avatar — circle beside name/role, sized to the text stack. */
export function Portrait() {
  return (
    <div className="portrait-wrap">
      <img
        className="portrait"
        src={portrait}
        width={52}
        height={52}
        alt="Wineury Almonte"
        decoding="async"
      />
    </div>
  );
}
