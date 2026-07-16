export const LAYOUTS = [
  { value: "3", label: "Pleine largeur", columns: [3] },
  { value: "2-0", label: "Large à gauche", columns: [2, 0] },
  { value: "0-2", label: "Large à droite", columns: [0, 2] },
  { value: "1-1-0", label: "Deux colonnes à gauche", columns: [1, 1, 0] },
  { value: "0-1-1", label: "Deux colonnes à droite", columns: [0, 1, 1] },
  { value: "1-0-1", label: "Colonnes sur les cotés", columns: [1, 0, 1] },
  { value: "1-1-1", label: "Trois colonnes", columns: [1, 1, 1] }
] as const;
