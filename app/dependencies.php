<?php

declare(strict_types=1);

use App\Kernel\Http\HtmlController;
use App\Kernel\Http\HtmlResponseFactory;
use App\Kernel\Http\Request;
use App\Kernel\Http\RestController;
use App\Kernel\Http\RestResponseFactory;
use App\ServiceProviders\DatabaseServiceProvider;
use App\ServiceProviders\HttpServiceProvider;
use App\ServiceProviders\RouterServiceProvider;
use App\ServiceProviders\TemplateServiceProvider;
use League\Container\Container;
use Twig\Environment;

$container = new Container();

/**
 * Service providers
 */
$container->addServiceProvider(new RouterServiceProvider());
$container->addServiceProvider(new TemplateServiceProvider());
$container->addServiceProvider(new HttpServiceProvider());
$container->addServiceProvider(new DatabaseServiceProvider());

$container->inflector(HtmlController::class)
    ->invokeMethods(
        [
            '__setRequest'         => [Request::class],
            '__setTwig'            => [Environment::class],
            '__setResponseFactory' => [HtmlResponseFactory::class]
        ]
    )
;

$container->inflector(RestController::class)
    ->invokeMethods(
        [
            '__setRequest'         => [Request::class],
            '__setResponseFactory' => [RestResponseFactory::class],
        ]
    )
;
$container->delegate(
    new League\Container\ReflectionContainer(true)
);

return $container;
