var gulp = require( 'gulp' ), bower = require( 'gulp-bower' ), less = require( 'gulp-less' );

var config = {
	bowerDir : './bower_components',
	lessInput : './src/less/mmdb-bootstrap.less',
	lessOutput : './dist/css/'
}

gulp.task( 'bower', function() {
    return bower().pipe( gulp.dest( config.bowerDir ) )
} );

gulp.task( 'less', function () {  
  gulp.src( config.lessInput ).pipe( less() ).pipe( gulp.dest( config.lessOutput ) );
} );

gulp.task( 'default', [ 'bower', 'less' ] );