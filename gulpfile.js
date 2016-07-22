var gulp = require( 'gulp' );
var bower = require( 'gulp-bower' );
var concat = require( 'gulp-concat' );
var sass = require( 'gulp-sass' );

var bowerDir = 'bower';

var styles = {
    includes : [ bowerDir + '/bootstrap-sass/assets/stylesheets' ],
    src : [ bowerDir + '/font-awesome/scss/font-awesome.scss', 'src/bootstrap-import.scss', 'src/css/**/*.scss' ]
}

var dest = {
    bower : {
        path : bowerDir
    },
    css : {
        path : 'dist/css',
        filename : 'main.css'
    }
};

gulp.task( 'bower', function() {
    return bower().pipe( gulp.dest( dest.bower.path ) );
} );

gulp.task( 'css', [ 'bower' ], function() {
    var sassStream = sass( {
        includePaths : styles.includes
    } );

    sassStream.on( 'error', function( e ) {
        console.log( e.message )
    } );

    return gulp.src( styles.src ).pipe( sassStream ).pipe( concat( dest.css.filename ) ).pipe( gulp.dest( dest.css.path ) );

} );

gulp.task( 'default', [ 'css' ] );
