class Face extends Transformable {
	constructor(vertices) {
		super();

		this.vertices3D = [];
		this.vertices = [];
		if (vertices) {
			this._addVertices(vertices);
		}

		this.fill = true;
	}

	_addVertex(vertex3D) {
		this.vertices3D.push(vertex3D);
		this.vertices = this.vertices.concat(vertex3D.toArray());
	}

	_addVertices(vertices3D) {
		let _this = this;
		vertices3D.forEach(function (vertex3D) {
			_this._addVertex(vertex3D);
		});
	}

	_getTransformation(extraTransformation) {
		let transformation = this.transformation;
		if (extraTransformation) {
			transformation = Matrix.multiply(transformation, extraTransformation);
		}
		return transformation;
	}

	getTriangleVertices() {
		let triangleVertices = [];
		let v = this.vertices;
		let vIndices = [];

		if (v.length === 4 * 3) {
			vIndices = vIndices.concat([0,1,2]);
			vIndices = vIndices.concat([2,3,0]);
		}
		else if (v.length === 5 * 3) {
			vIndices = vIndices.concat([0,1,2]);
			vIndices = vIndices.concat([2,3,4]);
			vIndices = vIndices.concat([0,2,4]);
		}
		else {
			throw 'not supported';
		}
		vIndices.forEach(function (i) {
			triangleVertices = triangleVertices.concat(v.slice(i*3, i*3 + 3));
		});
		return triangleVertices;
	}

	_size() {
		return this.vertices.length / 3;
	}

	draw(canvas, color, extraTransformation) {
		let transformation = this._getTransformation(extraTransformation);
		if (this.fill) {
			if (this._size() > 2) {
				canvas.drawTriangles(this.getTriangleVertices(), color, transformation);
			}
		}
		canvas.drawLineLoop(this.vertices, [0, 0, 0, 1], transformation);

	}

	static drawAll(all, canvas, color, extraTransformation) {
		all.forEach(function (face) {
			face.draw(canvas, color, extraTransformation);
		});
	}

	copy() {
		let f = new Face();
		f.vertices3D = this.vertices3D.slice();
		f.vertices = this.vertices.slice();
		f.transformation = this.transformation.slice();
		f.fill = this.fill;
		return f;
	}
}