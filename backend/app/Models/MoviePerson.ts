import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export class MovieCast extends BaseModel {
  public static table = 'movie_cast';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public movieId: number;

  @column()
  public personId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

export class MovieProducers extends MovieCast {
  public static table = 'movie_producers';
}

export class MovieDirectors extends MovieCast {
  public static table = 'movie_directors';
}
