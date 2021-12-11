import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639260003448 implements MigrationInterface {
    name = 'init1639260003448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reason_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "regularizationId" integer, CONSTRAINT "PK_c54e09c675274ea8a2d40daa0cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regularization_entity" ("id" SERIAL NOT NULL, "turn" character varying NOT NULL, "detail" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_99b02a7f6074b819203400cecb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickeo_entity" ("id" SERIAL NOT NULL, "entryTimeTomorrow" TIMESTAMP NOT NULL, "departureTimeTomorrow" TIMESTAMP NOT NULL, "minutesLateTomorrow" integer NOT NULL, "lateEntryTime" TIMESTAMP NOT NULL, "lateCheckOutTime" TIMESTAMP NOT NULL, "minutesLateInAfternoon" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "employeeId" integer, "hourId" integer, CONSTRAINT "PK_bb304cb6140a37fbc8f771d0707" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickeo_entity_regularization_regularization_entity" ("tickeoEntityId" integer NOT NULL, "regularizationEntityId" integer NOT NULL, CONSTRAINT "PK_403e71f5024aa8aa8a01ef6d15a" PRIMARY KEY ("tickeoEntityId", "regularizationEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_826fbc99bb0775c6d4cc7d05d5" ON "tickeo_entity_regularization_regularization_entity" ("tickeoEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a26de8f68fc4494524d0db32b3" ON "tickeo_entity_regularization_regularization_entity" ("regularizationEntityId") `);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "reason_entity" ADD CONSTRAINT "FK_fa4e29d84fe45085d39493a4994" FOREIGN KEY ("regularizationId") REFERENCES "regularization_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regularization_entity" ADD CONSTRAINT "FK_7ff18e6740ce550514ce2d3996d" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity" ADD CONSTRAINT "FK_f6dc6a3f9d2a5f111b899d75f9d" FOREIGN KEY ("employeeId") REFERENCES "employee_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity" ADD CONSTRAINT "FK_3fc01758572b88693cd6585f563" FOREIGN KEY ("hourId") REFERENCES "hour_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity_regularization_regularization_entity" ADD CONSTRAINT "FK_826fbc99bb0775c6d4cc7d05d5f" FOREIGN KEY ("tickeoEntityId") REFERENCES "tickeo_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity_regularization_regularization_entity" ADD CONSTRAINT "FK_a26de8f68fc4494524d0db32b39" FOREIGN KEY ("regularizationEntityId") REFERENCES "regularization_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickeo_entity_regularization_regularization_entity" DROP CONSTRAINT "FK_a26de8f68fc4494524d0db32b39"`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity_regularization_regularization_entity" DROP CONSTRAINT "FK_826fbc99bb0775c6d4cc7d05d5f"`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity" DROP CONSTRAINT "FK_3fc01758572b88693cd6585f563"`);
        await queryRunner.query(`ALTER TABLE "tickeo_entity" DROP CONSTRAINT "FK_f6dc6a3f9d2a5f111b899d75f9d"`);
        await queryRunner.query(`ALTER TABLE "regularization_entity" DROP CONSTRAINT "FK_7ff18e6740ce550514ce2d3996d"`);
        await queryRunner.query(`ALTER TABLE "reason_entity" DROP CONSTRAINT "FK_fa4e29d84fe45085d39493a4994"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a26de8f68fc4494524d0db32b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_826fbc99bb0775c6d4cc7d05d5"`);
        await queryRunner.query(`DROP TABLE "tickeo_entity_regularization_regularization_entity"`);
        await queryRunner.query(`DROP TABLE "tickeo_entity"`);
        await queryRunner.query(`DROP TABLE "regularization_entity"`);
        await queryRunner.query(`DROP TABLE "reason_entity"`);
    }

}
