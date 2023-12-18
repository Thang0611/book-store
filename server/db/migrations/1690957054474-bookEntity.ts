import { MigrationInterface, QueryRunner } from "typeorm";

export class BookEntity1690957054474 implements MigrationInterface {
    name = 'BookEntity1690957054474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`updateAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`updatedAt\` \`updateAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
