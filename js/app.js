var templates = {test:'', result:'', overallScores:'', filters:''};
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
		if (templates.hasOwnProperty(i)) {
			taskqueue++;
			(function(key) {
				$.get('templates/'+key+'.ms', function(resp) {
					templates[key] = Mustache.compile(resp);
					if (!(--taskqueue)) {
						cb();
					}
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
		select: (!test.opts || test.multi) ? null : {
			opts: test.opts
		},
		multi: (!test.opts || !test.multi) ? null : {
			opts: test.opts
		},
		text: test.opts ? null : true,
		tags: test.tags ? test.tags.map(tagToClass) : []
	}));
}

function renderTags() {
	var tagdata = {
		tags: tags.map(function(tag) {
			return {
				tagname: tag,
				class: tagToClass(tag)
			};
		})
	};
	$els.overallScores.html(templates.overallScores(tagdata));
	$els.filters.html(templates.filters(tagdata));
}

function updateTestScore($tel) {
	var question = tests[$tel.attr('data-key')];
	if ($tel.find('.input input, .input select').length == 1) {
		var answer = $tel.find('.form-control').val();
	} else {
		var answer = [];
		$tel.find('.checkbox input').each(function() {
			if (this.checked) answer.push(this.value);
		});
	}
	var data = {};
	if (answer === '') {
		$tel.find('.result').html('');
	} else {
		if (typeof question.score == 'function') {
			data = question.score(answer);
		} else if (typeof question.score == 'object') {
			data = question.score[answer];
		}
		if (typeof data != 'object') data = {score: data, info: null};
		data.grade = grades[data.score];
		$tel.find('.result').html(templates.result(data));
		$tel.next('.result-info').remove();
	}
	updateOverallResults();
}

function updateOverallResults() {
	tags.forEach(function(tag) {
		var highest = 1;
		$('.test.tag-'+tagToClass(tag)+':not(.disabled) .verdict').each(function() {
			highest = Math.max(highest, $(this).attr('data-score'));
		})
		$('#overall-scores .result-'+tagToClass(tag)+' .verdict').html(grades[highest]).removeClass('verdict-a verdict-b verdict-c verdict-d verdict-e').addClass('verdict-'+grades[highest]);
	});
}

function updateFilters() {
	var tagstatus = {};
	$els.form.find('.test').each(function() {
		var $tel = $(this);
		var status = $tel.hasClass('disabled') ? 'none' : 'all';
		tags.forEach(function(tag) {
			tag = tagToClass(tag);
			if ($tel.hasClass('tag-'+tag)) {
				tagstatus[tag] = (typeof tagstatus[tag] !== 'undefined' && tagstatus[tag] !== status) ? 'some' : status;
			}
		});
	});
	for (t in tagstatus) {
		$('.filter-tag-'+t).removeClass('filter-all filter-some filter-none').addClass('filter-'+tagstatus[t]);
	}
}

function showInfo($tel) {
	$tel.after("<div class='row result-info alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+$tel.find('.info-button').attr('title')+"</div>");
	$tel.find('.info-button').hide();
}

function toggleEnabled($tel) {
	var action = $tel.find('.question-toggle').get(0).checked ? 'removeClass' : 'addClass';
	$tel[action]('disabled');
	updateOverallResults();
}

function toggleFilter($filel) {
	var mode = $filel.hasClass('filter-all') ? 'none' : 'all';
	var tag = $filel.closest('li').attr('data-tag');
	if (mode == 'none') {
		$els.form.find('.test.tag-'+tag).addClass('disabled').find('.question-toggle').removeAttr('checked');
	} else {
		$els.form.find('.test.tag-'+tag).removeClass('disabled').find('.question-toggle').prop('checked', 'checked');
	}
	updateOverallResults();
	updateFilters();
}

function generateJson() {
	var op = {
		"name": $('#scriptname').val(),
		"description": $('#scriptdesc').val(),
		"home": $('#scripthomeurl').val(),
		"script": $('#scripturl').val(),
		"evaluator": $('#scriptevaluator').val(),
		"testdate": (new Date()).toISOString(),
		"data": {}
	};
	$els.form.find('.test').each(function() {
		var $tel = $(this);
		if ($tel.find('.input select, .input input').length == 1) {
			op.data[$tel.attr('data-key')] = $tel.find('.input select, .input input').val();
		} else {
			var answer = [];
			$tel.find('.checkbox input').each(function() {
				if (this.checked) answer.push(this.value);
			});
			op.data[$tel.attr('data-key')] = answer;
		}
	});

	var blob = new Blob([JSON.stringify(op, null, '\t')], {type: "text/plain;charset=utf-8"});
	saveAs(blob, tagToClass(op.name || 'untitled')+".json");
}

function tagToClass(tag) {
	return tag.toLowerCase().replace(/[^\w]/i, '-').replace(/\-+/, '-');
}

$(function() {

	$els.form = $('#scoring-form');
	$els.overallScores = $('#overall-scores');
	$els.filters = $('#filters');
	$els.download = $('#download-form');

	loadData(function() {
		for (var t in tests) {
			if (tests.hasOwnProperty(t)) {
				renderTest(t, tests[t]);
			}
		}
		renderTags();
	});

	$els.form.on('change keyup', '.form-control, .checkbox input', function() {
		updateTestScore($(this).closest('.test'));
	});
	$els.form.on('click', '.info-button', function() {
		showInfo($(this).closest('.test'));
	});
	$els.form.on('click', '.question-toggle', function() {
		toggleEnabled($(this).closest('.test'));
	});
	$els.filters.on('click', 'li', function() {
		toggleFilter($(this));
	});
	$els.download.on('click', '#download-button', generateJson);
})
