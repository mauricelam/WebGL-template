/**
 * The entry point of all the code. This is the place where it all starts. Performs the
 * initialization and glues different parts of code together.
 */

(function () {
    var canvas, gl, pl;

    var lastDraw;
    var fps = document.querySelector('#fps');

    var frameRequested = false;

    function initGL () {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        sampleobject.init(gl, pl);

        frameRequested = frameRequested || window.requestAnimFrame(drawScene);
    }

    function init () {
        canvas = document.querySelector('#canvas');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        try {
            gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            gl.viewport(0, 0, canvas.width, canvas.height);
        } catch (e) {}
        if (!gl) alert('Error: Could not initialize WebGL. Perhaps your browser does not support it. Try using Chrome instead. ');
        pl = Object.create(Pipeline);
        pl.gl = gl;
        initGL();
    }

    var uniforms = {};

    /**
     * Draw scene function. Executed on every frame.
     */
    function drawScene() {
        var drawTime = performance.now();

        // Update the FPS, but not on every frame
        if (lastDraw && drawTime % 4 < 1) { fps.textContent = Math.round(1000/(drawTime - lastDraw)); }
        lastDraw = drawTime;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Actual draw
        pl.perspective(60, canvas.width / canvas.height, 0.1, 100.0);
        pl.loadIdentity();

        sampleobject.draw(uniforms);

        // request next frame
        window.requestAnimFrame(drawScene);
    }

    /**
     * Event handlers
     */

    function resize () {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }

    window.addEventListener('resize', resize);
    document.addEventListener('DOMContentLoaded', init);

})();