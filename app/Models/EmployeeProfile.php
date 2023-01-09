<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EmployeeProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
    ];
    protected $dateFormat = 'U';

    public function employee() : BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

}
