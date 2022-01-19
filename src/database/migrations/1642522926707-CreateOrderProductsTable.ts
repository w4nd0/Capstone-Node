import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderProductsTable1642522926707
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "productId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "orderId",
            type: "uuid",
          },
          { name: "price", type: "decimal", precision: 10, scale: 2 },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("order_products");
  }
}
