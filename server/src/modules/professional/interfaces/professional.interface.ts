export interface CreateProfessionalRequest {
  nome: string;
  telefone: string;
  email: string;
  tipoDeProfissional: string;
  situacao: boolean;
}

export interface UpdateProfessionalRequest {
  nome?: string;
  telefone?: string;
  email?: string;
  tipoDeProfissional?: number;
  situacao?: boolean;
}

export interface ProfessionalSearchFilter {
  id?: number;
  nome?: string;
  createdAt?: Date;
  situacao?: boolean;
}
