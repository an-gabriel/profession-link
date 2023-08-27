import { v4 as uuidv4 } from 'uuid';

export default class ProfessionModel {
  private _id: string;
  private _descricao: string;
  private _situacao: boolean;
  private _updatedAt: Date;
  private _createdAt: Date;
  private _deletedAt: Date;

  constructor(
    descricao: string,
    situacao: boolean,
    updatedAt: Date,
    createdAt: Date,
    deletedAt: Date,
  ) {
    this._id = uuidv4();
    this._descricao = descricao;
    this._situacao = situacao;
    this._updatedAt = updatedAt;
    this._createdAt = createdAt;
    this._deletedAt = deletedAt;
  }

  get id(): string {
    return this._id;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(value: string) {
    this._descricao = value;
  }

  get situacao(): boolean {
    return this._situacao;
  }

  set situacao(value: boolean) {
    this._situacao = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  set deletedAt(value: Date) {
    this._deletedAt = value;
  }

  fillFields(
    descricao: string,
    situacao: boolean,
    updatedAt: Date,
    createdAt: Date,
    deletedAt: Date,
  ): void {
    this._descricao = descricao;
    this._situacao = situacao;
    this._updatedAt = updatedAt;
    this._createdAt = createdAt;
    this._deletedAt = deletedAt;
  }

  // Método para obter o objeto completo
  getFullObject(): ProfessionModel {
    return new ProfessionModel(
      this._descricao,
      this._situacao,
      this._updatedAt,
      this._createdAt,
      this._deletedAt,
    );
  }
}
