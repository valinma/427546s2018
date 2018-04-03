
class TransformFieldset {
	static current() {
		let checkedElevationIndex = RadioButton.checkedIndex("elevation-type");
		return new TransformFieldset(document.querySelectorAll("fieldset.transformation")[checkedElevationIndex]);
	}

	constructor(fieldset) {
		this.fieldset = fieldset;
		this.inputs = fieldset.querySelectorAll("input");
	}

	translatePlus(dx, dy) {
		this._increaseValue(0, dx);
		this._increaseValue(1, dy);
	}

	rotatePlus(dx) {
		this._increaseValue(2, dx);
	}

	scalePlus(dx) {
		this._increaseValue(3, dx);
	}

	shearPlus(dx, dy) {
		this._increaseValue(4, dx);
		this._increaseValue(5, dy);
	}

	thD_rotatePlus(dx, dy) {
		this._increaseValue(2, dx);
		this._increaseValue(3, dy);
	}

	thD_scalePlus(dx) {
		this._increaseValue(5, dx);
	}

	thD_shearPlus(dx, dy) {
		this._increaseValue(6, dx);
		this._increaseValue(7, dy);
	}

	_increaseValue(index, value) {
		let currValue = parseFloat(this.inputs[index].value);
		this.inputs[index].value = currValue + value + "";
	}
}