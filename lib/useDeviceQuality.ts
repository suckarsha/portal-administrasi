'use client';

import { useState, useEffect } from 'react';

export type DeviceQuality = {
  low: boolean; // perangkat ringan (mobile / CPU terbatas) → kurangi beban 3D
  reduced: boolean; // pengguna minta animasi minimal
  lite: boolean; // perangkat sentuh (HP/PID) → tanpa WebGL & efek berat sama sekali
};

export function useDeviceQuality(): DeviceQuality {
  const [quality, setQuality] = useState<DeviceQuality>({
    low: false,
    reduced: false,
    lite: false,
  });

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setQuality({
      low: isSmall || fewCores,
      reduced,
      // GPU papan interaktif & HP umumnya lemah: WebGL + bloom bikin patah-patah
      // dan artefak kedip, jadi beri latar statis saja.
      lite: isTouch || (isSmall && fewCores),
    });
  }, []);

  return quality;
}
