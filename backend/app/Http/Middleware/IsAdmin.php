<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user && in_array(strtolower($user->role), ['admin', 'administrator'])) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized. Admins only.'], 403);
    }
}
