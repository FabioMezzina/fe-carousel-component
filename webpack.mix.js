
let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist/js')
.sass('src/scss/carousel.scss', 'css')
.sass('src/scss/style.scss', 'css')
.setPublicPath('dist');