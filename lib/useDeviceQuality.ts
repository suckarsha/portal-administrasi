'use client';

import { useState, useEffect } from 'react';

export type DeviceQuality = {
  low: boolean; // perangkat ringan (mobile / CPU terbatas) → kurangi beban 3D
  reduced: boolean; // pengguna minta animasi minimal
};

export function useDeviceQuality(): DeviceQuality {
  const [quality, setQuality] = useState<DeviceQuality>({ low: false, reduced: false });

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setQuality({ low: isSmall || fewCores, reduced });
  }, []);

  return quality;
}
