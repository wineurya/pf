import portrait from "../assets/portrait.png";

/** Portrait avatar — Figma node 490:462 crop (96px circle, IMG_9283 pan layer). */
export function Portrait() {
  return (
    <div className="portrait-wrap">
      <div className="portrait__layer">
        <img
          className="portrait"
          src={portrait}
          width={96}
          height={96}
          alt="Wineury Almonte"
          decoding="async"
        />
      </div>
    </div>
  );
}
