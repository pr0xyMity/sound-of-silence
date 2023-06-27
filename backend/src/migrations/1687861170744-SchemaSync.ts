import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1687861170744 implements MigrationInterface {
  name = 'SchemaSync1687861170744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "description"`);
  }
}
