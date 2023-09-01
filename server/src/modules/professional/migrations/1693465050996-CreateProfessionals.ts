import { MigrationInterface, QueryRunner } from 'typeorm';

import Chance from 'chance';

const chance = new Chance();

export class CreateProfessionals1693465050996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const professionsData = [
      ['c33362c9-61db-4a0e-9c00-63174c203bc0', 'Médico'],
      ['30de46dc-44f0-461d-b3fe-812e505a6e5a', 'Professor'],
      ['8be6d0c1-0954-4dbb-80d1-efd576b4851e', 'Engenheiro'],
      ['f7e83b72-3c1c-4573-bc8f-2055b4862e19', 'Advogado'],
      ['1afccc94-70b9-4aac-a8d6-e73b8d3ab24e', 'Enfermeiro'],
      ['4175b773-ba9f-4c54-8c39-2c714df5bdeb', 'Arquiteto'],
      ['c4dc4b36-273a-401e-b1d9-f9af4eb4423d', 'Programador'],
      ['f394621c-3a42-49b1-adbc-927ab5b4d6a1', 'Dentista'],
      ['298b7a18-192c-406d-9a25-468a80ba0045', 'Farmacêutico'],
      ['bca7fcc1-0fd2-4ee3-b04b-a704e7f09990', 'Psicólogo'],
      ['a42d5e20-95fc-4c9d-a7ec-b6f928d2325a', 'Veterinário'],
      ['eb9e9c4d-d50b-417a-99fa-b4b9c290455d', 'Designer'],
      ['66108532-4461-4092-a39f-dfe1cfdea17c', 'Economista'],
      ['a3b1104f-cebb-49ef-9a50-bb87f6638aaf', 'Nutricionista'],
      ['fd022df2-abda-4cdb-a305-e5d467237e86', 'Fisioterapeuta'],
      ['7e986d6a-7ba9-4816-b348-f725b759052c', 'Jornalista'],
      ['06cdf8ca-c7fa-4a1f-945a-2cee4c83f9f0', 'Piloto'],
      ['96210cdc-3d8d-4b51-aca8-c9f6e4bba359', 'Biólogo'],
      ['7f316847-51af-46f7-8560-a0b482cb2cb6', 'Geólogo'],
      ['96fbe162-4b7d-499c-94fa-b74004d6becd', 'Químico'],
      ['2859d209-3e89-4223-ada2-ea7bc318f634', 'Matemático'],
      ['794718bc-ee0b-48fe-851e-86134a650a0c', 'Historiador'],
      ['e73747c3-17f9-415e-907e-4f06e319173a', 'Fotógrafo'],
      ['c98b8dbc-95df-4b97-b235-b8002019c73a', 'Cineasta'],
      ['5c9c32fb-095d-4eef-913c-acf8acbd25f0', 'Músico'],
      ['8d7d550b-b1ac-4bc2-b8b7-cb0fab783cb7', 'Ator'],
      ['a8db402a-e972-4a06-aeda-03c24d277a0f', 'Engenheiro Civil'],
      ['0e9adee7-f1aa-400c-a0d1-2d1d837e3b95', 'Psiquiatra'],
      ['bd041b26-08b6-4124-b74e-68310b348abd', 'Advogado Criminalista'],
      ['16cc6131-8ab6-4592-b747-c4062c73d276', 'Engenheiro de Software'],
      ['0f92379b-9c56-49c7-a2fe-69e9692d9941', 'Cientista de Dados'],
    ];

    const professionals = Array.from({ length: 40 }, () => ({
      nome: chance.name(),
      telefone: chance.phone(),
      email: chance.email(),
      tipoDeProfissional: chance.pickone(professionsData.map((p) => p[0])),
      situacao: chance.bool(),
    }));

    await queryRunner.query(`
        INSERT INTO professional (nome, telefone, email, tipoDeProfissional, situacao)
        VALUES ${professionals
          .map(
            (p) =>
              `('${p.nome}', '${p.telefone}', '${p.email}', '${p.tipoDeProfissional}', ${p.situacao})`,
          )
          .join(',')}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM professional');
  }
}
