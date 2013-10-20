var templates = {test:'', result:''};
var $els = {};
var grades = {1:'a', 2:'b', 3:'c', 4:'d', 5:'e'};
var tags = ['Performance', 'Stability', 'Footprint', 'Flexibility', 'Security', 'Compliance'];

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

function updateTestScore($tel) {
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
		data.grade = grades[data.score];
		$tel.find('.result').html(templates.result(data));
		$tel.next('.result-info').remove();
	}
	updateOverallResults();
}

function updateOverallResults() {
	tags.forEach(function(tag) {
		var highest = 1;
		$('.test.tag-'+tagToClass(tag)+' .verdict').each(function() {
			highest = Math.max(highest, $(this).attr('data-score'));
		})
		$('#overall-scores .result-'+tagToClass(tag)+' .verdict').html(grades[highest]).removeClass('verdict-a verdict-b verdict-c verdict-d verdict-e').addClass('verdict-'+grades[highest]);
	});
}

function showInfo($tel) {
	$tel.after("<div class='row result-info alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+$tel.find('.info-button').attr('title')+"</div>");
	$tel.find('.info-button').hide();
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
		updateTestScore($(this).closest('.test'));
	});
	$els.form.on('click', '.info-button', function() {
		showInfo($(this).closest('.test'));
	});
})
