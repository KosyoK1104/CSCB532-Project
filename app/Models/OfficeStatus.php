<?php

namespace App\Models;

enum OfficeStatus : string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
