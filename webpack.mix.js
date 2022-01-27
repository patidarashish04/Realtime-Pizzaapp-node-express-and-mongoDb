// webpack.mix.js

const mix = require('laravel-mix');


        //# file to compile    //# where to store
//!               |                   |
mix.js('resources/js/app.js', 'Public/js/app.js')
   .sass('resources/scss/app.scss', 'Public/css/app.css');
