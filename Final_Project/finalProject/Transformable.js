
class Transformable {
	constructor() {
		this.resetTransformation();
	}

	resetTransformation() {
		this.transformation = Matrix.identity;
	}

	translate(vertex3D) {
		this.transformation = Matrix.translate(this.transformation, vertex3D);
		return this;
	}
	translateX(x) { return this.translate(new Vertex3D(x,0,0)); }
	translateY(y) { return this.translate(new Vertex3D(0,y,0)); }
	translateZ(z) { return this.translate(new Vertex3D(0,0,z)); }

	rotateX(degrees) {
		this.transformation = Matrix.rotateX(this.transformation, degrees);
		return this;
	}

	rotateY(degrees) {
		this.transformation = Matrix.rotateY(this.transformation, degrees);
		return this;
	}

	rotateZ(degrees) {
		this.transformation = Matrix.rotateZ(this.transformation, degrees);
		return this;
	}

	scale(factor) {
		this.transformation = Matrix.scale(this.transformation, factor);
		return this;
	}

	shearXY(shearX, shearY) {
		this.transformation = Matrix.shearXY(this.transformation, shearX, shearY);
		return this;
	}

	shearXYZ(shearX, shearY, shearZ) {
		this.transformation = Matrix.shearXYZ(this.transformation, shearX, shearY, shearZ);
		return this;
	}

	applyMatrix(m) {
		this.transformation = Matrix.multiply(this.transformation, m);
		return this;
	}

	transformPlaneXY_array(t) {
		let dx = t[0], dy = t[1], rotation = t[2], scale = t[3], shearX = t[4], shearY = t[5];
		this.transformPlaneXY(dx, dy, rotation, scale, shearX, shearY)
	}
	transformPlaneXY(dx, dy, rotation, scale, shearX, shearY) {
		this.scale(scale);
		this.shearXY(shearX, shearY);
		this.rotateZ(rotation);
		this.translate(new Vertex3D(dx, dy, 0));
	}

	transformPlaneXYZ_array(t) {
		let dx = t[0], dy = t[1], dz = t[2], rotation = t[3], scale = t[4], shearX = t[5], shearY = t[6], shearZ = t[7];
		this.transformPlaneXYZ(dx, dy, dz, rotation, scale, shearX, shearY, shearZ);
	}
	transformPlaneXYZ(dx, dy, dz, rotation, scale, shearX, shearY, shearZ) {
		this.scale(scale);
		this.shearXY(shearX, shearY, shearZ);
		this.rotateZ(rotation);
		this.translate(new Vertex3D(dx, dy, dz, 0));
	}	
}