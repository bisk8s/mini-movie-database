import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class MovieDirectors extends BaseSchema {
  protected tableName = 'movie_directors';

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.integer('movie_id');
      table.integer('person_id');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
