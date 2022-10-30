<?php

declare(strict_types=1);

namespace App\Clients\Domain;

use App\Clients\Domain\Exceptions\ClientNotFound;

interface  ClientRepository
{
    public function nextIdentity() : int;

    /**
     * @param int $id
     * @return Client
     * @throws ClientNotFound
     */
    public function byId(int $id) : Client;

    public function create(Client $client) : void;

    public function update(Client $client) : void;
}
