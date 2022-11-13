<?php

declare(strict_types=1);

namespace App\Models\User\Exceptions;

final class UserAuthenticationException extends \InvalidArgumentException
{
    public static function passwordDoesNotMatch() : self
    {
        return new self('Given password does not match!');
    }
}
