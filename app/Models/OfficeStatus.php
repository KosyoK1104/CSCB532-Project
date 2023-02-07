<?php

namespace App\Models;

enum OfficeStatus : string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public static function options() : array
    {
        return [
            'active',
            'inactive',
        ];
    }
}
