<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LockScreenController extends Controller
{
    /**
     * Lock the screen.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lock()
    {
        session(['is_locked' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Screen locked successfully.'
        ]);
    }

    /**
     * Unlock the screen using the user's password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unlock(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = Auth::user();

        if (Hash::check($request->password, $user->password)) {
            session()->forget('is_locked');

            return response()->json([
                'success' => true,
                'message' => 'Screen unlocked successfully.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Incorrect password.'
        ], 401);
    }
}
