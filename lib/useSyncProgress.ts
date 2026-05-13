"use client";

import { useEffect, useState } from "react";

/**
 * Returns a number that increments whenever progress changes in
 * localStorage (via our internal `clever-progress` event or a
 * cross-tab `storage` event). Components can use this as a key
 * or simply re-render against it.
 *
 * Returns 0 on the server and on the very first client render so
 * SSR markup matches; the effect bumps to 1 after mount.
 */
export function useSyncProgress(): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    bump();
    window.addEventListener("clever-progress", bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener("clever-progress", bump);
      window.removeEventListener("storage", bump);
    };
  }, []);
  return tick;
}
