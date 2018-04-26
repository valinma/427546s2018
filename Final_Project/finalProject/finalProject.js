class HouseDrawer {
	constructor() {
		this.canvasWidth = 1100;
		this.canvasHeight = 1100;
		this.canvasDepth = 1100;

		// this.canvas = this._setupCanvas();
		this.canvas = new MyCanvas("canvas", this.canvasWidth, this.canvasHeight, this.canvasDepth);
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
		values.frontTransformation = values.all.slice(3, 9);
		values.sideTransformation = values.all.slice(9, 15);
		values.topTransformation = values.all.slice(15, 21);
		values.isoTransforamtion = values.all.slice(21, 29);

		// clear canvas
		this.canvas.clearAll();
		// while (this.canvas.lastChild) { this.canvas.removeChild(canvas.lastChild); }

		// this.canvas.drawCoordinatesXY(this.canvasWidth/2);
		this.canvas.drawGrids(2);

		this._drawHouse(
			this.canvas,
			values.houseSpec,
			values.frontTransformation,
			values.sideTransformation,
			values.topTransformation,
			values.isoTransforamtion
		);
	}

	_drawHouse(
		canvas,
		houseSpec,
		frontTransformation, sideTransformation, topTransformation, isoTransforamtion
	) {
		// let width = canvas.clientWidth/2, height = canvas.clientHeight/2, depth = canvas.clientWidth/2;
		let width = houseSpec[0], height= houseSpec[1], depth = houseSpec[2];
		let roofHeight = height / 2;

		let house = new House(width, height, depth, roofHeight);

		/** front **/
		house.transformPlaneXY_array(frontTransformation);
		house.translate(new Vertex3D(this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** side **/
		house.resetTransformation();
		house.rotateY(90);
		house.transformPlaneXY_array(sideTransformation);
		house.translate(new Vertex3D(this.canvasWidth/4*3, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** top **/
		house.resetTransformation();
		house.rotateX(-90);
		house.transformPlaneXY_array(topTransformation);
		house.translate(new Vertex3D(this.canvasWidth/4, -this.canvasHeight/4*3, 0));
		house.draw(canvas);

		/** axonometric_isometric **/
		house.resetTransformation();
		// house.scale(0.6);
		house.applyMatrix(ProjectionMatrix.axonometric_isometric(isoTransforamtion));
		house.transformPlaneXY_array_isometric(isoTransforamtion);
		house.translate(new Vertex3D(this.canvasWidth/4*3, -this.canvasHeight/4*3, 0));
		house.draw(canvas);
		this.canvas.drawCube(house.transformation);
	}
}

new HouseDrawer().drawHouseFromUserInput();