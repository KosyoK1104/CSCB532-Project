<?php

declare(strict_types=1);

namespace App\Test;

use App\Kernel\Http\RestController;
use App\Shared\Database;
use Psr\Http\Message\ResponseInterface;

final class TestController extends RestController
{
    public function __construct(
        private readonly Database $database
    ) {
    }

    public function test() : ResponseInterface
    {
        return $this->respond(['asd' => 'asd']);
    }
}
