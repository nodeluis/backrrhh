import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639151772065 implements MigrationInterface {
    name = 'init1639151772065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "finger_print_entity" ("id" SERIAL NOT NULL, "thumb" character varying NOT NULL, "index" character varying NOT NULL, "middle" character varying NOT NULL, "ring" character varying NOT NULL, "little" character varying NOT NULL, "enabled" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "employeeId" integer, CONSTRAINT "REL_4d8d9a271f21ab2d01f14801d7" UNIQUE ("employeeId"), CONSTRAINT "PK_344ad02a8a2689c9d295746661d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "finger_print_entity" ADD CONSTRAINT "FK_4d8d9a271f21ab2d01f14801d71" FOREIGN KEY ("employeeId") REFERENCES "employee_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finger_print_entity" DROP CONSTRAINT "FK_4d8d9a271f21ab2d01f14801d71"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "finger_print_entity"`);
    }

}
