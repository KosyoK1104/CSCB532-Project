<?php

declare(strict_types=1);

namespace App\Clients\Infrastucture\Persistance;

use App\Clients\Domain\Client;
use App\Clients\Domain\ClientRepository;
use App\Clients\Domain\Exceptions\ClientNotFound;
use App\Clients\Domain\ValueObjects\FirstName;
use App\Clients\Domain\ValueObjects\LastName;
use App\Shared\Database\Database;

final class DbClientRepository implements ClientRepository
{
    public function __construct(
        private readonly Database $db
    ) {
    }

    /**
     * @param int $id
     * @return Client
     * @throws ClientNotFound
     */
    public function byId(int $id) : Client
    {
        $query = "SELECT * FROM clients WHERE id = :id";
        $row = $this->db->row($query, ['id' => $id]);
        if (!$row) {
            throw ClientNotFound::byId();
        }
        return new Client(
            $row['id'],
            new FirstName($row['first_name']),
            new LastName($row['last_name'])
        );
    }

    public function create(Client $client) : void
    {
        $query = "INSERT INTO clients (id, first_name, last_name) VALUES (:id, :first_name, :last_name)";
        $binds = [
            'id'         => $client->id,
            'first_name' => $client->firstName()->value,
            'last_name'  => $client->lastName()->value,
        ];

        $this->db->execute($query, $binds);
    }

    public function update(Client $client) : void
    {
        $query = "UPDATE clients SET first_name = :first_name, last_name = :last_name WHERE id = :id";
        $binds = [
            'id'         => $client->id,
            'first_name' => $client->firstName()->value,
            'last_name'  => $client->lastName()->value,
        ];

        $this->db->execute($query, $binds);
    }

    public function nextIdentity() : int
    {
        return $this->db->nextId('clients');
    }
}
