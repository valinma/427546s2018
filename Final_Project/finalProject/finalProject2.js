class projectionDrawer {
	constructor() {
		this.canvasWidth = 900;
		this.canvasHeight = 900;
		this.canvasDepth = 900;

		// this.canvas = this._setupCanvas();
		this.canvas = new MyCanvas("canvas2", this.canvasWidth, this.canvasHeight, this.canvasDepth);
		this.form = this._setupForm();

		new CanvasManipulation(this.canvas.canvas, this.form, this);
	}
	_setupForm() {
		let form = document.forms[0];
		let _this = this;
		form.onsubmit = function(event) {
			event.preventDefault();
			_this.drawHouseFromUserInput();
		};
		return form;
	}
	drawHouseFromUserInput() {
		let values = {};
		values.all = Inputs.floatValues(this.form);
		values.houseSpec = values.all.slice(0, 3);
		values.obliqueAdjustment = values.all.slice(29, 31);

		// clear canvas
		this.canvas.clearAll();
		// while (this.canvas.lastChild) { this.canvas.removeChild(canvas.lastChild); }

		// this.canvas.drawCoordinatesXY(this.canvasWidth/2);
		//this.canvas.drawGrids(2);

		this._drawHouse(
			this.canvas,
			values.houseSpec,
			values.obliqueAdjustment
		);
	}

	_drawHouse(
		canvas,
		houseSpec,
		obliqueAdjustment
	) {
		// let width = canvas.clientWidth/2, height = canvas.clientHeight/2, depth = canvas.clientWidth/2;
		let width = houseSpec[0], height= houseSpec[1], depth = houseSpec[2];
		let roofHeight = height / 2;

		let house = new House(width, height, depth, roofHeight);


		/** axonometric_dimetric **/
		house.applyMatrix(ProjectionMatrix.axonometric(45, -10));
		house.translate(new Vertex3D(this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);
		// this.canvas.drawCube(house.transformation);
		// this.canvas.drawCube(Matrix.identity);

		/** axonometric_trimetric **/
		house.resetTransformation();
		house.applyMatrix(ProjectionMatrix.axonometric(60, -30));
		house.translate(new Vertex3D(this.canvasWidth/4*3, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** oblique **/
		house.resetTransformation();
		house.applyMatrix(ProjectionMatrix.oblique(90+obliqueAdjustment[0], 90+obliqueAdjustment[1]));
		house.translate(new Vertex3D(this.canvasWidth/4*2, -this.canvasHeight/4*3, 0));
		house.draw(canvas);
	}
}

new projectionDrawer().drawHouseFromUserInput();