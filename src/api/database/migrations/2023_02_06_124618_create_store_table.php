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
        Schema::create('store', function (Blueprint $table) {
            $table->string('sid', 50)->primary();
            $table->string('address', 255)->nullable();
            $table->char('phone', 10);
            $table->string('store_name', 50);
            $table->text('picture')->nullable();
            $table->text('logo')->nullable();
            $table->text('content')->nullable();
            $table->timestamps();
            $table->foreign('sid')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('store');
    }
};
