import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639081981462 implements MigrationInterface {
    name = 'init1639081981462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
    }

}
