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
Route.post('/login', 'UsersController.login');
Route.post('/user', 'UsersController.store');

// PERSON
Route.get('/people', 'PeopleController.index');
Route.post('/person', 'PeopleController.store');

// MOVIE
Route.get('/movie', 'MoviesController.index');
Route.post('/movie', 'MoviesController.store');
