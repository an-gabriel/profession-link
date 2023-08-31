export interface CreateProfessionRequest {
  descricao: string;
  situacao: boolean;
}

export interface UpdateProfessionRequest {
  descricao?: string;
  situacao?: boolean;
}

export interface ProfessionSearchFilter {
  id?: string;
  descricao?: string;
  createdAt?: Date;
  status?: boolean;
}
