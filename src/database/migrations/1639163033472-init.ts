import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639163033472 implements MigrationInterface {
    name = 'init1639163033472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "hour_entity" DROP CONSTRAINT "FK_31bd5c509e287e403767d819cd8"`);
        await queryRunner.query(`ALTER TABLE "hour_entity" DROP CONSTRAINT "REL_31bd5c509e287e403767d819cd"`);
        await queryRunner.query(`ALTER TABLE "hour_entity" ADD CONSTRAINT "FK_31bd5c509e287e403767d819cd8" FOREIGN KEY ("hourHandId") REFERENCES "hour_hand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hour_entity" DROP CONSTRAINT "FK_31bd5c509e287e403767d819cd8"`);
        await queryRunner.query(`ALTER TABLE "hour_entity" ADD CONSTRAINT "REL_31bd5c509e287e403767d819cd" UNIQUE ("hourHandId")`);
        await queryRunner.query(`ALTER TABLE "hour_entity" ADD CONSTRAINT "FK_31bd5c509e287e403767d819cd8" FOREIGN KEY ("hourHandId") REFERENCES "hour_hand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
    }

}
