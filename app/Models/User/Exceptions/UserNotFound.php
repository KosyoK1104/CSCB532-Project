<?php

declare(strict_types=1);

namespace App\Models\User\Exceptions;

use InvalidArgumentException;

final class UserNotFound extends InvalidArgumentException
{
    public static function byId() : self
    {
        return new self('User not found!');
    }
}
