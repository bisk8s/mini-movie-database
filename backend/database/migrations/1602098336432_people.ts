import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class People extends BaseSchema {
  protected tableName = 'people';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary();
      table.string('last_name').notNullable();
      table.string('first_name').notNullable();
      table.string('aliases');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
