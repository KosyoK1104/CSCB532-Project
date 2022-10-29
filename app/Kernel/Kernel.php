<?php

declare(strict_types=1);

namespace App\Kernel;

use App\Kernel\Exceptions\AppException;
use Laminas\HttpHandlerRunner\Emitter\SapiEmitter;
use League\Route\Http\Exception as HttpException;
use League\Route\Router;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamFactoryInterface;

final class Kernel
{
    private static ContainerInterface $container;
    private static ServerRequestInterface $serverRequest;
    private static ResponseInterface $response;
    private static StreamFactoryInterface $streamFactory;

    private function __construct()
    {
        self::$response = self::$container->get(ResponseInterface::class);
        self::$serverRequest = self::$container->get(ServerRequestInterface::class);
        self::$streamFactory = self::$container->get(StreamFactoryInterface::class);
    }

    public static function __setContainer(ContainerInterface $container) : void
    {
        Kernel::$container = $container;
    }

    public static function create() : self
    {
        return new self();
    }

    public function run() : void
    {
        try {
            $router = Kernel::$container->get(Router::class);

            self::$response = $router->dispatch(Kernel::$serverRequest);
        }
        catch (HttpException $e) {
            self::$response
                ->withStatus($e->getCode())
                ->withBody(
                    self::$streamFactory
                        ->createStream($e->getMessage())
                )
                ->withHeader('Content-type', 'application/json')
            ;
        }
        catch (AppException $e) {
            self::$response
                ->withStatus($e->getCode())
                ->withBody(
                    self::$streamFactory
                        ->createStream($e->getMessage())
                )
                ->withHeader('Content-type', 'application/json')
            ;
        }

        $this->emit(self::$response);
    }

    private function emit(ResponseInterface $response) : void
    {
        (new SapiEmitter())->emit($response);
    }
}
