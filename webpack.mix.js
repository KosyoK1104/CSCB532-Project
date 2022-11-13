let mix = require('laravel-mix');


mix.js('resources/js/index.js', 'public/js/app.js')
    .react({extractStyles: 'public/css/app.css'})
