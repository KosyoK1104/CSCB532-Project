<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('offices', function (Blueprint $table) {
            //TODO make this auto_increment without it to be primary key
//            $table->integer('visual_id')->unsigned()->unique()->startingValue(1000);
            $table->string('name');
            $table->string('city');
            $table->string('address');
            $table->integer('created_at')->unsigned();
            $table->integer('updated_at')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('offices', function (Blueprint $table) {
//            $table->dropColumn('visual_id');
            $table->dropColumn('name');
            $table->dropColumn('city');
            $table->dropColumn('address');
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
    }
};
