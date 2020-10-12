# Mini Movie Database

An app about movies.🍿🎞️🎬

## About

This is a shared Github repository for MMDB's back and frontend.
The backend of the project is deployed and running [online](https://mini-movie-database.herokuapp.com/movies)
To check the endpoints and documentation, keep scrolling. 🙂
You will also find a link for the Expo Project and the APK next.

## Used libraries and frameworks

The backend of the project is an [AdonisJS](https://preview.adonisjs.com/blog/introducing-adonisjs-v5/) application.
AdonisJs is a Node.js MVC framework. It offers a stable ecosystem to write server-side web applications. And it also supports TypeScript.

When checking the Expo project you may also see that I've chosen to use [React Native Paper](https://callstack.github.io/react-native-paper/).
Paper is a collection of customizable and production-ready components, following Google’s Material Design guidelines. It adds a lot when the subject is style.

## Mobile:

- [Expo Project](https://expo.io/@bisk8s/MMDB)
- [APK](https://drive.google.com/file/d/1bqCr-p4Z3TY1Cl7EAl76RgD9DrE68APJ/view?usp=drivesdk)

## API:

### URL

`https://mini-movie-database.herokuapp.com/`

### Endpoints

#### USER

| Method | Path     | Attr.                         | Return        |
| ------ | -------- | ----------------------------- | ------------- |
| POST   | `/token` | `user:string,password:string` | `t:TokenData` |
| POST   | `/user`  | `user:string,password:string` | `u:UserData`  |

##### Types

```javascript
type TokenData = {
  type: "bearer",
  token: string
}

type UserData={
  emai: string
  created_at: string,
  updated_at: string,
  id: number
}
```

#### PERSON

| Method | Path      | Attr.                                                                                                                                                                         | Return                 |
| ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| GET    | `/people` | `searchQuery: string, page: number`                                                                                                                                           | `p:PeopleResponseData` |
| GET    | `/person` | `id:number`                                                                                                                                                                   | `p:PersonData`         |
| POST   | `/person` | `firstName: string, lastName: string, aliases: string, token: string, moviesAsActor?: MovieData[], moviesAsProducer?: MovieData[], moviesAsDirector?: MovieData[]`            | `p:PersonData`         |
| PUT    | `/person` | `id:number, firstName: string, lastName: string, aliases: string, token: string, moviesAsActor?: MovieData[], moviesAsProducer?: MovieData[], moviesAsDirector?: MovieData[]` | `p:PersonData`         |
| DELETE | `/person` | `id:number`                                                                                                                                                                   | `d:DeletedData`        |

#### Types

```javascript
type PeopleResponseData = {
  meta: {
    total: number,
    per_page: number,
    current_page: number,
    last_page: number,
    first_page: number,
    first_page_url: string,
    last_page_url: string,
    next_page_url: string,
    previous_page_url: string
  },
  data: PersonData[]
};

type PersonData = {
  id: number,
  last_name: string,
  first_name: string,
  aliases: string[],
  created_at: string,
  updated_at: string,
  moviesAsProducer?: MovieData[],
  moviesAsActor?: MovieData[],
  moviesAsDirector?: MovieData[]
};
```

#### MOVIE

| Method | Path      | Attr.                                                                                                                           | Return                 |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| GET    | `/movies` | `searchQuery: string, page: number`                                                                                             | `m:PeopleResponseData` |
| GET    | `/movie`  | `id:number`                                                                                                                     | `m:MovieData`          |
| POST   | `/movie`  | `title: string, releaseYear: number, token: string, casting?: PersonData[], producers?: PersonData[], directors?: PersonData[]` | `m:MovieData`          |
| PUT    | `/movie`  | `title: string, releaseYear: number, token: string, casting?: PersonData[], producers?: PersonData[], directors?: PersonData[]` | `m:MovieData`          |
| DELETE | `/movie`  | `id:number`                                                                                                                     | `d:deletedData`        |

#### Types

```javascript
type MoviesResponseData = {
  meta: {
    total: number,
    per_page: number,
    current_page: number,
    last_page: number,
    first_page: number,
    first_page_url: string,
    last_page_url: string,
    next_page_url: string,
    previous_page_url: string
  },
  data: MovieData[]
};

type MovieData = {
  id: number,
  title: string,
  release_year: number,
  created_at: string,
  updated_at: string,
  releaseYearRoman: string,
  casting?: PersonData[],
  directors?: PersonData[],
  producers?: PersonData[]
};
```

#### RELATIONSHIP

| Method | Path        | Attr.                                           | Return           |
| ------ | ----------- | ----------------------------------------------- | ---------------- |
| POST   | `/casting`  | `id: number, personId: number, movieId: number` | `r:RelationData` |
| POST   | `/producer` | `id: number, personId: number, movieId: number` | `r:RelationData` |
| POST   | `/director` | `id: number, personId: number, movieId: number` | `r:RelationData` |
| DELETE | `/casting`  | `id: number`                                    | `d:DeletedData`  |
| DELETE | `/producer` | `id: number`                                    | `d:DeletedData`  |
| DELETE | `/director` | `id: number`                                    | `d:DeletedData`  |

##### Types

```javascript
type RelationData = {
  id: number,
  personId: number,
  movieId: number
};
type DeletedData = {
  deletedId: number
};
```
