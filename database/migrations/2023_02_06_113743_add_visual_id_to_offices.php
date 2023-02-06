<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() : void
    {
        DB::statement('ALTER TABLE offices ADD `visual_id` INT NOT NULL AUTO_INCREMENT UNIQUE;');
        DB::statement('UPDATE offices SET visual_id = visual_id + 1000;');
        DB::statement('ALTER TABLE offices AUTO_INCREMENT = 1000;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() : void
    {
        Schema::table('offices', function (Blueprint $table) {
            $table->dropColumn('visual_id');
        });
    }
};
