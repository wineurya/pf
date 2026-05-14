import clsx from "clsx";



/**

 * Rebuild section labels — matches Figma MCP capsule spec used across the page:

 * 37px corner radius, mono caps, soft accent wash (no stroke).

 */

const kickerShell =

  "inline-flex w-fit shrink-0 items-center justify-center rounded-[37px] px-2.5 py-1.5 font-mono text-[14px] font-semibold uppercase leading-5 tracking-[0.05em] whitespace-nowrap";



/**

 * Canonical section identifier pill (PROCESS, STUDIO, FAQ, CONTACT, …).

 */

export function RebuildSectionKicker({ label, accentHex, className }) {

  const text = typeof label === "string" ? label.trim().toUpperCase() : "";



  return (

    <div

      className={clsx(kickerShell, className)}

      style={{

        color: accentHex,

        backgroundColor: `color-mix(in srgb, ${accentHex} 22%, var(--wx-page-bg))`,

      }}

    >

      {text}

    </div>

  );

}

