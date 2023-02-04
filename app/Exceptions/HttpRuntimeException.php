<?php

declare(strict_types=1);

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class HttpRuntimeException extends HttpException
{
    public function __construct(string $message = '')
    {
        parent::__construct(400, $message);
    }
}
