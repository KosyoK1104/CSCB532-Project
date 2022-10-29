<?php

declare(strict_types=1);

namespace App\Kernel\Http;

use Psr\Http\Message\ResponseInterface;
use Twig\Environment;

abstract class HtmlController extends Controller
{
    private readonly Environment $twig;
    private readonly HtmlResponseFactory $responseFactory;

    public function __setTwig(Environment $twig): void
    {
        $this->twig = $twig;
    }

    public function __setResponseFactory(HtmlResponseFactory $responseFactory): void
    {
        $this->responseFactory = $responseFactory;
    }

    public function render(string $template, array $data = []): ResponseInterface
    {
        $template = $this->twig->load($template);

        return $this->responseFactory
            ->success(
                $template
                    ->render($data)
            );
    }
}
