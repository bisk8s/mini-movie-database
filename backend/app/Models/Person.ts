import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Movie from "./Movie";

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public lastName: string;

  @column()
  public firstName: string;

  @column()
  public aliases: string[];

  @hasMany(() => Movie)
  public moviesAsActor: HasMany<typeof Movie>;

  @hasMany(() => Movie)
  public moviesAsDirector: HasMany<typeof Movie>;

  @hasMany(() => Movie)
  public moviesAsProducer: HasMany<typeof Movie>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
