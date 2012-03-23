<!DOCTYPE html>
<!---
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
--->
<html>
<head>
	<title>Adam's JSON Formatter</title>
	<link type="text/css" rel="stylesheet" href="/css/ui-lightness/jquery-ui-1.8.16.custom.css" />
	<link type="text/css" rel="stylesheet" href="/css/demo_page.css" />
	<link type="text/css" rel="stylesheet" href="/css/demo_table.css" />
	<link type="text/css" rel="stylesheet" href="/css/style.css" />

	<script type="text/javascript" src="/js/jquery-1.6.3.min.js"></script>
	<script type="text/javascript" src="/js/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="/js/jquery-ui-1.8.16.custom.min.js"></script>
	<script type="text/javascript" src="/js/blockui.js"></script>
	<script type="text/javascript" src="/js/apMessageBox.js"></script>
	<script type="text/javascript" src="/js/adam.js"></script>
	<script type="text/javascript" src="/js/jquery.dataTables.min.js"></script>

	<script type="text/javascript" src="/js/JsonFormatterPage.js"></script>
</head>
<body>
	<div id="topBar">
		<div id="website"><a href="http://www.adampresley.com">www.adampresley.com</a></div>
	</div>

	<div id="outerWrap">
		<img src="/images/json-logo.jpg" style="float: right;" />
		<h1>Adam's JSON Formatter</h1>


		<h2>Good Grief! Why??</h2>
		<p>
			Why another JSON formatter? Because my favorite one, JSON Formatter &amp; Validator
			found at <a href="http://jsonformatter.curiousconcept.com/">http://jsonformatter.curiousconcept.com/</a>
			has too strict of a character limit. I needed bigger.
		</p>


		<h2>Let's Do It</h2>
		<textarea name="jsonString" id="jsonString" rows="15" cols="80"></textarea>

		<div class="clear"></div>
		<br />
		
		or <strong>URL:</strong> <input type="text" id="jsonUrl" value="" size="70" />
		<div class="clear"></div>
		<br />

		<button name="btnParse" id="btnParse">Beautify</button>
		<button name="btnClear" id="btnClear">Clear</button>

		<div class="clear"></div>

		<br />
		<input type="checkbox" id="chkGridResults" value="" /> Results as Grid <span class="small-note">(data must be an array of objects)</span><br />


		<h2>Technology</h2>
		<p>
			This code is written in ColdFusion running on <a href="http://openbluedragon.org">OpenBD version 2.03b</a>.
			It uses <a href="http://json-lib.sourceforge.net">JSON-lib</a> to handle parsing and beautification
			of JSON data. It also makes use of <a href="http://www.jquery.com">jQuery</a> and 
			<a href="http://jqueryui.com/">jQueryUI</a>. You may also have the <a href="jsonformatter.zip">source code</a>, licensed under GPL 3.
		</p>

		<div id="results"></div>
	</div>
</body>

<script type="text/javascript">

	var page = null;

	(function($) {
		$(document).ready(function() {

			page = new JsonFormatterPage();

		});
	})(jQuery);

</script>

</html>
