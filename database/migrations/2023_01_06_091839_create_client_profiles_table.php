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
    public function up()
    {
        Schema::create('client_profiles', function (Blueprint $table) {
            $table->foreignUuid('client_id')->references('id')->on('clients')->restrictOnUpdate()->restrictOnUpdate();
            $table->primary('client_id')->nullable(false);
            $table->string('first_name')->nullable(false);
            $table->string('last_name')->nullable(false);
            $table->string('phone_number')->nullable(false);
            $table->string('city')->nullable(false);
            $table->string('street')->nullable();
            $table->string('street_number')->nullable();
            $table->string('region')->nullable();
            $table->string('block')->nullable();
            $table->string('postal_code')->nullable(false);
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
        Schema::dropIfExists('client_profiles');
    }
};
