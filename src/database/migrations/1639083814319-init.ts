import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639083814319 implements MigrationInterface {
    name = 'init1639083814319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" DROP COLUMN "last_update"`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" ADD "last_update" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" DROP COLUMN "last_connection"`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" ADD "last_connection" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" DROP COLUMN "last_connection"`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" ADD "last_connection" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" DROP COLUMN "last_update"`);
        await queryRunner.query(`ALTER TABLE "pc_auth_entity" ADD "last_update" TIMESTAMP NOT NULL`);
    }

}
