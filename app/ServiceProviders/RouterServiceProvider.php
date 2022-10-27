<?php

declare(strict_types=1);

namespace App\ServiceProviders;

use App\Kernel\Http\MethodStrategy;
use League\Container\ServiceProvider\AbstractServiceProvider;
use League\Route\Router;

final class RouterServiceProvider extends AbstractServiceProvider
{

    public function provides(string $id): bool
    {
        return $id === Router::class;
    }

    public function register(): void
    {
        $container = $this->container;

        $container->addShared(Router::class, function () use ($container) {
            $router = new Router();
            require ROOT_DIR . '/app/routes.php';
            $strategy = new MethodStrategy();
            $strategy->setContainer($container);
            $router->setStrategy($strategy);
            return $router;
        });
    }
}