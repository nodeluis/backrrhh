import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639422268753 implements MigrationInterface {
    name = 'init1639422268753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "united_entity" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "p" boolean NOT NULL, "enabled" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "mpath" character varying DEFAULT '', "parentId" integer, CONSTRAINT "PK_1436f2a7dbc99bae06aae11466c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "united_entity" ADD CONSTRAINT "FK_0b2eb0a1169fdb549a369539e9d" FOREIGN KEY ("parentId") REFERENCES "united_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "united_entity" DROP CONSTRAINT "FK_0b2eb0a1169fdb549a369539e9d"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "united_entity"`);
    }

}
