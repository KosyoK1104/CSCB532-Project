<?php

declare(strict_types=1);

namespace App\Models;

enum DeliveryStatus: string
{
    case CREATED = 'created';
    case DELIVERED = 'delivered';

    public static function options() : array
    {
        return [
            self::CREATED->value,
            self::DELIVERED->value,
        ];
    }
}
