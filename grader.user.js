// ==UserScript==
// @name         Schoology Grader
// @namespace    http://*.schoology.com/
// @version      0.1
// @description  Grade that schoology.
// @author       Liam Pierce
// @match        https://*/*
// @grant        none
// ==/UserScript==

function pushGrade(k,percent){
	$(k).find(".grade-column .td-content-wrapper").append(`<span class="awarded-grade"><span class="numeric-grade primary-grade"><span class="rounded-grade">`+percent.toFixed(2)+`%</span></span></span>`);
}

(function() {
    'use strict';
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
       $(".period-row").each(function(i,k){
	var macroTotal = 0
	var macroRec = 0;
	$(".category-row[data-parent-id='" + $(k).attr("data-id") + "']").each(function(m,j){
		var localTotal = 0
		var localRec   = 0
		$(".item-row[data-parent-id='" + $(j).attr("data-id") + "']").each(function(t,c){
			if ($(c).find(".rounded-grade").length){
				localRec += parseInt($(c).find(".rounded-grade").text())
				localTotal += parseInt($(c).find(".max-grade").text().replace(/[^0-9]/g, ''));
			}
		})
		var grade = (localTotal > 0) ? (localRec/localTotal * 100) : 100
        if (!$(j).find(".awarded-grade").length){
            pushGrade(j, grade);
        }
		
		macroTotal += grade
		macroRec += 1
	});
    if (!$(k).find(".awarded-grade").length){
        pushGrade(k,macroTotal / macroRec)
    }
	
})

    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
