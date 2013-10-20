var tests = {

	"unprotectedLibs": {
		"q": "Are common 3rd party libraries (eg. jQuery, Underscore, Backbone) included outside of a protected scope (ie is there any chance they may conflict with other instances of the same library that may be included on the page?",
		"opts": ["Yes", "No"],
		"tags": ["Stability"],
		"score": {"Yes": 3, "No": 1}
	},
	"globalsCount": {
		"q": "How many objects/variables do component script(s) require in / add to the global scope?",
		"tags": ["Stability", "Footprint"],
		"score": function(a) {
			return (a == 0) ? 1 : ((a == 1) ? 2 : 3);
		}
	},
	"docWrite": {
		"q": "Do component script(s) use document.write?",
		"opts": ["Yes", "No"],
		"tags": ["Stability", "Flexibility", "Performance"],
		"score": function(a) {
			if (a == 'Yes') return {score: 4, info: "Scripts that use document.write can only be run on page load, so are impossible to run in a way that does not slow down page loading. If they are accidentally run after page load, they can cause the entire page to go blank.  Avoid."};
			return 1;
		}
	},
	"consoleOutput": {
		"q": "Do component script(s) produce any console output in normal operation?",
		"opts": ["Yes", "No"],
		"tags": ["Footprint", "Performance"],
		"score": {"Yes": 3, "No": 1}
	},
	"jsErrors": {
		"q": "Do component script(s) cause any JavaScript errors in normal operation?",
		"opts": ["Yes", "No"],
		"tags": ["Footprint", "Stability"],
		"score": {"Yes": 4, "No": 1}
	},
	"asyncLoadable": {
		"q": "Can component script(s) be loaded asynchronously?",
		"opts": ["No, must be pre <BODY>", "No, must be before DOMReady event", "No, must be before load event", "Yes"],
		"tags": ["Flexibility", "Performance"],
		"score": {
			"No, must be pre <BODY>":4,
			"No, must be before DOMReady event":4,
			"No, must be before load event":3,
			"Yes":1
		},
	},
	"initMethod": {
		"q": "How does the component initialise?",
		"opts": ["On parse", "On an event", "On a function call"],
		"tags": ["Flexibility", "Performance"],
		"score": {
			"On parse":4,
			"On an event":2,
			"On a function call":1
		},
	},
	"destroyable": {
		"q": "Does the code have a 'destroy' or similar method call if it needs to be removed from the page, and if so does it destroy the component without leaving any non-garbage collectable data or DOM behind?",
		"opts": ["Yes, destroys cleanly", "Yes, but leaves remnants", "No"],
		"tags": ["Footprint", "Stability", "Flexibility", "Performance"],
		"score": {
			"Yes, destroys cleanly":1,
			"Yes, but leaves remnants":2,
			"No":3
		},
	},
	"configMethod": {
		"q": "If component script(s) require configuration in the browser how is this achieved?",
		"opts": ["Global variable", "HTML attributes/microdata", "Method call on JS API"],
		"tags": ["Footprint", "Flexibility"],
		"score": {
			"Global variable":3,
			"HTML attributes/microdata":1,
			"Method call on JS API":1
		},
	},
	"packageSupport": {
		"q": "What code-level interfaces are supported by the script?",
		"opts": ["Offers no interface", "Global only", "AMD only", "CommonJS only", "UMD including CommonJS", "UMD including AMD", "UMD with AMD and CommonJS"],
		"tags": ["Footprint", "Flexibility"],
		"score": {
			"Offers no interface":1,
			"Global only":3,
			"AMD only":4,
			"CommonJS only":4,
			"UMD including CommonJS":2,
			"UMD including AMD":2,
			"UMD with AMD and CommonJS":1
		},
	},
	"offlineSupport": {
		"q": "How does the component behave when page is loaded while offline (assuming the host page is cached in an application cache?",
		"opts": ["Loads and works", "Loads and displays fallback content", "Loads with errors", "Fails to load"],
		"tags": ["Flexibility", "Stability"],
		"score": {
			"Loads and works":1,
			"Loads and displays fallback content":1,
			"Loads with errors":3,
			"Fails to load":2
		}
	},
	"recurringTimerFreq": {
		"q": "How many (infinitely and unconditionally recurring) timer events does the script fire per minute?",
		"tags": ["Performance", "Footprint"],
		"score": function(a) {
			return (a==0) ? 1 : (a<=10) ? 2 : (a<=60) ? 3 : 4;
		}
	},
	"recurringXhrFreq": {
		"q": "How frequently (in seconds, 0 for never) does the script make AJAX requests on (infinitely and unconditionally recurring) timer events?",
		"tags": ["Performance", "Footprint"],
		"score": function(a) {
			return (a==0) ? 1 : (a>=300) ? 2 : (a>=60) ? 3 : 4;
		}
	},
	"onRemovingScript": {
		"q": "If the script tag is removed from the page (eg because it appears to be causing problems), what is the UI impact (on subsequent page loads)?",
		"tags": ["Flexibility"],
		"opts": ["Component collapses", "Component appears as empty space", "Unenhanced content appears", "Undesirable content appears", "No impact"],
		"score": {
			"Component collapses":2,
			"Component appears as empty space":3,
			"Unenhanced content appears":1,
			"Undesirable content appears":4,
			"No impact":1
		}
	},
	"isALoader": {
		"q": "Is the script intended to delegate and manage the loading of other third party scripts?",
		"tags": ["Security", "Stablility"],
		"opts": ["Yes", "No"],
		"score": {"Yes":4, "No":1}
	}
};
