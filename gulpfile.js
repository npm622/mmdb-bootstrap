var gulp = require( 'gulp' );
var bower = require( 'gulp-bower' );
var less = require( 'gulp-less' );
var rename = require( 'gulp-rename' );

var config = {
	bowerDir : './bower_components',
	lessInput : './src/less/mmdb-bootstrap.less',
	lessOutput : './dist/css/',
	jsOutput : './dist/js/',
	fontFiles : './bower_components/bootstrap/dist/fonts/**'

}

gulp.task( 'bower', function() {
	return bower().pipe( gulp.dest( config.bowerDir ) )
} );

gulp.task( 'bootstrap', [ 'bower' ], function() {
	gulp.src( [ '/bootstrap/dist/js/bootstrap.js', '/jquery/dist/jquery.js' ].map( function(e) {
		return config.bowerDir + e;
	} ) ).pipe( rename( {
		dirname : '',
		prefix : 'mmdb-'
	} ) ).pipe( gulp.dest( config.jsOutput ) );
} );

gulp.task( 'less', [ 'bower' ], function() {
	gulp.src( config.lessInput ).pipe( less() ).pipe( gulp.dest( config.lessOutput ) );
} );

gulp.task( 'fonts', [ 'bower' ], function() {
	gulp.src( [config.fontFiles] ).pipe( gulp.dest( 'dist/fonts/' ) );
} );

gulp.task( 'default', [ 'bower', 'bootstrap', 'less', 'fonts' ] );
