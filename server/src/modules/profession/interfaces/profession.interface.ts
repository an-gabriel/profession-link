export interface CreateProfessionRequest {
  name: string;
  situacao: boolean;
}

export interface UpdateProfessionRequest {
  name?: string;
  situacao?: boolean;
}

export interface ProfessionSearchFilter {
  id?: string;
  name?: string;
  createdAt?: Date;
  status?: boolean;
}
