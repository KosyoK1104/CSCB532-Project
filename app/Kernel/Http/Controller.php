<?php

declare(strict_types=1);

namespace App\Kernel\Http;

use Psr\Http\Message\ResponseInterface;

abstract class Controller
{
    public readonly Request $request;
    public readonly ResponseInterface $response;

    public function __setRequest(Request $request): void
    {
        $this->request = $request;
    }

    public function __setResponse(ResponseInterface $response): void
    {
        $this->response = $response;
    }

    public function respond(array $data, $status = 200)
    {
        $stream = $this->response->getBody();
        $stream->write(json_encode($data));
        return $this->response->withBody($stream)->withStatus($status)->withHeader('Content-type', 'application/json');
    }
}