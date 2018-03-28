class MyCanvas {
	constructor(canvasId, width, height, depth) {
		this.width = width;
		this.height = height;
		this.depth = depth;

		this.canvas = this.setupCanvas(canvasId, width, height);
		this.resolutionMatrix = this.setupResolutionMatrix();

		this.setupWebGL();
	}

	setupCanvas(id, width, height) {
		let canvas = document.getElementById(id);
		canvas.setAttribute("height", width+"");
		canvas.setAttribute("width", height+"");
		return canvas;
	}

	setupResolutionMatrix() {
		let w = this.width;
		let h = this.height;
		let d = this.depth;
		return [
			 2 / w, 0,     0,     0,
			 0,     2 / h, 0,     0,
			 0,     0,     2 / d, 0,
			-1,     1,     0,     1
		];
	}

	glOrtho(left, right, bottom, top, near, far) {
		let l = left, r = right, b = bottom, t = top, n = near, f = far;
		return [2 / (r - l), 0, 0, 0,
			0, 2 / (t - b), 0, 0,
			0, 0, 2 / (n - f), 0,
			-((r + l) / (r - l)), -((t + b) / (t - b)), (f + n) / (f - n), 1];
	}

	clearAll() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	_draw(mode, vertices, color, transformationMatrix) {
		let transformation = Matrix.multiply(transformationMatrix, this.resolutionMatrix);
		this.gl.uniformMatrix4fv(this.matrixLocation, false, transformation);
		this.gl.uniform4fv(this.colorLocation, color);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		this.gl.drawArrays(mode, 0, vertices.length / 3);
	}

	drawLineLoop(vertices, color, transformationMatrix) {
		this._draw(this.gl.LINE_LOOP, vertices, color, transformationMatrix);
	}

	drawTriangles(vertices, color, transformationMatrix) {
		this._draw(this.gl.TRIANGLES, vertices, color, transformationMatrix);
	}

	setupWebGL() {
		let gl = this.canvas.getContext("webgl");

		let vs =
			"attribute vec3 position;"
			+ "uniform mat4 matrix;"
			+ "void main() { gl_Position = matrix * vec4(position, 1.0); }";

		let fs =
			"precision mediump float;" +
			"uniform vec4 color;" +
			"void main() { gl_FragColor = color; }";

		let program = gl.createProgram();
		let addShader = function (type, source) {
			let shader = gl.createShader((type === 'vertex') ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				throw "Could not compile " + type + " shader:\n\n" + gl.getShaderInfoLog(shader);
			gl.attachShader(program, shader);
		};
		addShader('vertex', vs);
		addShader('fragment', fs);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS))
			throw "Could not link the shader program!";
		gl.useProgram(program);


		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

		let positionLocation = gl.getAttribLocation(program, "position");
		let colorLocation = gl.getUniformLocation(program, 'color');
		let matrixLocation = gl.getUniformLocation(program, "matrix");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

		this.gl = gl;
		this.colorLocation = colorLocation;
		this.matrixLocation = matrixLocation;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
	}

	drawCoordinatesXY(unit) {
		if (!unit) {
			unit = 1;
		}
		let x = new Face();
		x.vertices = [-1*unit,0,0,  1*unit,0,0];
		x.draw(this, Matrix.identity);
		let y = new Face();
		y.vertices = [0,-unit,0,  0,unit,0];
		y.draw(this, Matrix.identity);
	}

	drawGrids(n) {
		let unit = this.height;
		for (let i = 1; i < n; i++) {
			let curr = unit / n * i;
			let x = new Face();
			let z = unit/2;
			x.vertices = [0,-curr,z,  unit,-curr,z];
			x.draw(this, Matrix.identity);
			let y = new Face();
			y.vertices = [curr,0,z,  curr,-unit,z];
			y.draw(this, Matrix.identity);
		}
	}

	drawCube(transformation) {
		let front = new Face();

		let unit = this.height/8;
		front.vertices = [-1*unit,-1*unit,-1*unit,  -1*unit,1*unit,-1*unit,  1*unit,1*unit,-1*unit,  1*unit,-1*unit,-1*unit];

		front.transformation = transformation;
		// front.fill = false;

		// front.draw(this, Matrix.identity);

		let back = front.copy();
		back.translateZ(-unit*2);
		// back.draw(this, Matrix.identity);
	}
}