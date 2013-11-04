/**
 * Third party script tests
 *
 * Define tests as properties of the object literal 'tests'.  Each test must
 * have a 'q' property containing the question as a string, and 'score',
 * which may either be an object literal mapping answers to scores, or a
 * function which takes an answer and returns a score.
 *
 * A 'score' is either a numeric value between 1 and 5, or an object with two
 * properties, 'score' (as above) and 'info', to provide context for the
 * score as a string.
 *
 * The 1-5 scoring scale maps to the grades A-E, the meanings of which are
 * documented in index.html.  1=A, 2=B, 3=C, 4=D, 5=E.
 */
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
	},
	"browserSupport": {
		"q": "Which browsers is the component script tested in? (where versions are not specified, entry refers to 'evergreen' current and previous versions)",
		"tags": ["Stability"],
		"opts": ["Legacy: IE 6", "Legacy: IE 7", "Legacy: IE 8", "Legacy: IE 9", "Legacy: Firefox 3.6", "Legacy: Mobile Safari iOS 5.1.1", "Legacy: Mobile Safari iOS 6.1.3", "Legacy: Android browser (Gingerbread)", "Legacy: Android browser (ICS)", "Legacy: Android browser (Jelly Bean)", "Evergreen: Internet Explorer", "Evergreen: Firefox (excl. FFOS)", 'Evergreen: Chrome', 'Evergreen: Opera', 'Evergreen: Safari (not mobile)', 'Evergreen: Opera Mini', 'Evergreen: FirefoxOS', 'Evergreen: Mobile Safari', 'Evergreen: Chrome for Android'],
		"multi": true,
		"score": function(a) {
			var bqual = ["Evergreen: Internet Explorer", "Evergreen: Firefox (excl. FFOS)", 'Evergreen: Chrome', 'Evergreen: Opera', 'Evergreen: Safari (not mobile)', 'Evergreen: FirefoxOS', 'Evergreen: Mobile Safari', 'Evergreen: Chrome for Android'];
			if (a.length == tests.browserSupport.opts.length) return 1;
			if (bqual.filter(function(i) {return !(a.indexOf(i) > -1);}).length === 0) return 2;
			return 3;
		}
	},
	"domInteraction": {
		"q": "When does the script interact with the DOM (choose all that apply)",
		"tags": ["Performance", "Flexibility"],
		"opts": ['On parse', 'On the DOMReady event', 'On the load event', 'On recurring timer events', 'On user interaction events', 'On network related events', 'When invoked by a function call on JS API'],
		"multi": true,
		"score": function(a) {
			var msgs = [], bestscore = 1;
			if (a.indexOf('On parse') != -1) {
				bestscore = Math.max(bestscore, 4);
				msgs.push("Interacting with the DOM on parse slows the loading of the script significantly and limits the developer's choice of when to load it");
			}
			if (a.indexOf('On the DOMReady event') != -1 || a.indexOf('On the load event') != -1) {
				bestscore = Math.max(bestscore, 3);
				msgs.push("Binding to page load-time events requires the script to be loaded synchronously");
			}
			if (a.indexOf('On recurring timer events') != -1) {
				bestscore = Math.max(bestscore, 2);
				msgs.push("Touching the DOM regularly based on timer events may cause 'jank'");
			}
			return {score:bestscore, info:msgs.join('. ')};
		}
	},
	"setsFirstPartyCookies": {
		"q": "Does the script set any persistent cookies on the host domain?",
		"tags": ["Security", "Footprint"],
		"opts": ["Yes", "No"],
		"score": {"Yes":2, "No":1}
	},
	"usesHostsCookies": {
		"q": "Does the component depend on, or modify, any existing cookies set by the host page?",
		"tags": ["Security", "Footprint"],
		"opts": ["Yes, read only", "Yes, reads and modifies", "No"],
		"score": {"Yes, read only":2, "Yes, reads and modifies": 3, "No":1}
	},
	"usesBrowserStorage": {
		"q": "Does the component persist data in the browser using a mechanism other than cookies? ",
		"tags": ["Footprint"],
		"opts": ["Yes", "No"],
		"score": {"Yes":2, "No":1}
	},
	"removesEventListeners": {
		"q": "If the component adds event listeners to DOM elements, does it remove them when they're no longer required?",
		"tags": ["Footprint"],
		"opts": ["Yes", "No"],
		"score": {"Yes":1, "No":3}
	},
	"cachedOnCdn": {
		"q": "Is the script (including all non-dynamic resources) cached on a CDN with global reach?",
		"tags": ["Performance"],
		"opts": ["Yes", "No"],
		"score": {
			"Yes":1,
			"No": {
				"score": 3,
				"info": "If script is not CDN-cached its load perforance is likely to vary widely between different regions"
			}
		}
	},
	"originLocations": {
		"q": "Where are there servers that can accept write operations performed by the script (ie. which of the following locations contain origins for the script's backing service)?",
		"tags": ["Performance"],
		"opts": ["Europe", "North America", "China", "Asia (excl China)", "Australia"],
		"multi": true,
		"score": function(a) {
			return (a.length == 1) ? 3 : 1;
		}
	},
	"payloadSizeKb": {
		"q": "What is the total data size in kilobytes transferred on page load?",
		"tags": ["Footprint", "Performance"],
		"score": function(a) {
			return (a<100) ? 1 : (a<250) ? 2 : (a<1000) ? 3 : 4;
		}
	},
	"browserCacheTtl": {
		"q": "What is the minimum browser-cache TTL (in seconds) of files downloaded on page load (ie. Cache-control max-age)?",
		"tags": ["Performance"],
		"score": function(a) {
			return (a==0) ? 4 : (a<3600) ? 2 : 1;
		}
	},
	"hasSingleOrigin": {
		"q": "Is the script or any web service it depends on served from a single origin (ie. is there just one origin data center)?",
		"tags": ["Stability"],
		"opts": ["Yes", "No"],
		"score": {"Yes":3, "No":1}
	},
	"mttrLag": {
		"q": "In the event of a complete failure of the primary origin (eg unmitigated data centre power failure), what is the mean time to recovery (MTTR), in seconds?",
		"tags": ["Stability"],
		"score": function(a) {
			return (a==0) ? 1 : (a<=3600) ? 2 : (a<=86400) ? 3 : 4;
		}
	},
	"recentOutages": {
		"q": "How many full outages has the service experienced in the 12 months prior to today? (where full outage means a user with empty cache anywhere in the world being unable to use the service)",
		"tags": ["Stability"],
		"score": function(a) {
			return (a==0) ? 1 : (a==1) ? 3 : 4;
		}
	},
	"minHttpRequests": {
		"q": "What is the minimum number of HTTP requests that the script will make when invoked?",
		"tags": ["Performance", "Footprint"],
		"score": function(a) {
			return (a<=2) ? 1 : (a<=5) ? 2 : (a<=20) ? 3 : 4;
		}
	},
	"supportsSsl": {
		"q": "Is it possible to make ALL the script's network activity go over HTTPS?",
		"tags": ["Security"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:3}
	},
	"supportsFastHttp": {
		"q": "Is HTTP 2.0 or SPDY supported for all requests?",
		"tags": ["Performance"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:2}
	},
	"bundleable": {
		"q": "Can the script's inital payload be bundled with the host page's own scripts?",
		"tags": ["Performance"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:2}
	},
	"hasPublicStatusPage": {
		"q": "Is there a public status page describing the current operational state of the script's backing services?",
		"tags": ["Stability"],
		"opts": ["Yes, with machine readable output", "Yes, human readable", "No"],
		"score": {"Yes, with machine readable output":1, "Yes, human readable":2, "No":3}
	},
	"usesOwnPublicApi": {
		"q": "Does the script use ONLY API services that are also available via a public API (ie could a developer reimplement the front end component themselves using the service's published API)?",
		"tags": ["Flexibility"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:3}
	},
	"consistencyGuaranteed": {
		"q": "If backing services use replication, is it guaranteed that end users will never see incongruous data as a result of replication lag?",
		"tags": ["Stability"],
		"opts": ["Yes", "No"],
		"score": {"Yes":1, "No":3}
	},
	"collectsPersonalData": {
		"q": "Will the component be involved with collecting user identifiable data (including any one of name, email address, credit card details, or phone number)?",
		"tags": ["Compliance"],
		"opts": ["Yes", "No"],
		"score": {Yes:2, No:1}
	},
	"safeHarborCompliant": {
		"q": "For European customers, does the script's backing service either a) not store any personal data, b) store personal data only within the EU, or c) store personal data outside the EU in compliance with the US Safe Harbor data protection standard? (choose Yes if any statement is true)",
		"tags": ["Compliance"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:4}
	},
	"respectsDoNotTrack": {
		"q": "Does the script respect the Do-Not-Track HTTP header, either actively or by not conducting any tracking at all?",
		"tags": ["Compliance"],
		"opts": ["Yes", "No"],
		"score": {Yes:1, No:3}
	}
};
