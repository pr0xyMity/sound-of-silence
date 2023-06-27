import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookRefactor1687860188734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "book" RENAME COLUMN "name" TO "title"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "book" RENAME COLUMN "name" TO "name"',
    );
  }
}
