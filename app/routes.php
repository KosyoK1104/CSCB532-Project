<?php

declare(strict_types=1);

use App\Test\TestController;
use League\Route\Router;

/**
 * @var Router $router
 */

$router->map('GET', '{lol:.*}', TestController::class . '::test');