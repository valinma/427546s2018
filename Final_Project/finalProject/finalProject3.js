class perspectiveDrawer {
	constructor() {
		this.canvasWidth = 1000;
		this.canvasHeight = 1000;
		this.canvasDepth = 1000;

		// this.canvas = this._setupCanvas();
		this.canvas = new MyCanvas("canvas3", this.canvasWidth, this.canvasHeight, this.canvasDepth);
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
		values.vanishingPointsMove1 = values.all.slice(31, 34);
		values.vanishingPointsMove2 = values.all.slice(34, 38);
		values.vanishingPointsMove3 = values.all.slice(38, 43);

		// clear canvas
		this.canvas.clearAll();
		// while (this.canvas.lastChild) { this.canvas.removeChild(canvas.lastChild); }

		// this.canvas.drawCoordinatesXY(this.canvasWidth/2);
		//this.canvas.drawGrids(2);

		this._drawHouse(
			this.canvas,
			values.houseSpec,
			values.vanishingPointsMove1,
			values.vanishingPointsMove2,
			values.vanishingPointsMove3
		);
	}

	_drawHouse(
		canvas,
		houseSpec,
		vanishingPointsMove1,
		vanishingPointsMove2,
		vanishingPointsMove3
	) {
		// let width = canvas.clientWidth/2, height = canvas.clientHeight/2, depth = canvas.clientWidth/2;
		let width = houseSpec[0], height= houseSpec[1], depth = houseSpec[2];
		let roofHeight = height / 2;

		let house = new House(width, height, depth, roofHeight);


		/** 1 point perspective **/
		house.applyMatrix(ProjectionMatrix.perspective_1_point(vanishingPointsMove1[2]));
		house.rotateY(vanishingPointsMove1[0]);
		house.rotateX(vanishingPointsMove1[1]);
		house.translate(new Vertex3D(this.canvasWidth/4*1.5, -this.canvasHeight/4*1.1, 0));
		house.draw(canvas);

		/** 2 point perspective **/
		house.resetTransformation();
		house.applyMatrix(ProjectionMatrix.perspective_2_point(vanishingPointsMove2[2], vanishingPointsMove2[3]));
		house.rotateY(vanishingPointsMove2[0]);
		house.rotateX(vanishingPointsMove2[1]);
		house.translate(new Vertex3D(this.canvasWidth/4*3.15, -this.canvasHeight/4*1.25, 0));
		house.draw(canvas);

		/** 3 point perspective **/
		house.resetTransformation();
		console.log(vanishingPointsMove3);
		house.applyMatrix(ProjectionMatrix.perspective_3_point(vanishingPointsMove3[2], vanishingPointsMove3[3], vanishingPointsMove3[4]));
		house.rotateY(vanishingPointsMove3[0]);
		house.rotateX(vanishingPointsMove3[1]);
		house.translate(new Vertex3D(this.canvasWidth/4*2, -this.canvasHeight/4*3.25, 0));
		house.draw(canvas);
	}
}

new perspectiveDrawer().drawHouseFromUserInput();