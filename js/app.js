
function renderQuestion(question) {
	// ...
}

$(function() {
	for (var t in tests) {
		if (tests.hasOwnProperty(t)) {
			renderQuestion(tests[t]);
		}
	}
})
