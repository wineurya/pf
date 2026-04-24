import { createContext, useContext, useEffect, useState } from "react";
import { initLenis } from "@/lib/lenis.js";

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const { lenis: instance, destroy } = initLenis();
    setLenis(instance);
    return () => {
      destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
