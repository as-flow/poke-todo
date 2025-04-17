export type Task = {
  id: string;
  text: string;
  completed: boolean;
  timeRequired: string;
  category: "recurring" | "urgent" | "future";
};

export interface PokemonType {
  name: string;
  sprite: string;
  base_experience: number;
}