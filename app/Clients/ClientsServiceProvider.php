<?php

declare(strict_types=1);

namespace App\Clients;

use App\Clients\Domain\ClientRepository;
use App\Clients\Infrastucture\Persistance\DbClientRepository;
use App\Shared\Database\Database;
use League\Container\ServiceProvider\AbstractServiceProvider;

final class ClientsServiceProvider extends AbstractServiceProvider
{

    public function provides(string $id) : bool
    {
        $provides = [
            ClientRepository::class,
        ];

        return in_array($id, $provides, true);
    }

    public function register() : void
    {
        $this->container->addShared(ClientRepository::class, DbClientRepository::class)
            ->addArgument(Database::class)
        ;
    }
}
