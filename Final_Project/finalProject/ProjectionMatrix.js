class ProjectionMatrix {

	static orthographic(left, right, bottom, top, near, far) {
		let l = left, r = right, b = bottom, t = top, n = near, f = far;

		let tx = -((r + l) / (r - l));
		let ty = -((t + b) / (t - b));
		let tz = (f + n) / (f - n);
		return [
			2 / (r - l), 0, 0, 0,
			0, 2 / (t - b), 0, 0,
			0, 0, 2 / (n - f), 0,
			tx, ty, tz, 1
		];
	}

	static axonometric(y, x) {
		let m = Matrix.identity;
		m = Matrix.rotateY(m, y);
		m = Matrix.rotateX(m, x);
		return m;
	}

	static axonometric_isometric() {
		let m = Matrix.identity;
		m = Matrix.rotateY(m, 45);
		m = Matrix.rotateX(m, -35.264);
		return m;
	}

	static oblique(topAngle, sideAngle) {
		let t = Angle.degreesToRadians(topAngle);
		let p = Angle.degreesToRadians(sideAngle);
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			-cot(t), -cot(p), 1, 0,
			0, 0, 0, 1
		];
	}

	static perspective_1_point(d) {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 1/d,
			0, 0, 0, 1
		];
	}

	static perspective_2_point(angle, d) {
		let radians = Angle.degreesToRadians(angle);

		let sin = Math.sin;
		let cos = Math.cos;

		return [
			1, 0, 0, sin(radians)/d,
			0, 1, 0, 0,
			0, 0, 1, cos(radians)/d,
			0, 0, 0, 1
		];
	}

	static perspective_3_point(angle1, angle2, d) {
		angle1 = Angle.degreesToRadians(angle1);
		angle2 = Angle.degreesToRadians(angle2);

		let sin = Math.sin;
		let cos = Math.cos;

		let tx = sin(angle1)/d;
		let ty = cos(angle1)*sin(angle2)/d;
		let tz = cos(angle1)*cos(angle2)/d;

		return [
			1, 0, 0, tx,
			0, 1, 0, -ty,
			0, 0, 1, tz,
			0, 0, 0, 1
		];
	}
}

function cot(a) {
	return 1 / Math.tan(a);
}