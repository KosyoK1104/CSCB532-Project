<?php

declare(strict_types=1);

namespace App\Kernel\Http;

use App\Shared\Database;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class DatabaseMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly Database $database
    ) {
    }

    /**
     * @throws Exception
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
    {
        try {
            $response = $handler->handle($request);
            $this->database->commit();
        }
        catch (Exception $e) {
            $this->database->rollback();
            throw $e;
        }
        return $response;
    }
}
