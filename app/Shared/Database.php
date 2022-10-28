<?php

declare(strict_types=1);

namespace App\Shared;

use PDO;
use PDOStatement;

final class Database
{
    private readonly PDO $pdo;
    private readonly PDOStatement $stmt;
    private readonly string $dsn;
    private array $options = [
        PDO::ATTR_AUTOCOMMIT => 0,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ];

    public function __construct(
        private readonly string $name,
        private readonly string $host,
        private readonly string $port,
        private readonly string $username,
        private readonly string $password,
        private readonly string $charset
    ) {
        $this->dsn = 'mysql:dbname=' . $this->name . ';host=' . $this->host . ';port=' . $this->port . ';charset=' . $this->charset;
    }

    public function connect(): void
    {
        if (!isset($this->pdo)) {
            $this->pdo = new PDO($this->dsn, $this->username, $this->password, $this->options);
        }
    }

    public function disconnect(): void
    {
        unset($this->pdo);
    }

    public function rows(string $query, array $binds = []): array
    {
        $this->run($query, $binds);
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function row(string $query, array $binds = []): array|false
    {
        $this->run($query, $binds);
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return false;
        }
        return $result;
    }

    public function oneValue(string $query, array $binds = []): mixed
    {
        $this->run($query, $binds);
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        return reset($result);
    }

    private function cleanQuery(string $query): string
    {
        $query = trim($query);
        return str_replace(['\\n', '\\t'], ['', ''], $query);
    }

    public function beginTransaction(): void
    {
        $this->pdo->beginTransaction();
    }

    public function commit(): void
    {
        $this->pdo->commit();
    }

    public function rollback(): void
    {
        $this->pdo->rollBack();
    }

    private function bindValues(mixed $binds): void
    {
        $count = 1;
        foreach ($binds as $key => $value) {
            if (is_numeric($key)) {
                $this->bindValue($count, $value);
            } else {
                $this->bindValue($key, $value);
            }
            $count++;
        }
    }

    private function bindValue(int|string $key, mixed $value): void
    {
        if (is_string($value)) {
            $this->stmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        if (is_int($value)) {
            $this->stmt->bindValue($key, $value, PDO::PARAM_INT);
        }
        if (is_float($value)) {
            $this->stmt->bindValue($key, (string)$value, PDO::PARAM_STR);
        }
        if (is_bool($value)) {
            $this->stmt->bindValue($key, $value, PDO::PARAM_BOOL);
        }
        if (is_null($value)) {
            $this->stmt->bindValue($key, $value, PDO::PARAM_NULL);
        }
    }

    public function run(string $query, array $binds): void
    {
        $query = $this->cleanQuery($query);
        $this->connect();

        $this->stmt = $this->pdo->prepare($query);
        $this->bindValues($binds);

        $this->stmt->execute();
    }
}