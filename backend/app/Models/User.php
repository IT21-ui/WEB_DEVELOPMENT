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
     * Automatically hash password before saving
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Map role values to friendly names
     */
    public function getRoleNameAttribute()
    {
        return match($this->role) {
            'admin' => 'Administrator',
            'teacher' => 'Teacher',
            'student' => 'Student',
            default => ucfirst($this->role),
        };
    }

    /**
     * Optional: allow assigning either 'admin' or 'administrator'
     * and store as 'admin' in the database
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
