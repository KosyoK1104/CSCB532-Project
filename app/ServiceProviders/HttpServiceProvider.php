<?php

declare(strict_types=1);

namespace App\ServiceProviders;

use App\Kernel\Http\RestResponseFactory;
use Laminas\Diactoros\ResponseFactory;
use Laminas\Diactoros\StreamFactory;
use League\Container\ServiceProvider\AbstractServiceProvider;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Whoops\Handler\PrettyPageHandler;
use Whoops\Run;

final class HttpServiceProvider extends AbstractServiceProvider
{

    public function provides(string $id): bool
    {
        $provides = [
            ResponseFactoryInterface::class,
            StreamFactoryInterface::class,
        ];

        return in_array($id, $provides, true);
    }

    public function register(): void
    {
        $container = $this->getContainer();
        $container->addShared(ResponseFactoryInterface::class, fn() => new ResponseFactory());
        $container->addShared(StreamFactoryInterface::class, fn() => new StreamFactory());

        $container->addShared(RestResponseFactory::class,
            fn() => new RestResponseFactory(
                $container->get(ResponseFactoryInterface::class),
                $container->get(StreamFactoryInterface::class)
            ));
        $container->addShared(\App\Kernel\Http\ResponseFactory::class,
            fn() => new \App\Kernel\Http\ResponseFactory(
                $container->get(ResponseFactoryInterface::class),
                $container->get(StreamFactoryInterface::class)
            ));


        $whoops = new Run;
        $whoops->pushHandler(new PrettyPageHandler);
        $whoops->register();
    }
}