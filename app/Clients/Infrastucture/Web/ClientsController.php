<?php

declare(strict_types=1);

namespace App\Clients\Infrastucture\Web;

use App\Clients\Application\Services\ClientService;
use App\Kernel\Http\RestController;
use Psr\Http\Message\ResponseInterface;

final class ClientsController extends RestController
{
    public function __construct(
        private readonly ClientService $clientService
    ) {
    }

    public function create() : ResponseInterface
    {
        $firstName = $this->request->json()->string('first_name');
        $lastName = $this->request->json()->string('last_name');

        $this->clientService->create($firstName, $lastName);

        return $this->respond([]);
    }

    public function update() : ResponseInterface
    {
        $id = $this->request->attributes()->int('id');
        $firstName = $this->request->json()->string('first_name');
        $lastName = $this->request->json()->string('last_name');
        $this->clientService->update($id, $firstName, $lastName);

        return $this->respond([]);
    }
}
