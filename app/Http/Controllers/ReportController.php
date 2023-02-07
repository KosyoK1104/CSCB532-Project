<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\HttpUnauthorizedException;
use App\Models\Package;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ReportController extends Controller
{
    public function earnings(Request $request) : JsonResponse
    {
        if (!auth('employees')->user()?->isAdmin()) {
            throw new HttpUnauthorizedException('You are not allowed to access this resource');
        }
//        dd($request->string('from'), $request->string('to')->isEmpty());
        if ($request->string('from')->isEmpty() || $request->string('to')->isEmpty()) {
            return response()->json(
                [
                    'data' => [
                        'earnings' => Package::all()->map(function (Package $package) {
                            return $package->price;
                        })->sum(),
                    ],
                ]
            );
        }
        $validator = \Validator::make(
            $request->all(),
            [
                'from' => 'required|integer',
                'to'   => 'required|integer',
            ]
        );
        $packages = Package::where(function (Builder $query) use ($request) {
            $query->where('status', 'delivered')
                ->where('created_at', '>=', (new \DateTimeImmutable('@' . $request->string('from')))->setTime(0, 0)->getTimestamp())
                ->where('created_at', '<=', (new \DateTimeImmutable('@' . $request->string('to')))->setTime(23, 59, 59)->getTimestamp())
            ;
        })->get();

        return response()->json(
            [
                'data' => [
                    'earnings' => $packages->map(function (Package $package) {
                        return $package->price;
                    })->sum(),
                ],
            ]
        );
    }
}
