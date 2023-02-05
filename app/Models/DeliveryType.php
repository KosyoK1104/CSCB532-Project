<?php

declare(strict_types=1);

namespace App\Models;

enum DeliveryType : string
{
    case ADDRESS = "address";
    case OFFICE = "office";

    public static function options() : array
    {
        return [
            self::ADDRESS->value,
            self::OFFICE->value,
        ];
    }
}
