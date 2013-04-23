/**
 * Sample object for handling a mesh.
 */

var sampleobject;

(function () {
    var gl, pl, program;
    var buffers = {}, attributes = {}, textures = {};
    var rotation = 0;

    function initBuffers () {
        var obj = teapot_mesh;

        // Vertex buffer
        buffers.vertex = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.vertices), gl.STATIC_DRAW);
        buffers.vertex.itemSize = 3;
        buffers.vertex.numItems = obj.vertices.length / 3;

        // Vertex index (faces) buffer
        buffers.indices = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.faces), gl.STATIC_DRAW);
        buffers.indices.itemSize = 3;
        buffers.indices.numItems = obj.faces.length / 3;

        // Normal vectors buffer
        // buffers.normals = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals);
        // gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
        // buffers.normals.itemSize = 3;
        // buffers.normals.numItems = normals.length / 3;
    }

    function initShader () {
        var vertexShader = createShaderFromScriptElement(gl, 'shader-v');
        var fragmentShader = createShaderFromScriptElement(gl, 'shader-f');
        program = createProgram(gl, [vertexShader, fragmentShader]);

        attributes.positions = gl.getAttribLocation(program, 'aVertexPosition');
        attributes.normals = gl.getAttribLocation(program, 'aVertexNormal');
    }

    function init (_gl, _pl) {
        gl = _gl;
        pl = _pl;

        initBuffers();
        initShader();
    }

    function draw (uniforms) {
        gl.useProgram(program);
        pl.shader = program;
        // gl.enableVertexAttribArray(attributes.normals);
        gl.enableVertexAttribArray(attributes.positions);

        // Model transformations here
        pl.translate(0, 0, -10);
        pl.rotate(rotation, [0, 1, 0]);
        rotation += 1;

        // Hook up the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
        gl.vertexAttribPointer(attributes.positions, buffers.vertex.itemSize, gl.FLOAT, false, 0, 0);

        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals);
        // gl.vertexAttribPointer(attributes.normals, buffers.normals.itemSize, gl.FLOAT, false, 0, 0);

        pl.prepareDraw();

        // assign uniforms here
        // uniforms.uSomething = something;
        pl.setUniforms(uniforms);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        gl.drawElements(gl.TRIANGLES, buffers.indices.numItems * buffers.indices.itemSize, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // gl.disableVertexAttribArray(attributes.normals);
        gl.disableVertexAttribArray(attributes.positions);
    }

    sampleobject = {
        init: init,
        draw: draw
    };

})();