<?php

declare(strict_types=1);

namespace App\Shared;

use JsonSerializable;

final class ObjectToArrayTransformer
{
    public static function transform(object $object): array
    {
        $result = [];
        if ($object instanceof JsonSerializable) {
            return $object->jsonSerialize();
        }
        $vars = array_keys(get_object_vars($object));
        foreach ($vars as $var) {
            $result[self::camelToSnake($var)] = is_object($object->$var) ? self::transform($object->$var) : $object->$var;
        }
        return $result;
    }

    private static function camelToSnake($string)
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
    }
}