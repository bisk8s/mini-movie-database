import { DateTime } from 'luxon';
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Movie from './Movie';

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public lastName: string;

  @column()
  public firstName: string;

  @column({
    serialize: (value: string) => {
      return value.split(',').map(v => v.trim());
    }
  })
  public aliases: string[];

  @manyToMany(() => Movie, {
    pivotTable: 'movie_cast'
  })
  public moviesAsActor: ManyToMany<typeof Movie>;

  @manyToMany(() => Movie, {
    pivotTable: 'movie_directors'
  })
  public moviesAsDirector: ManyToMany<typeof Movie>;

  @manyToMany(() => Movie, {
    pivotTable: 'movie_producers'
  })
  public moviesAsProducer: ManyToMany<typeof Movie>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
