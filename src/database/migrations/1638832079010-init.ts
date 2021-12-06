import {MigrationInterface, QueryRunner} from "typeorm";

export class init1638832079010 implements MigrationInterface {
    name = 'init1638832079010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_entity" ("id" SERIAL NOT NULL, "ci" character varying NOT NULL, "civilStatus" character varying NOT NULL, "dateOfAdmission" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "employedName" character varying NOT NULL, "enabled" boolean NOT NULL, "gender" character varying NOT NULL, "lastName1" character varying NOT NULL, "lastName2" character varying NOT NULL, "mobile" character varying NOT NULL, "nit" integer NOT NULL, "description" character varying NOT NULL, "photography" character varying NOT NULL, "placeOfBirth" character varying NOT NULL, "qr" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c82a9a0a7c05a72def0c72a68ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_entity" ("id" SERIAL NOT NULL, "admin" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_57a5504c7abcb1d2a9c82ae6f48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "permissionsId" integer, CONSTRAINT "REL_7e0029d955a57f502a3bc02c3d" UNIQUE ("permissionsId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_7e0029d955a57f502a3bc02c3de" FOREIGN KEY ("permissionsId") REFERENCES "permission_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_7e0029d955a57f502a3bc02c3de"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "permission_entity"`);
        await queryRunner.query(`DROP TABLE "employee_entity"`);
    }

}
