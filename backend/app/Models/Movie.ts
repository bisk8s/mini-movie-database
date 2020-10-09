import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  computed,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm';
import Person from './Person';

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public releaseYear: number;

  @manyToMany(() => Person, {
    pivotTable: 'movie_cast'
  })
  public casting: ManyToMany<typeof Person>;

  @manyToMany(() => Person, {
    pivotTable: 'movie_directors'
  })
  public directors: ManyToMany<typeof Person>;

  @manyToMany(() => Person, {
    pivotTable: 'movie_producers'
  })
  public producers: ManyToMany<typeof Person>;

  @computed()
  public get releaseYearRoman(): string {
    // https://rosettacode.org/wiki/Roman_numerals/Encode#Declarative
    return 'I'
      .repeat(this.releaseYear)
      .replace(/IIIII/g, 'V')
      .replace(/VV/g, 'X')
      .replace(/XXXXX/g, 'L')
      .replace(/LL/g, 'C')
      .replace(/CCCCC/g, 'D')
      .replace(/DD/g, 'M')
      .replace(/VIIII/g, 'IX')
      .replace(/LXXXX/g, 'XC')
      .replace(/XXXX/g, 'XL')
      .replace(/DCCCC/g, 'CM')
      .replace(/CCCC/g, 'CD')
      .replace(/IIII/g, 'IV');
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
