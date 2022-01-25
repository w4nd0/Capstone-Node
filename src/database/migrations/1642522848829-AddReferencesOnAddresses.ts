import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddReferencesOnAddresses1642522848829
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "addresses",
      new TableForeignKey({
        name: "UsersFK",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("addresses", "UsersFK");
  }
}
