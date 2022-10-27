<?php

declare(strict_types=1);

namespace App\Test;

use App\Kernel\Http\RestController;
use Psr\Http\Message\ResponseInterface;

final class TestController extends RestController
{
    public function test(): ResponseInterface
    {
        return $this->respond(['asd' => 'asd']);
    }
}