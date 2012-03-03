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
apMessageBox.errorImage = "/images/error-32x32.png";
apMessageBox.informationImage = "/images/information-32x32.png";

Adam = {
	block: function(msg, el) {
		if (el !== undefined) {
			$(el).blockUI({ message: "<h3><img src=\"/images/ajax-loader.gif\" /> " + msg + "</h3>" });
		}
		else {
			$.blockUI({ message: "<h3><img src=\"/images/ajax-loader.gif\" /> " + msg + "</h3>" });
		}
	},

	unblock: function(el) {
		if (el !== undefined) {
			$(el).unblockUI();
		}
		else {
			$.unblockUI();
		}
	}
};
