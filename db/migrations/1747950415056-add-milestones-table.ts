import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMilestonesTable1747950415056 implements MigrationInterface {
    name = 'AddMilestonesTable1747950415056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`milestones\` (
          \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
          \`title\` varchar(127) NOT NULL,
          \`description\` text NOT NULL,
          \`dateStart\` date NOT NULL,
          \`dateFinish\` date NOT NULL,
          \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updatedAt\` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`milestones\``);
    }

}
