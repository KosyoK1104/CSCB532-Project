<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $employee_id
 * @property ?string $name
 * @property ?string $phone_number
 * @property ?string $profile_picture
 */
class EmployeeProfile extends Model
{
    use HasFactory;

    protected $primaryKey = 'employee_id';

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
