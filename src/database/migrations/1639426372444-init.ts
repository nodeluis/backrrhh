import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639426372444 implements MigrationInterface {
    name = 'init1639426372444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "position_entity_uniteds_united_entity" ("positionEntityId" integer NOT NULL, "unitedEntityId" integer NOT NULL, CONSTRAINT "PK_50964e06fe0b4635b07bb0779f0" PRIMARY KEY ("positionEntityId", "unitedEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_90c5ec75439b84b1b86a169e21" ON "position_entity_uniteds_united_entity" ("positionEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6ad201047d739a40691d735ec" ON "position_entity_uniteds_united_entity" ("unitedEntityId") `);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "position_entity_uniteds_united_entity" ADD CONSTRAINT "FK_90c5ec75439b84b1b86a169e210" FOREIGN KEY ("positionEntityId") REFERENCES "position_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "position_entity_uniteds_united_entity" ADD CONSTRAINT "FK_c6ad201047d739a40691d735ec4" FOREIGN KEY ("unitedEntityId") REFERENCES "united_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position_entity_uniteds_united_entity" DROP CONSTRAINT "FK_c6ad201047d739a40691d735ec4"`);
        await queryRunner.query(`ALTER TABLE "position_entity_uniteds_united_entity" DROP CONSTRAINT "FK_90c5ec75439b84b1b86a169e210"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6ad201047d739a40691d735ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90c5ec75439b84b1b86a169e21"`);
        await queryRunner.query(`DROP TABLE "position_entity_uniteds_united_entity"`);
    }

}
