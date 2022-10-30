<?php

declare(strict_types=1);

use App\Clients\Infrastucture\Web\ClientsController;
use League\Route\Router;

/**
 * @var Router $router
 */

$router->map('POST', '/api/clients/create', ClientsController::class . '::create');
$router->map('POST', '/api/clients/{id:number}/update', ClientsController::class . '::update');
