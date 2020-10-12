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

Method: post
`/token`

Method: post
`/user`

#### PERSON

Method: get
`/people`

Method: get
`/person`

Method: post
`/person`

Method: put
`/person`

Method: delete
`/person`

#### MOVIE

Method: get
`/movies`

Method: get
`/movie`

Method: post
`/movie`

Method: put
`/movie`

Method: delete
`/movie`

#### RELATIONSHIP

Method: post
`/casting`

Method: post
`/producer`

Method: post
`/director`

Method: delete
`/casting`

Method: delete
`/producer`

Method: delete
`/director`
