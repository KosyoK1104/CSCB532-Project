<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('CREATE TRIGGER offices_bi_insert
                        BEFORE INSERT ON offices
                        FOR EACH ROW
                        BEGIN
                            SET @last_id := (SELECT MAX(SUBSTR(visual_id, 4)) FROM offices);
                            SET @last_id := IFNULL(@last_id, 0);
                            SET NEW.visual_id := CONCAT("OF-", LPAD(@last_id + 1, 7, "0"));
                        END');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS offices_bi_insert');
    }
};
