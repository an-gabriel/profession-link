import { v4 as uuidv4 } from 'uuid';

export default class ProfessionalModel {
  private _id: string;
  private _nome: string;
  private _telefone: string;
  private _email: string;
  private _tipoDeProfissional: string;
  private _situacao: boolean;
  private _updatedAt?: Date; // Alterado para ser opcional
  private _createdAt?: Date; // Alterado para ser opcional
  private _deletedAt?: Date;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    tipoDeProfissional: string,
    situacao: boolean,
    updatedAt?: Date,
    createdAt?: Date,
    deletedAt?: Date,
  ) {
    this._id = uuidv4();
    this._nome = nome;
    this._telefone = telefone;
    this._email = email;
    this._tipoDeProfissional = tipoDeProfissional;
    this._situacao = situacao;

    if (updatedAt) {
      this._updatedAt = updatedAt;
    }
    if (createdAt) {
      this._createdAt = createdAt;
    }

    this._deletedAt = deletedAt;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get telefone(): string {
    return this._telefone;
  }

  set telefone(value: string) {
    this._telefone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get tipoDeProfissional(): string {
    return this._tipoDeProfissional;
  }

  set tipoDeProfissional(value: string) {
    this._tipoDeProfissional = value;
  }

  get situacao(): boolean {
    return this._situacao;
  }

  set situacao(value: boolean) {
    this._situacao = value;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  set deletedAt(value: Date | undefined) {
    this._deletedAt = value;
  }

  // Método para obter o objeto completo
  getFullObject(): ProfessionalModel {
    return new ProfessionalModel(
      this._nome,
      this._telefone,
      this._email,
      this._tipoDeProfissional,
      this._situacao,
      this._updatedAt,
      this._createdAt,
      this._deletedAt,
    );
  }
}
