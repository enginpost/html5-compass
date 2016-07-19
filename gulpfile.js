var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    
    browserSync.init({
        server: { baseDir: "./site/" },
        https: true
    });

    gulp.watch('site/*.html').on('change', browserSync.reload);
    gulp.watch('site/styles/*.css').on('change', browserSync.reload);
    gulp.watch('site/scripts/*.js').on('change', browserSync.reload);
    gulp.watch('site/images/*').on('change', browserSync.reload);
});

gulp.task('default',['serve']);