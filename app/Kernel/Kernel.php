<?php

declare(strict_types=1);

namespace App\Kernel;

use App\Kernel\Http\RestResponseFactory;
use Laminas\HttpHandlerRunner\Emitter\SapiEmitter;
use League\Route\Http\Exception as HttpException;
use League\Route\Router;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;
use Whoops\Run;

final class Kernel
{
    private static ContainerInterface $container;
    private static ServerRequestInterface $serverRequest;
    private static RestResponseFactory $responseFactory;

    public function __construct()
    {
        if (!isset(self::$responseFactory)) {
            self::__setResponseFactory(self::$container->get(RestResponseFactory::class));
        }
    }

    public static function __setContainer(ContainerInterface $container): void
    {
        Kernel::$container = $container;
    }

    public static function __setServerRequest(ServerRequestInterface $serverRequest): void
    {
        Kernel::$serverRequest = $serverRequest;
    }

    public static function create(): self
    {
        return new self();
    }


    public static function __setResponseFactory(RestResponseFactory $responseFactory): void
    {
        self::$responseFactory = $responseFactory;
    }

    public function run(): void
    {
        try {
            $router = Kernel::$container->get(Router::class);

            $response = $router->dispatch(Kernel::$serverRequest);
        } catch (HttpException $e) {
            $response = self::$responseFactory->error($e->getMessage(), $e->getCode());
        }

        $this->emit($response);
    }

    private function emit(ResponseInterface $response): void
    {
        (new SapiEmitter())->emit($response);
    }
}