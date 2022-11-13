<?php

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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->foreignUlid('user_id')->references('id')->on('users')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->addColumn('integer', 'created_on', ['length' => 10, 'signed' => false]);
            $table->addColumn('integer', 'updated_on', ['length' => 10, 'null' => true, 'signed' => false]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() : void
    {
        Schema::dropIfExists('user_profiles');
    }
};
