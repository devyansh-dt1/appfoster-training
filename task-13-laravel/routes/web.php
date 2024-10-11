<?php

use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\UserController;

use \App\Http\Controllers\ProjectController;

// Route::get('/', function () {
//     return view('users.list');
// });

// User routes
Route::controller(UserController::class)->prefix('users')->group(function () {
    Route::get('/', 'index')->name('users.index');
    Route::get('/create', 'showUserForm')->name('users.create');
    Route::post('/', 'storeUser')->name('users.store');
    Route::get('/{user_id}/edit', 'editUser')->name('users.edit');
    Route::put('/{user_id}', 'updateUser')->name('users.update');
    Route::delete('/{user_id}', 'deleteUser')->name('users.delete');
});

// Project routes
Route::controller(ProjectController::class)->prefix('users/{user_id}/projects')->group(function () {
    Route::get('/', 'listProject')->name('projects.list');
    Route::get('/create', 'createProject')->name('projects.create');
    Route::post('/', 'storeProject')->name('projects.store');
    Route::get('/{project_id}/edit', 'editProject')->name('projects.edit');
    Route::put('/{project_id}', 'updateProject')->name('projects.update');
    Route::delete('/{project_id}', 'deleteProject')->name('projects.delete');
});

