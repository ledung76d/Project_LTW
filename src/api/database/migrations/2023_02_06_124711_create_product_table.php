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
        Schema::create('product', function (Blueprint $table) {
            $table->increments('pid');
            $table->string('title', 50);
            $table->decimal('price', 7, 2);
            $table->integer('quantity')->default(0);
            $table->string('sid', 50);
            $table->timestamps();
            $table->integer('discount')->default(0);
            $table->text('img');
            $table->text('content')->nullable();
            $table->string('unit', 20);
            $table->enum('status', ['active', 'inactive'])->default('active');

            $table->foreign('sid')->references('sid')->on('store')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
