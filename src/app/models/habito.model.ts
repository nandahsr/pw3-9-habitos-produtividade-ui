export interface Habito {
  id: number;
  descricao: string;
  diasConsecutivos: number;
  metaDias: number;
  conquistaAlcancada: boolean;
}

export type HabitoPayload = Pick<Habito, 'descricao' | 'metaDias'>;
