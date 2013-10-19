var templates = {test:'', result:''};
var $els = {};

/**
 * Load the data that the app will use
 * TODO: Also load data files for previously-graded scripts
 */
function loadData(cb) {
	var taskqueue = 0;
	for (var i in templates) {
		taskqueue++;
		if (templates.hasOwnProperty(i)) {
			(function(key) {
				$.get('templates/'+key+'.ms', function(resp) {
					templates[key] = Mustache.compile(resp);
					if (--taskqueue) cb();
				});
			}(i));
		}
	}
}

/**
 * Add a test to the 'rate a script' form
 * Do some transformations to make logicless templating easier
 */
function renderTest(key, test) {
	$els.form.append(templates.test({
		key: key,
		q: test.q,
		select: !test.opts ? null: {
			opts: test.opts
		},
		text: test.opts ? null : true,
		tags: test.tags ? test.tags.map(tagToClass) : []
	}));
}

function updateScores($tel) {
	var question = tests[$tel.attr('data-key')];
	var answer = $tel.find('.form-control').val();
	var data = {};
	if (answer === '') {
		$tel.find('.result').html('');
	} else {
		if (typeof question.score == 'function') {
			data = question.score(answer);
			if (typeof data != 'object') data = {score: data, info: null};
		} else if (typeof question.score == 'object') {
			data.score = question.score[answer];
		}
		data.verdict = (data.score < 0) ? 'bad' : (data.score > 0) ? 'good' : 'neutral';
		if (data.score > 0) data.score = '+'+data.score;
		$tel.find('.result').html(templates.result(data));
	}
}

function tagToClass(tag) {
	return tag.toLowerCase().replace(/[^\w]/i, '-').replace(/\-+/, '-');
}

$(function() {

	$els.form = $('#scoring-form');

	loadData(function() {
		for (var t in tests) {
			if (tests.hasOwnProperty(t)) {
				renderTest(t, tests[t]);
			}
		}
	});

	$els.form.on('change keyup', '.form-control', function() {
		updateScores($(this).closest('.test'));
	});
})
