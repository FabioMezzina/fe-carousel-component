
let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist/js')
.sass('src/scss/app.scss', 'css')
.setPublicPath('dist');