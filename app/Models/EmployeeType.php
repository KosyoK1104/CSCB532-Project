<?php

declare(strict_types=1);

namespace App\Models;

enum EmployeeType: string
{
    case OFFICE = 'office';
    case DELIVERY = 'delivery';
    case ADMIN = 'admin';

    public static function options() : array
    {
        return [
            'delivery',
            'office',
            'admin',
        ];
    }
}
