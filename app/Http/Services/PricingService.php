<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\DeliveryType;

final class PricingService
{
    public function __construct()
    {
    }

    public function calculatePrice(float $weight, DeliveryType $type) : float
    {
        return match ($type) {
            DeliveryType::OFFICE => $this->calculateForOffice($weight),
            DeliveryType::ADDRESS => $this->calculateForAddress($weight),
        };
    }

    private function calculateForOffice(float $weight) : float
    {
        if ($weight <= 1) {
            return 1;
        }
        if ($weight <= 2) {
            return $weight * 1.5;
        }
        if ($weight <= 3) {
            return $weight * 2;
        }
        return $weight * 2.5;
    }

    private function calculateForAddress(float $weight) : float
    {
        $addressMarkup = 1;
        return $this->calculateForOffice($weight) + $addressMarkup;
    }
}
