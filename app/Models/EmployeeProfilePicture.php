<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeProfilePicture extends Model
{
    public function employee() : BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
