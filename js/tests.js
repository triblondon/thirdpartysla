
var tests = [
	unprotectedLibs: {
		q: "Are common 3rd party libraries (eg. jQuery, Underscore, Backbone) included outside of a protected scope (ie is there any chance they may conflict with other instances of the same library that may be included on the page?"
		opts: ['Yes', 'No'],
		tags: ['Stability'],
		score: {Yes: -3, No: 0}
	},
	globalsCount: {
		q: "How many objects/variables do component script(s) require in / add to the global scope?"
		tags: ['Stability', 'Footprint'],
		score: function(a) {
			return (a == 0) ? 1 : ((a == 1) ? 0 : -3);
		}
	},
	docWrite: {
		q: "Do component script(s) use document.write?"
		opts: ['Yes', 'No'],
		tags: ['Stability', 'Flexibility', 'Performance'],
		score: function(a) {
			if (a == 'Yes') return {score: -10, info: "Scripts that use document.write can only be run on page load, so are impossible to run in a way that does not slow down page loading. If they are accidentally run after page load, they can cause the entire page to go blank.  Avoid."};
			return 0;
		}
	}
];
