<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class List extends Model
{
    //
    public function user() {
    	return $this->hasMany('app\User');
    }
}
