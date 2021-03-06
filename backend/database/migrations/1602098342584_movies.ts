import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Movies extends BaseSchema {
  protected tableName = 'movies';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.integer('release_year').notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
