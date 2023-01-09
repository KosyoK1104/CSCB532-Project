<?php

namespace App\Models;

enum DeliveryType : string
{
    case ADDRESS = "address";
    case OFFICE = "office";
}
