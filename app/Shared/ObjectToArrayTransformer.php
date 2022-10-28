<?php

declare(strict_types=1);

namespace App\Shared;

use JsonSerializable;
use Traversable;

final class ObjectToArrayTransformer
{
    public static function transform(object|array $object): mixed
    {
        $result = [];

        if (is_array($object)) {
            foreach ($object as $key => $value) {
                $result[$key] = self::transform($value);
            }
            return $result;
        }
        if ($object instanceof JsonSerializable) {
            return $object->jsonSerialize();
        }
        if ($object instanceof Traversable) {
            return self::traverse($object);
        }
        if (method_exists($object, 'toArray')) {
            return $object->toArray();
        }
        if (method_exists($object, '__toString')) {
            return $object->__toString();
        }
        $vars = array_keys(get_object_vars($object));
        foreach ($vars as $var) {
            $result[self::camelToSnake($var)] = is_object($object->$var) ? self::transform($object->$var) : $object->$var;
        }
        return $result;
    }

    private static function camelToSnake($string): string
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
    }

    private static function traverse(Traversable $object): array
    {
        $result = [];
        foreach ($object as $key => $value) {
            $result[$key] = self::transform($value);
        }
        return $result;
    }
}