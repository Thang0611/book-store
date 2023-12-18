import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1690703289710 implements MigrationInterface {
    name = 'Init1690703289710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` varchar(36) NOT NULL, \`subTotalPrice\` int NOT NULL, \`quantity\` int NOT NULL, \`initPrice\` int NOT NULL, \`bookId\` varchar(36) NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, \`totalPrice\` int NULL, \`totalItem\` int NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart_item\` (\`id\` varchar(36) NOT NULL, \`subTotalPrice\` int NOT NULL, \`quantity\` int NOT NULL, \`initPrice\` int NOT NULL, \`bookId\` varchar(36) NULL, \`cartId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`numOfPage\` int NOT NULL, \`price\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`imageId\` varchar(36) NULL, UNIQUE INDEX \`REL_b8d045fc2f9506b4a5814c654d\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` varchar(36) NOT NULL, \`star\` int NOT NULL, \`comment\` varchar(255) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`bookId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`province\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`ward\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`amount\` int NOT NULL, \`totalPrice\` int NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_1d766710d77d866319a1bc2f76b\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_228cd21c0af322f67cfc0e8013d\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_29e590514f9941296f3a2440d39\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_b8d045fc2f9506b4a5814c654dc\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_ae1ec2fd91f77b5df325d1c7b4a\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_ae1ec2fd91f77b5df325d1c7b4a\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_b8d045fc2f9506b4a5814c654dc\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_29e590514f9941296f3a2440d39\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_228cd21c0af322f67cfc0e8013d\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_1d766710d77d866319a1bc2f76b\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` ON \`address\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP INDEX \`REL_b8d045fc2f9506b4a5814c654d\` ON \`book\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`cart_item\``);
        await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
