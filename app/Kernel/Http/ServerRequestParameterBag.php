<?php

declare(strict_types=1);

namespace App\Kernel\Http;

use App\Shared\ParameterBag;

trait ServerRequestParameterBag
{
    public function attributes(): ParameterBag
    {
        return new ParameterBag($this->serverRequest->getAttributes());
    }

    public function query(): ParameterBag
    {
        return new ParameterBag($this->serverRequest->getQueryParams());
    }

    public function post(): ParameterBag
    {
        return new ParameterBag($this->serverRequest->getParsedBody());
    }

    public function json(): ParameterBag
    {
        return new ParameterBag($this->serverRequest->getParsedBody());
    }
}