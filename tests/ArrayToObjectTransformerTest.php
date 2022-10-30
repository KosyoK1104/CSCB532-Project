<?php

declare(strict_types=1);

use App\Shared\Helpers\ObjectToArrayTransformer;
use PHPUnit\Framework\TestCase;

final class ArrayToObjectTransformerTest extends TestCase
{
    public function test_array(): void
    {
        $object = new StdClass();
        $childObject = new StdClass();
        $childObject->barFoo = 'barFoo';
        $object->child = $childObject;
        $object->foo = 'foo';
        $object->fooBar = 'fooBar';
        self::assertEquals(
            ObjectToArrayTransformer::transform($object),
            [
                'foo' => 'foo',
                'foo_bar' => 'fooBar',
                'child' => [
                    'bar_foo' => 'barFoo'
                ]
            ]);
    }
}
