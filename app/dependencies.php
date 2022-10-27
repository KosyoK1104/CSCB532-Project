<?php

declare(strict_types=1);

use App\ServiceProviders\HttpServiceProvider;
use App\ServiceProviders\RouterServiceProvider;
use App\ServiceProviders\TemplateServiceProvider;
use League\Container\Container;

$container = new Container();

/**
 * Service providers
 */
$container->addServiceProvider(new RouterServiceProvider());
$container->addServiceProvider(new TemplateServiceProvider());
$container->addServiceProvider(new HttpServiceProvider());

$container->delegate(
    new League\Container\ReflectionContainer(true)
);

return $container;