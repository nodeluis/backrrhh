import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639157442116 implements MigrationInterface {
    name = 'init1639157442116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hour_hand_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "enabled" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e6716427cf1935ee335becafcf2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hour_entity" ("id" SERIAL NOT NULL, "entryTomorrow" TIMESTAMP NOT NULL, "departureTomorrow" TIMESTAMP NOT NULL, "lateEntry" TIMESTAMP NOT NULL, "lateCheckOut" TIMESTAMP NOT NULL, "entryTomorrowLimitInitial" TIMESTAMP NOT NULL, "entryTomorrowLimitFinal" TIMESTAMP NOT NULL, "departureTomorrowLimitInitial" TIMESTAMP NOT NULL, "departureTomorrowLimitFinal" TIMESTAMP NOT NULL, "lateEntryLimitInitial" TIMESTAMP NOT NULL, "lateEntryLimitFinal" TIMESTAMP NOT NULL, "lateCheckOutLimitInitial" TIMESTAMP NOT NULL, "lateCheckOutLimitFinal" TIMESTAMP NOT NULL, "enabled" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hourHandId" integer, CONSTRAINT "REL_31bd5c509e287e403767d819cd" UNIQUE ("hourHandId"), CONSTRAINT "PK_40691a35024f067bca06f761609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "hour_entity" ADD CONSTRAINT "FK_31bd5c509e287e403767d819cd8" FOREIGN KEY ("hourHandId") REFERENCES "hour_hand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hour_entity" DROP CONSTRAINT "FK_31bd5c509e287e403767d819cd8"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "hour_entity"`);
        await queryRunner.query(`DROP TABLE "hour_hand_entity"`);
    }

}
