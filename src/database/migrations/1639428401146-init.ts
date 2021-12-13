import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639428401146 implements MigrationInterface {
    name = 'init1639428401146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract_entity" ("id" SERIAL NOT NULL, "BankAccount" character varying NOT NULL, "item" character varying NOT NULL, "dateOfConclusion" TIMESTAMP NOT NULL, "dateContract" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "worksSaturday" character varying NOT NULL, "havingBasic" character varying NOT NULL, "tickea" boolean NOT NULL, "enabled" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "positionId" integer, "studyId" integer, "professionId" integer, "projectId" integer, "typeEmployeeId" integer, "edificeId" integer, "employeeId" integer, "hourHandId" integer, CONSTRAINT "PK_7575db328609620b41aa3ada0c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_7df0aa586ffb9c8132f88185d1f" FOREIGN KEY ("positionId") REFERENCES "position_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_cd8a194d63cf2e881b91a106443" FOREIGN KEY ("studyId") REFERENCES "study_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_bfc1dc4928034b24fa6360138fb" FOREIGN KEY ("professionId") REFERENCES "profession_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_c33afced8ed39256d879c67a5d6" FOREIGN KEY ("projectId") REFERENCES "project_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_785caa676aac494a470baff2885" FOREIGN KEY ("typeEmployeeId") REFERENCES "type_employee_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_b56ebb1d7658a65baeb0d5e8919" FOREIGN KEY ("edificeId") REFERENCES "edifice_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_57455b49bc7e8ef8c08ca3ea8b4" FOREIGN KEY ("employeeId") REFERENCES "employee_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_7fbee33adc0f152b6dcdad7d27c" FOREIGN KEY ("hourHandId") REFERENCES "hour_hand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_7fbee33adc0f152b6dcdad7d27c"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_57455b49bc7e8ef8c08ca3ea8b4"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_b56ebb1d7658a65baeb0d5e8919"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_785caa676aac494a470baff2885"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_c33afced8ed39256d879c67a5d6"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_bfc1dc4928034b24fa6360138fb"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_cd8a194d63cf2e881b91a106443"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_7df0aa586ffb9c8132f88185d1f"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "photography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ALTER COLUMN "dateOfAdmission" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "contract_entity"`);
    }

}
