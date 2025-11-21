  'use strict';

  // Global variables that are set and used
  // across the application
  let gl, program;
  
  // Global declarations of objects that you will be drawing
  var myTeapot = null;
  var myCone = null;
  var mySphere = null;
  var myPedestalLeft = null;
  var myPedestalRight = null;
  var myConeBase = null;
  var mySphereBase = null;
  var myTeapotBase = null;
  var myConeShaft = null;
  var mySphereShaft = null;
  var myTeapotShaft = null;
  var myConeBase2 = null;
  var mySphereBase2 = null;
  var myTeapotBase2 = null;


//
// A function that creates shapes to be drawn and creates a VAO for each
//
// We start you out with an example for the teapot.
//
function createShapes() {

    myTeapot = new Teapot();
    myTeapot.VAO = bindVAO (myTeapot);
    
    // Create cone for right side
    myCone = new Cone(12, 6);
    myCone.VAO = bindVAO(myCone);
    
    // Create sphere for left side
    mySphere = new Sphere(16, 16);
    mySphere.VAO = bindVAO(mySphere);
    
    // Create bases for cone and sphere
    myConeBase = new Cube(1);
    myConeBase.VAO = bindVAO(myConeBase);
    
    mySphereBase = new Cube(1);
    mySphereBase.VAO = bindVAO(mySphereBase);
    
    // Create base for teapot
    myTeapotBase = new Cube(1);
    myTeapotBase.VAO = bindVAO(myTeapotBase);
    
    // Create cylinder shafts under bases
    myConeShaft = new Cylinder(12, 2);
    myConeShaft.VAO = bindVAO(myConeShaft);
    
    mySphereShaft = new Cylinder(12, 2);
    mySphereShaft.VAO = bindVAO(mySphereShaft);
    
    myTeapotShaft = new Cylinder(12, 2);
    myTeapotShaft.VAO = bindVAO(myTeapotShaft);
    
    // Create secondary bases under cylinders
    myConeBase2 = new Cube(1);
    myConeBase2.VAO = bindVAO(myConeBase2);
    
    mySphereBase2 = new Cube(1);
    mySphereBase2.VAO = bindVAO(mySphereBase2);
    
    myTeapotBase2 = new Cube(1);
    myTeapotBase2.VAO = bindVAO(myTeapotBase2);
    
    // Create pedestals (made of cubes and cylinder)
    // Left pedestal
    myPedestalLeft = {
        base: new Cube(1),
        shaft: new Cylinder(12, 2),
        top: new Cube(1)
    };
    myPedestalLeft.base.VAO = bindVAO(myPedestalLeft.base);
    myPedestalLeft.shaft.VAO = bindVAO(myPedestalLeft.shaft);
    myPedestalLeft.top.VAO = bindVAO(myPedestalLeft.top);
    
    // Right pedestal
    myPedestalRight = {
        base: new Cube(1),
        shaft: new Cylinder(12, 2),
        top: new Cube(1)
    };
    myPedestalRight.base.VAO = bindVAO(myPedestalRight.base);
    myPedestalRight.shaft.VAO = bindVAO(myPedestalRight.shaft);
    myPedestalRight.top.VAO = bindVAO(myPedestalRight.top);
}


//
// Set up your camera and your projection matrices
//
function setUpCamera() {
    
    // set up your projection
    // perspective projection
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(projMatrix, radians(45), 1.0, 1.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    // tilted at 45 degrees
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 5, -12], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// Use this function to draw all of your shapes.
// Recall that VAOs should have been set up the call to createShapes()
// You'll have to provide a Model Matrix for each shape to be drawn that
// places the object in the world.
//
// An example is shown for placing the teapot
//
function drawShapes() {
    
    // Draw cone base
    let coneBaseMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneBaseMatrix, coneBaseMatrix, [-3.5, 0.4, 0]);
    glMatrix.mat4.scale(coneBaseMatrix, coneBaseMatrix, [2.2, 0.3, 2.2]);
    gl.uniformMatrix4fv(program.uModelT, false, coneBaseMatrix);
    gl.bindVertexArray(myConeBase.VAO);
    gl.drawElements(gl.TRIANGLES, myConeBase.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw cone shaft
    let coneShaftMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneShaftMatrix, coneShaftMatrix, [-3.5, -0.75, 0]);
    glMatrix.mat4.scale(coneShaftMatrix, coneShaftMatrix, [1.8, 2.5, 1.8]);
    gl.uniformMatrix4fv(program.uModelT, false, coneShaftMatrix);
    gl.bindVertexArray(myConeShaft.VAO);
    gl.drawElements(gl.TRIANGLES, myConeShaft.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw secondary cone base
    let coneBase2Matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneBase2Matrix, coneBase2Matrix, [-3.5, -2.1, 0]);
    glMatrix.mat4.scale(coneBase2Matrix, coneBase2Matrix, [2.2, 0.3, 2.2]);
    gl.uniformMatrix4fv(program.uModelT, false, coneBase2Matrix);
    gl.bindVertexArray(myConeBase2.VAO);
    gl.drawElements(gl.TRIANGLES, myConeBase2.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw cone on left
    let coneMatrixL = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneMatrixL, coneMatrixL, [-3.5, 1.3, 0]);
    glMatrix.mat4.scale(coneMatrixL, coneMatrixL, [1.7, 1.7, 1.7]);
    gl.uniformMatrix4fv(program.uModelT, false, coneMatrixL);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw center teapot base
    let teapotBaseMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(teapotBaseMatrix, teapotBaseMatrix, [0, 0.35, 0]);
    glMatrix.mat4.scale(teapotBaseMatrix, teapotBaseMatrix, [2.0, 0.3, 2.0]);
    gl.uniformMatrix4fv(program.uModelT, false, teapotBaseMatrix);
    gl.bindVertexArray(myTeapotBase.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapotBase.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw teapot shaft
    let teapotShaftMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(teapotShaftMatrix, teapotShaftMatrix, [0, -0.75, 0]);
    glMatrix.mat4.scale(teapotShaftMatrix, teapotShaftMatrix, [1.8, 2.5, 1.8]);
    gl.uniformMatrix4fv(program.uModelT, false, teapotShaftMatrix);
    gl.bindVertexArray(myTeapotShaft.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapotShaft.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw secondary teapot base
    let teapotBase2Matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(teapotBase2Matrix, teapotBase2Matrix, [0, -2.1, 0]);
    glMatrix.mat4.scale(teapotBase2Matrix, teapotBase2Matrix, [2.0, 0.3, 2.0]);
    gl.uniformMatrix4fv(program.uModelT, false, teapotBase2Matrix);
    gl.bindVertexArray(myTeapotBase2.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapotBase2.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw center teapot
    let teapotMatrix = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(teapotMatrix, teapotMatrix, radians(180.0));
    glMatrix.mat4.translate(teapotMatrix, teapotMatrix, [0, 0.5, 0]);
    gl.uniformMatrix4fv(program.uModelT, false, teapotMatrix);
    gl.bindVertexArray(myTeapot.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapot.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw sphere base
    let sphereBaseMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(sphereBaseMatrix, sphereBaseMatrix, [3.5, 0.4, 0]);
    glMatrix.mat4.scale(sphereBaseMatrix, sphereBaseMatrix, [2.2, 0.3, 2.2]);
    gl.uniformMatrix4fv(program.uModelT, false, sphereBaseMatrix);
    gl.bindVertexArray(mySphereBase.VAO);
    gl.drawElements(gl.TRIANGLES, mySphereBase.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw sphere shaft
    let sphereShaftMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(sphereShaftMatrix, sphereShaftMatrix, [3.5, -0.75, 0]);
    glMatrix.mat4.scale(sphereShaftMatrix, sphereShaftMatrix, [1.8, 2.5, 1.8]);
    gl.uniformMatrix4fv(program.uModelT, false, sphereShaftMatrix);
    gl.bindVertexArray(mySphereShaft.VAO);
    gl.drawElements(gl.TRIANGLES, mySphereShaft.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw secondary sphere base
    let sphereBase2Matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(sphereBase2Matrix, sphereBase2Matrix, [3.5, -2.1, 0]);
    glMatrix.mat4.scale(sphereBase2Matrix, sphereBase2Matrix, [2.2, 0.3, 2.2]);
    gl.uniformMatrix4fv(program.uModelT, false, sphereBase2Matrix);
    gl.bindVertexArray(mySphereBase2.VAO);
    gl.drawElements(gl.TRIANGLES, mySphereBase2.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw sphere on right
    let sphereMatrixR = glMatrix.mat4.create();
    glMatrix.mat4.translate(sphereMatrixR, sphereMatrixR, [3.5, 1.3 , 0]);
    glMatrix.mat4.scale(sphereMatrixR, sphereMatrixR, [1.7, 1.7, 1.7]);
    gl.uniformMatrix4fv(program.uModelT, false, sphereMatrixR);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);
}

//
// Helper function to draw a pedestal at the given x position
//
function drawPedestal(pedestal, xPos) {
    // Draw base
    let baseMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(baseMatrix, baseMatrix, [xPos, -0.5, 0]);
    glMatrix.mat4.scale(baseMatrix, baseMatrix, [0.6, 0.2, 0.6]);
    gl.uniformMatrix4fv(program.uModelT, false, baseMatrix);
    gl.bindVertexArray(pedestal.base.VAO);
    gl.drawElements(gl.TRIANGLES, pedestal.base.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw shaft (cylinder)
    let shaftMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(shaftMatrix, shaftMatrix, [xPos, 0.25, 0]);
    glMatrix.mat4.scale(shaftMatrix, shaftMatrix, [1, 1, 1]);
    gl.uniformMatrix4fv(program.uModelT, false, shaftMatrix);
    gl.bindVertexArray(pedestal.shaft.VAO);
    gl.drawElements(gl.TRIANGLES, pedestal.shaft.indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Draw top
    let topMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(topMatrix, topMatrix, [xPos, 1.0, 0]);
    glMatrix.mat4.scale(topMatrix, topMatrix, [0.6, 0.2, 0.6]);
    gl.uniformMatrix4fv(program.uModelT, false, topMatrix);
    gl.bindVertexArray(pedestal.top.VAO);
    gl.drawElements(gl.TRIANGLES, pedestal.top.indices.length, gl.UNSIGNED_SHORT, 0);
}

///////////////////////////////////////////////////////////////////
//
//   You shouldn't have to edit below this line
//
///////////////////////////////////////////////////////////////////

  // Given an id, extract the content's of a shader script
  // from the DOM and return the compiled shader
  function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
      return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Create a program with the appropriate vertex and fragment shaders
  function initProgram() {
    const vertexShader = getShader('vertex-shader');
    const fragmentShader = getShader('fragment-shader');

    // Create a program
    program = gl.createProgram();
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
  }

  // creates a VAO and returns its ID
  function bindVAO (shape) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
      
      // create and bind bary buffer
      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aBary);
      gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
    
  }

  
  // We call draw to render to our canvas
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }


    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initProgram();
    
    // create and bind your current object
    createShapes();
    
    // set up your camera
    setUpCamera();
    
    // do a draw
    draw();
  }
