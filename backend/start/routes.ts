/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

// USER
Route.post('/token', 'UsersController.login');
Route.post('/user', 'UsersController.store');

// PERSON
Route.get('/people', 'PeopleController.index');
Route.get('/person', 'PeopleController.byId');
Route.post('/person', 'PeopleController.store');
Route.put('/person', 'PeopleController.update');
Route.delete('/person', 'PeopleController.remove');

// MOVIE
Route.get('/movies', 'MoviesController.index');
Route.get('/movie', 'MoviesController.byId');
Route.post('/movie', 'MoviesController.store');
Route.put('/movie', 'MoviesController.update');
Route.delete('/movie', 'MoviesController.remove');

// RELATIONSHIP
Route.post('/casting', 'MoviePeopleController.addCasting');
Route.post('/producer', 'MoviePeopleController.addProducer');
Route.post('/director', 'MoviePeopleController.addDirector');

Route.delete('/casting', 'MoviePeopleController.removeCasting');
Route.delete('/producer', 'MoviePeopleController.removeProducer');
Route.delete('/director', 'MoviePeopleController.removeDirector');
