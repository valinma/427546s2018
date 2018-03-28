
class RadioButton {
	static checkedIndex(containerId) {
		let all = document.getElementById(containerId).querySelectorAll("input");
		let checked = Array.prototype.map.call(all, function (input) {
			return input.checked;
		});
		return checked.indexOf(true);
	}
}