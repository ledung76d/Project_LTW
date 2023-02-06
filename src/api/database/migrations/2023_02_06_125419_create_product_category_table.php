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
        Schema::create('product_category', function (Blueprint $table) {
            $table->integer('pid')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->timestamps();
            $table->primary(['pid', 'category_id']);
            $table->foreign('category_id')->references('id')->on('category')->onDelete('cascade');
            $table->foreign('pid')->references('pid')->on('product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_category');
    }
};
