<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddTestTable extends AbstractMigration
{
    public function up(): void
    {
        $this->table('test_table')
            ->addColumn('test_content', 'string')
            ->create();
    }

    public function down(): void
    {
        $this->table('test_table')
            ->drop()
            ->save();
    }
}
