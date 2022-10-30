<?php

declare(strict_types=1);

namespace App\Clients\Domain\ValueObjects;

use App\Shared\AbstractString;

final class LastName extends AbstractString
{
    public static function isValid(string $value) : bool
    {
        if (strlen($value) < 2) {
            return false;
        }
        return true;
    }
}
