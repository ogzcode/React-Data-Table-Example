import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const regionOptions = [
  { value: null, label: "Tüm Bölgeler"},
  { value: "Akdeniz", label: "Akdeniz Bölgesi"},
  { value: "Marmara", label: "Marmara Bölgesi" },
  { value: "Ege", label: "Ege Bölgesi" },
  { value: "Karadeniz", label: "Karadeniz Bölgesi" },
  { value: "İç Anadolu", label: "İç Anadolu Bölgesi" },
  { value: "Doğu Anadolu", label: "Doğu Anadolu Bölgesi" },
  { value: "Güneydoğu Anadolu", label: "Güneydoğu Anadolu Bölgesi" },
];

