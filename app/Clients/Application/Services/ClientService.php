<?php

declare(strict_types=1);

namespace App\Clients\Application\Services;

use App\Clients\Domain\Client;
use App\Clients\Domain\ClientRepository;
use App\Clients\Domain\ValueObjects\FirstName;
use App\Clients\Domain\ValueObjects\LastName;

final class ClientService
{
    public function __construct(
        private readonly ClientRepository $clientRepository
    ) {
    }

    public function create(
        string $firstName,
        string $lastName
    ) : void {
        $clientId = $this->clientRepository->nextIdentity();
        $client = new Client(
            $clientId,
            new FirstName($firstName),
            new LastName($lastName)
        );
        $this->clientRepository->create($client);
    }

    public function update(
        int $id,
        string $firstName,
        string $lastName
    ) : void {
        $client = $this->clientRepository->byId($id);
        $client->update(
            new FirstName($firstName),
            new LastName($lastName)
        );
        $this->clientRepository->update($client);
    }
}
