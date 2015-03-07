/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// var gLevels : objet des niveaux, défini dans levels.js
// var gCars : objet des composants à afficher, défini dans levels.js

var gLevel;
var gCurrentLevel = getCurrentLevel(); //parseInt(localStorage.currentLevel, 10) || 0;
var gLevelTimeout = 1000;
var gFails = 0;

var d = 2; // ???????

var gBlocTable = null;
var gBlocMarkup = null;
var gInput = null;
var gBlocQuestion = null;
var gTableWrapper = null;

$(document).ready(function() {
	gBlocTable = $('#blcTable');
	gBlocMarkup = $('#blcMarkup');
	gInput = $('#txtSaisieSelecteur');
	gBlocQuestion = $('#blcQuestion');
	gTableWrapper = $(".table-wrapper");

	$(".level-menu-toggle-wrapper").on("click", function() {
		$(".help-wrapper").toggleClass("open");
		$(".level-menu").toggleClass("open");
	});
	
	//Handle inputs from the input box on enter
	gInput.on("keypress", function(e) {
		e.stopPropagation();
		if (e.keyCode ==  13) {
			enterHit();
			return false;
		}
	});

	gInput.on("keyup", function(e) {
		e.stopPropagation();

		if (gInput.val().length > 0) {
			gInput.removeClass("input-strobe");
		} else {
			gInput.addClass("input-strobe");
		}
	});

	$(".editor").on("click", function() {
		gInput.focus();
	});

	//Add tooltips
	gBlocTable.on("mouseover", "*", function(e) {
		e.stopPropagation();
		showTooltip($(this));
	});

	//Shows the tooltip on the table
	gBlocMarkup.on("mouseover", "div *", function(e) {
		var index = $(".markup *").index($(this)) -1;
		showTooltip($(".table *").eq(index));
		e.stopPropagation();
	});

	//Shows the tooltip on the table
	gBlocMarkup.on("mouseout", "*", function(e) {
		e.stopPropagation();
		hideTooltip();
	});

	gBlocTable.on("mouseout", "*", function(e) {
		hideTooltip();
		e.stopPropagation();
	});

	$(".enter-button").on("click", function() {
		enterHit();
	});

	$(".table-wrapper,.table-edge").css("opacity",0);

	buildLevelmenu();

	setTimeout(function() {
			loadLevel();
			$(".table-wrapper,.table-edge").css("opacity",1);
		},50);

});

//-------------------------------------------------------------------------

function buildLevelmenu() {
	for(var i = 0; i < gLevels.length; i++) {
		var item = document.createElement("a");
		$(item).html(gLevels[i].selectorSyntax);
		$(".level-menu .levels").append(item);
		
		$(item).on("click",function() {
			gCurrentLevel = $(this).index();
			loadLevel();
		});
	}
}

//-------------------------------------------------------------------------

function hideTooltip() {
	$(".enhance").removeClass("enhance");
	$("[data-hovered]").removeAttr("data-hovered");
	$(".helper").hide();
}

//-------------------------------------------------------------------------

function showTooltip(el) {
	var tableElements, index, helper, pos, helpertext, elType, elClass, id;
	
	el.attr("data-hovered",true);
	
	tableElements = $(".table *");
	index = tableElements.index(el);
	
	$(".markup > div *").eq(index).addClass("enhance").find("*").addClass("enhance");

	helper = $(".helper");

	pos = el.offset();
	helper.css("top", pos.top - 65);
	helper.css("left", pos.left + (el.width() / 2));

	elType = el.get(0).tagName.toLowerCase();
	helpertext = '<' + elType;

	elClass = el.attr("class");

	if (elClass && elClass.indexOf("strobe") > -1) {
		elClass = elClass.replace("strobe", "");
	}

	if (elClass) {
		helpertext += ' class="' + elClass + '"';
	}

	id = el.attr("id");
	if (id) {
		helpertext += ' id="' + id + '"';
	}

	helpertext += '></' + elType + '>';
	helper.show();
	helper.text(helpertext);
}

//-------------------------------------------------------------------------

//Animate the enter button
function enterHit() {
	var enterButton = $(".enter-button");
	enterButton.removeClass("enterhit");
	enterButton.width(enterButton.width());
	enterButton.addClass("enterhit");

	handleInput(gInput.val());
}

//-------------------------------------------------------------------------

//Parses text from the input field
function handleInput(text) {
	var nombre;
	
	if (text == "") {
		text = "blammojammo";
	}

	nombre = parseInt(text,10);

	if (nombre > 0 && nombre < gLevels.length + 1) {
		gCurrentLevel = nombre - 1;
		loadLevel();
		return;
	}

	if (text == "help") {
		showHelp();
	} else {
		fireRule(text);
	}
}

//-------------------------------------------------------------------------

//Shows help
function showHelp() {
	var example, i;
	var selectorTitle = gLevel.selectorTitle || "";
	var selectorText = gLevel.selectorText || "";
	var examples = gLevel.examples || [];
	var solution = gLevel.solution || "";
	var selectorSyntax = gLevel.selectorSyntax || "";
	var syntaxExample = gLevel.syntaxExample || "";
	var selectorName = gLevel.selectorName || "";

	gInput.val('');
	
	$(".display-help .syntax").html(selectorSyntax);
	$(".display-help .syntax-example").html(syntaxExample);
	$(".display-help .selector-name").html(selectorName);
	$(".display-help .title").html(selectorTitle);
	$(".display-help .examples").html("");

	for(i = 0; i < examples.length; i++) {
		example = $("<div class='example'>" + examples[i] + "</div>");
		$(".display-help .examples").append(example);
	}
	$(".display-help .hint").html(selectorText);
	$(".display-help .selector").text(solution);
}

//-------------------------------------------------------------------------

function resetTable() {
	var _this;
	$(".display-help").removeClass("open-help");
	$(".clean,.strobe").removeClass("clean,strobe");
	$(".clean,.strobe").removeClass("clean,strobe");
	gInput.addClass("input-strobe");
	
	$(".table *").each(function() {
		_this = $(this);
		_this.width(_this.width());
		_this.removeAttr("style");
	});
	
	$(".table-edge").width(gBlocTable.outerWidth());
}

//-------------------------------------------------------------------------

function fireRule(rule) {
	var _this, ruleSelected;
	var win = false;
	
	// prevent cheating
	if (rule == ".strobe") {
		rule = '';
	}

	$(".shake").removeClass("shake");

	$(".strobe,.clean,.shake").each(function() {
		_this = $(this);
		_this.width(_this.width());
		_this.removeAttr("style");
	});

	
	ruleSelected = gTableWrapper.find(rule);

	if (ruleSelected.length == 0) {
		$(".editor").addClass("shake");
	} else {
		win = checkResults(rule);
	}

	if (win) {
		ruleSelected.removeClass("strobe");
		ruleSelected.addClass("clean");

		gInput.val('');
		$(".input-wrapper").css("opacity", .2);
		
		gCurrentLevel++;
		
		if (gCurrentLevel >= gLevels.length) {
			winGame();
		} else {
			setTimeout(function() { loadLevel();}, gLevelTimeout);
		}

		return;
	}

	continueRule();

	ruleSelected.removeClass("strobe");
	ruleSelected.addClass("shake");

	setTimeout(function() {
			$(".shake").removeClass("shake");
			$(".strobe").removeClass("strobe");
			gTableWrapper.find(gLevel.solution).addClass("strobe");
		}, 500);
}



function fireRule______(rule) {
	var _this, baseTable, ruleSelected, levelSelected;
	var win = false;
	
	// prevent cheating
	if (rule === ".strobe") {
		rule = null;
	}

	$(".shake").removeClass("shake");

	$(".strobe,.clean,.shake").each(function() {
		_this = $(this);
		_this.width(_this.width());
		_this.removeAttr("style");
	});

	/*
	* Sean Nessworthy <sean@nessworthy.me>
	* On 03/17/14
	*
	* Allow [div][.table] to preceed the answer.
	* Makes sense if div.table is going to be included in the HTML viewer
	* and users want to try and use it in their selectors.
	*
	* However, if it is included as a specific match, filter it out.
	* This resolves the  "Match all the things!" level from beheading the table too.
	* Relatedly, watching that happen made me nearly spill my drink.
	*/

	baseTable = $('.table-wrapper > .table');
	ruleSelected = $(".table-wrapper").find(rule).not(baseTable);
	levelSelected = $(".table-wrapper").find(gLevel.solution).not(baseTable);
	

	//If nothing is selected
	if (ruleSelected.length == 0) {
		$(".editor").addClass("shake");
	}

	if (ruleSelected.length == levelSelected.length && ruleSelected.length > 0) {
		win = checkResults(rule);
	}

	if (win) {
		ruleSelected.removeClass("strobe");
		ruleSelected.addClass("clean");

		gInput.val('');
		$(".input-wrapper").css("opacity", .2);
		
		gCurrentLevel++;
		
		if (gCurrentLevel >= gLevels.length) {
			winGame();
		} else {
			setTimeout(function() { loadLevel();}, gLevelTimeout);
		}

		return;
	}

	continueRule();

	ruleSelected.removeClass("strobe");
	ruleSelected.addClass("shake");

	setTimeout(function() {
			$(".shake").removeClass("shake");
			$(".strobe").removeClass("strobe");
			levelSelected.addClass("strobe");
		}, 500);

	$(".result").fadeOut();
}
//-------------------------------------------------------------------------

function winGame() {
	gBlocTable.html('<span class="winner"><strong>Vous avez réussi !</strong><br>Vous êtes un maître CSS.</span>');
	resetTable();
}

//-------------------------------------------------------------------------

function checkResults(rule) {
	/*var ruleTable = gBlocTable.clone();
	ruleTable.find(".strobe").removeClass("strobe");
	ruleTable.find(rule).addClass("strobe");
	return (gBlocTable.html() == ruleTable.html());
*/	
	var Clone = gTableWrapper.clone();
	Clone.find(".strobe").removeClass("strobe");
	Clone.find(rule).addClass("strobe");
	
	return (gTableWrapper.html() == Clone.html());	
}

//-------------------------------------------------------------------------

function continueRule() {
	console.log("Fails thus far: " + ++gFails);
}

//-------------------------------------------------------------------------

function loadBoard() {
	var boardMarkup = "";
	var markup = "";
	var i, Html;
	
	var ERlt = /</g,
		ERgt = />/g;
	
	showHelp();

	for (i = 0; i < gLevel.show.length; i++) {	
		Html = gCars[gLevel.show.charAt(i)];
		boardMarkup += Html;
		
		(Html.substring(0,2) != '</') && (markup += '<div>');		
		markup += Html.replace(ERlt, '&lt;').replace(ERgt, '&gt;');
		(Html.indexOf('/') != -1) && (markup += '</div>');
	}
	
	gBlocTable.html(boardMarkup);
	gBlocMarkup.html('<div>&lt;div class="table"&gt;' + markup + '&lt;/div&gt;</div>');
}

//-------------------------------------------------------------------------

//Loads up a level
function loadLevel() {
	var percent = (gCurrentLevel + 1) / gLevels.length * 100;
	
	gLevel = gLevels[gCurrentLevel];

	$(".level-menu .current").removeClass("current");
	$(".level-menu div a").eq(gCurrentLevel).addClass("current");

	$(".progress").css("width",percent + "%");

	//localStorage.setItem("currentLevel",gCurrentLevel);
	saveCurrentLevel();
	
	loadBoard();
	resetTable();

	$(".file-name").html(gLevel.solution);

	$(".level-header").html("Niveau " + (gCurrentLevel + 1) + " / " + gLevels.length);
	gBlocQuestion.text(gLevel.exercice);
	gInput.val('').focus();


	$(".input-wrapper").css("opacity",1);
	$(".result").text("");

	//Strobe what's supposed to be selected
	$(".table " + gLevel.solution).addClass("strobe");
}

//-------------------------------------------------------------------------

function getCurrentLevel() {
	var niveau = document.cookie.replace(/(?:(?:^|.*;\s*)restocss\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	niveau = parseInt(niveau, 10);
	return (isNaN(niveau)) ? 0 : niveau;
}

function saveCurrentLevel() {
	document.cookie = "restocss=" + gCurrentLevel + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}