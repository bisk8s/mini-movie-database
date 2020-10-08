import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class MovieCast extends BaseSchema {
  protected tableName = 'movie_cast';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary();
      table.integer('movie_id');
      table.integer('person_id');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
