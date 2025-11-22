<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_approved',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * SAFE password mutator (prevents double hashing)
     */
    public function setPasswordAttribute($value)
    {
        if (substr($value, 0, 4) === '$2y$') {
            $this->attributes['password'] = $value;
        } else {
            $this->attributes['password'] = Hash::make($value);
        }
    }


    public function getRoleNameAttribute()
    {
        return match ($this->role) {
            'admin' => 'Administrator',
            'teacher' => 'Teacher',
            'student' => 'Student',
            default => ucfirst($this->role),
        };
    }

    /**
     * Map 'administrator' to 'admin' internally
     */
    public function setRoleAttribute($value)
    {
        $roleMap = [
            'administrator' => 'admin',
            'admin' => 'admin',
            'teacher' => 'teacher',
            'student' => 'student',
        ];

        $this->attributes['role'] = $roleMap[strtolower($value)] ?? 'student';
    }
}
