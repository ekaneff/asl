<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function list() {
    	return $this->belongsTo('app\List');
    }
}
