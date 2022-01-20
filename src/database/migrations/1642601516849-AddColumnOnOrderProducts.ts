import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnOnOrderProducts1642601516849
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order_products",
      new TableColumn({
        name: "quantity",
        type: "int",
        default: 1,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order_products", "quantity");
  }
}
