import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfessions1693463911519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const professions = [
      { descricao: 'Médico', situacao: true },
      { descricao: 'Professor', situacao: true },
      { descricao: 'Engenheiro', situacao: true },
      { descricao: 'Advogado', situacao: true },
      { descricao: 'Enfermeiro', situacao: true },
      { descricao: 'Arquiteto', situacao: true },
      { descricao: 'Programador', situacao: true },
      { descricao: 'Dentista', situacao: true },
      { descricao: 'Farmacêutico', situacao: true },
      { descricao: 'Psicólogo', situacao: true },
      { descricao: 'Veterinário', situacao: true },
      { descricao: 'Designer', situacao: true },
      { descricao: 'Economista', situacao: true },
      { descricao: 'Nutricionista', situacao: true },
      { descricao: 'Fisioterapeuta', situacao: true },
      { descricao: 'Jornalista', situacao: true },
      { descricao: 'Piloto', situacao: true },
      { descricao: 'Biólogo', situacao: true },
      { descricao: 'Geólogo', situacao: true },
      { descricao: 'Químico', situacao: true },
      { descricao: 'Matemático', situacao: true },
      { descricao: 'Historiador', situacao: true },
      { descricao: 'Fotógrafo', situacao: true },
      { descricao: 'Cineasta', situacao: true },
      { descricao: 'Músico', situacao: true },
      { descricao: 'Ator', situacao: true },
      { descricao: 'Engenheiro Civil', situacao: true },
      { descricao: 'Psiquiatra', situacao: true },
      { descricao: 'Advogado Criminalista', situacao: true },
      { descricao: 'Engenheiro de Software', situacao: true },
      { descricao: 'Cientista de Dados', situacao: true },
    ];

    await Promise.all(
      professions.map(async (profession) => {
        await queryRunner.query(`
            INSERT INTO profession (descricao, situacao)
            VALUES ('${profession.descricao}', ${profession.situacao})
        `);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM profession`);
  }
}
