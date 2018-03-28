
class Inputs {
	static floatValues(container) {
		let inputs = container.querySelectorAll("input[type=number]");
		return Array.prototype.map.call(inputs, function (input) {
			return parseFloat(input.value);
		});
	}
}