<?php

declare(strict_types=1);

namespace App\Models;

enum DeliveryType : string
{
    case ADDRESS = "address";
    case OFFICE = "office";
}
