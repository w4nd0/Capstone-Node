import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddressesTable1642522815570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    new Table({
      name: "addresses",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "uuid_generate_v4()",
        },
        {
          name: "userId",
          type: "uuid",
        },
        {
          name: "city",
          type: "varchar",
        },
        {
          name: "street",
          type: "varchar",
        },
        {
          name: "number",
          type: "int",
        },
      ],
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
