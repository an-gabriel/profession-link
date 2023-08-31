import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfessions1693456855786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM profession`);
  }
}
