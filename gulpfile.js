var gulp = require( 'gulp' );
var bower = require( 'gulp-bower' );
var concat = require( 'gulp-concat' );
var sass = require( 'gulp-sass' );

var bowerDir = 'bower';

var srcDir = 'src';
var distDir = 'dist';

var fonts = {
    src : [ bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/*' ]
}

var icons = {
    src : [ bowerDir + '/font-awesome/fonts/*' ]
}

var styles = {
    includes : [ bowerDir + '/bootstrap-sass/assets/stylesheets' ],
    src : [ bowerDir + '/font-awesome/scss/font-awesome.scss', 'src/bootstrap-import.scss', 'src/css/**/*.scss' ]
}

var dest = {
    bower : {
        path : bowerDir
    },
    fonts : {
        path : 'dist/fonts/bootstrap'
    },
    icons : {
        path : 'dist/fonts'
    },
    js : {
        path : 'dist/js'
    },
    styles : {
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

    return gulp.src( styles.src ).pipe( sassStream ).pipe( concat( dest.styles.filename ) ).pipe( gulp.dest( dest.styles.path ) );

} );

gulp.task( 'fonts', [ 'bower' ], function() {
    return gulp.src( fonts.src ).pipe( gulp.dest( dest.fonts.path ) );
} );

gulp.task( 'icons', [ 'bower' ], function() {
    return gulp.src( icons.src ).pipe( gulp.dest( dest.icons.path ) );
} );

gulp.task( 'default', [ 'css', 'fonts', 'icons' ] );
