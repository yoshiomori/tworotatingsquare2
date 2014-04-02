
var canvas;
var gl;

var program;
var theta = 0.0
var gama = 0.0

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Associate out shader variables with our data buffer
    program.vPosition = gl.getAttribLocation( program, "aVertexPosition" );
    gl.enableVertexAttribArray( program.vPosition );
    program.mMatrixUniform = gl.getUniformLocation(program, "uMMatrix");
    program.ScaleMatrixUniform = gl.getUniformLocation(program, "ScaleMatrix");
    program.TransMatrixUniform = gl.getUniformLocation(program, "TransMatrix");

     var vertices = [
        vec4(  0,  1, 0, 1 ),
        vec4(  1,  0, 0, 1 ),
        vec4( -1,  0, 0, 1 ),
        vec4(  0, -1, 0, 1 )
    ];
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl.vertexAttribPointer( program.vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);


    render();
};


function render() {
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta += 0.1;
    c = Math.cos(theta);
    s = Math.sin(theta);
    var vMatrix = [
	vec4( c, s, 0, 0),
	vec4(-s, c, 0, 0),
	vec4( 0, 0, 1, 0),
	vec4( 0, 0, 0, 1)
    ];
    gl.uniformMatrix4fv(program.mMatrixUniform, false, flatten(vMatrix));

    var vMatrix = [
	vec4(0.5, 0, 0, 0),
	vec4(0, 0.5, 0, 0),
	vec4(0, 0, 1, 0),
	vec4(0, 0, 0, 1)
    ];

    gl.uniformMatrix4fv(program.ScaleMatrixUniform, false, flatten(vMatrix));

    var vMatrix = [
	vec4(1  , 0, 0, 0),
	vec4(0  , 1, 0, 0),
	vec4(0  , 0, 1, 0),
	vec4(-0.5, 0, 0, 1)
    ];

    gl.uniformMatrix4fv(program.TransMatrixUniform, false, flatten(vMatrix));

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gama -= 0.1;
    c = Math.cos(gama);
    s = Math.sin(gama);
    var vMatrix = [
	vec4( c, s, 0, 0),
	vec4(-s, c, 0, 0),
	vec4( 0, 0, 1, 0),
	vec4( 0, 0, 0, 1)
    ];
    gl.uniformMatrix4fv(program.mMatrixUniform, false, flatten(vMatrix));

    var vMatrix = [
	vec4(0.5, 0, 0, 0),
	vec4(0, 0.5, 0, 0),
	vec4(0, 0, 1, 0),
	vec4(0, 0, 0, 1)
    ];

    gl.uniformMatrix4fv(program.ScaleMatrixUniform, false, flatten(vMatrix));

    var vMatrix = [
	vec4(1  , 0, 0, 0),
	vec4(0  , 1, 0, 0),
	vec4(0  , 0, 1, 0),
	vec4(0.5, 0, 0, 1)
    ];

    gl.uniformMatrix4fv(program.TransMatrixUniform, false, flatten(vMatrix));

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    window.requestAnimFrame(render);
}
