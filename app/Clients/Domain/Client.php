<?php

declare(strict_types=1);

namespace App\Clients\Domain;

use App\Clients\Domain\ValueObjects\FirstName;
use App\Clients\Domain\ValueObjects\LastName;

// Entity
final class Client
{
    public function __construct(
        public readonly int $id,
        private FirstName $firstName,
        private LastName $lastName,
    ) {
    }

    public function firstName() : FirstName
    {
        return $this->firstName;
    }

    public function lastName() : LastName
    {
        return $this->lastName;
    }

    public function update(FirstName $firstName, LastName $lastName) : void
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

}
