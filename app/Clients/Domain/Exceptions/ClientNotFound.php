<?php

declare(strict_types=1);

namespace App\Clients\Domain\Exceptions;

use RuntimeException;

final class ClientNotFound extends RuntimeException implements ClientException
{
    public static function byId() : self
    {
        return new self('Client was not found!', 404);
    }
}
