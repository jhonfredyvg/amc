/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginController from '#controllers/auth/login_controller'
import RegistersController from '#controllers/auth/registers_controller'
import router from '@adonisjs/core/services/router'

import LogoutController from '#controllers/auth/logout_controller'
import HomeController from '#controllers/home_controller'
import FilesController from '#controllers/files_controller'
import PetsController from '#controllers/pets/pets_controller'
import AccountsController from '#controllers/account/accounts_controller'
import PoliciesController from '#controllers/policies/policies_controller'



router.on('/').render('index')


router.get('/home', [HomeController, 'index'])


router.on('/teams').render('pages/teams/index')

//Api
router.group(() => {
    //Auth
    router.post('login', [LoginController, 'login'])
    router.post('register', [RegistersController, 'register'])
    router.post('logout', [LogoutController, 'handle'])
    //Pets
    router.post('pet/update/:id', [PetsController, 'update'])    
    router.post('pet/create', [PetsController, 'create'])   
    //File
    router.post('/upload/:pet_id', [FilesController, 'upload']) 
    router.get('/delete/:pet_id/:image_id', [FilesController, 'delete']) 
}).prefix('/api')


// Auth
router.group(() => [
    router.on('/login').render('pages/auth/login'),
    router.on('/register').render('pages/auth/register')
])

//Pets
router.group(() => [
    router.get('/', [PetsController, 'index']),
    router.get('request', [PetsController, 'request'])
]).prefix('/pets')

//Account
router.group(() => [
    router.get('/', [AccountsController, 'index']),
    router.get('mypets', [AccountsController, 'mypets']),
    router.get('myrequest', [AccountsController, 'myrequest']),
    router.get('upload/:id', [AccountsController, 'upload']),
    router.get('update/:id', [AccountsController, 'update']),
    router.get('create', [AccountsController, 'create'])
]).prefix('/account')

//Policies
router.group(() => [
    router.get('/', [PoliciesController, 'index'])
]).prefix('/policies')