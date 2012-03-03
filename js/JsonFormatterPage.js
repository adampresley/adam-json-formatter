/*
	Adam's JSON Formatter - JSON beautifier
	Copyright (C) 2011 Adam Presley

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

	adam [at] adampresley [dot] com
*/

JsonFormatterPage = function() {
	var __init = function() {
		__dialogTemplate = $.template(null, __windowTemplateHtml);
		$("#btnParse").button({ icons: { primary: "ui-icon-circle-arrow-e"} }).click(__onBeautifyClick);
		$("#btnClear").button({ icons: { primary: "ui-icon-cancel" } }).click(__clear);

		$("#jsonString").focus();
	};


	var __onBeautifyClick = function(e) {
		if ($.trim($("#jsonString").val()) === "" && $.trim($("#jsonUrl").val()) === "") {
			apMessageBox.error({
				message: "You must provide *some* JSON... or at least a URL with some JSON...",
				height: 200,
				width: 300 
			});
			return;
		}

		Adam.block("Parsing JSON...");

		if ($("#chkGridResults").attr("checked") && $.trim($("#jsonUrl").val()) === "") {
			__onParseSuccess($("#jsonString").val());
		}
		else {
			$.ajax({
				url: "parseJson.cfm",
				data: {
					jsonString: $("#jsonString").val(),
					jsonUrl: $("#jsonUrl").val(),
					grid: (($("#chkGridResults").attr("checked")) ? true : false)
				},
				type: "POST",
				success: __onParseSuccess,
				error: __onParseError
			});
		}
	};


	var __clear = function(e) {
		var i = 0;

		for (i = 0; i < __dialogManager.length; i++) {
			$(__dialogManager[i].handle).dialog("close");
			$(__dialogManager[i].handle).remove();
		}

		__dialogManager = [];
		__resultCount = 0;
		$("#jsonString").val("");
	};


	var __onParseSuccess = function(response) {
		__resultCount++;

		var data = [ { windowId: __resultCount, jsonString: $.trim(response) } ];
		var rendered = null;
		
		if ($("#chkGridResults").attr("checked")) {
			var item = null;
			var index = 0;
			var parsed = eval("(" + response + ")");

			if (parsed.length > 0) {
				rendered = '<div id="window_' + __resultCount + '" data-windowId="' + __resultCount + '" title="Result #' + __resultCount + '" style="display: none;">';
				rendered += '<table class="display" id="grid_' + __resultCount + '"><thead><tr>';

				for (item in parsed[0]) {
					rendered += '<th>' + item + "</th>";
				}

				rendered += '</tr></thead><tbody>';

				for (index = 0; index < parsed.length; index++) {
					rendered += '<tr>';

					for (item in parsed[index]) {
						rendered += '<td>' + parsed[index][item] + '</td>';
					}

					rendered += '</tr>';
				}

				rendered += '</tbody></table>';
			}
		}
		else {
			rendered = $.tmpl(__dialogTemplate, data);
		}

		var newDialog = {
			windowId: __resultCount,
			handle: "#window_" + __resultCount
		};

		__dialogManager.push(newDialog);

		$(rendered).appendTo("#results");
		$(newDialog.handle).dialog({
			width: 725,
			height: 550,
			open: function(e, ui) {
				if ($("#chkGridResults").attr("checked")) {
					$("#grid_" + newDialog.windowId).dataTable({ "sPaginationType": "full_numbers" });
				}
			},
			buttons: {
				"Close": function() { 
					var i = 0;
					for (i = 0; i < __dialogManager.length; i++) {
						if (__dialogManager[i].windowId == $(this).attr("data-windowId")) {
							__dialogManager.splice(i, 1);
							break;
						}
					}

					$(this).dialog("close");
					$(this).remove();
				}
			}
		});

		Adam.unblock();		
	};


	var __onParseError = function(xhr, status, error) {
		var r = $.trim(xhr.responseText);
		var parsed = $.parseJSON(r);

		Adam.unblock();

		if (parsed !== null && parsed !== undefined && "message" in parsed) {
			apMessageBox.error({
				message: parsed.message,
				width: 450,
				height: 300
			});
		}
		else {
			apMessageBox.error({
				message: "Yikes! An error didn't even come back from the server. That's bad, mmmkay?",
				height: 300,
				width: 450
			});
		}
	};


	var __this = this;
	var __resultCount = 0;
	var __windowTemplateHtml = '<div id="window_${windowId}" data-windowId="${windowId}" title="Result #${windowId}" style="display: none;"><textarea id="result_${windowId}" style="width: 98%; height: 90%;">${jsonString}</textarea></div>';
	var __dialogTemplate = null;

	var __dialogManager = [];

	__init();	
};

