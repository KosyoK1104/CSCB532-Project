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
        Schema::create('packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tracking_number')->unique();
            $table->uuid('office_id')->nullable();
            $table->uuid('client_id')->nullable();
            $table->foreign('office_id')->references('id')->on('offices')->restrictOnDelete()->restrictOnUpdate();
            $table->foreign('client_id')->references('id')->on('clients')->restrictOnDelete()->restrictOnUpdate();
            $table->string('delivery_type'); //this should be enum
            $table->string('status'); //this should be enum
            $table->double('price')->unsigned();
            $table->double('weight')->unsigned();

            $table->string('recipient_name');
            $table->string('recipient_phone_number')->nullable(false);
            $table->string('recipient_address')->nullable();


            $table->integer('created_at')->unsigned();
            $table->integer('updated_at')->unsigned();



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() : void
    {
        Schema::dropIfExists('packages');
    }
};
