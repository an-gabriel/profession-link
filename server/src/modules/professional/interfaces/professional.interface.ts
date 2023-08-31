export interface CreateProfessionalRequest {
  nome: string;
  telefone: string;
  email: string;
  tipoDeProfissionalId: string;
  situacao: boolean;
}

export interface UpdateProfessionalRequest {
  nome?: string;
  telefone?: string;
  email?: string;
  tipoDeProfissionalId?: number;
  situacao?: boolean;
}

export interface ProfessionalSearchFilter {
  id?: number;
  nome?: string;
  createdAt?: Date;
  situacao?: boolean;
}
