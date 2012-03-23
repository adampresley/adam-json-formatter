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

<!---
	Needs the following JAR files:
		* commons-beanutils-1.8.3
		* ezmorph-1.0.6
		* json-lib-2.4-jdk15.jar
--->
<cfset rc = duplicate(url) />
<cfset structAppend(rc, form) />

<cfparam name="rc.grid" default="false" />

<cfset jsonToParse = "" />

<cftry>
	<cfif len(trim(rc.jsonUrl))>
		<cfhttp url="#rc.jsonUrl#"></cfhttp>
		<cfset jsonToParse = CFHTTP.fileContent />
	<cfelse>
		<cfset jsonToParse = rc.jsonString />
	</cfif>

	<cfif !rc.grid>
		<cfif trim(left(jsonToParse, 1)) EQ "[">
			<cfset JSON = createObject("java", "net.sf.json.JSONArray") />
		<cfelse>
			<cfset JSON = createObject("java", "net.sf.json.JSONObject") />
		</cfif>
		
		<cfset serializer = JSON.fromObject(jsonToParse) />
		<cfset output = serializer.toString(3, 0) />
	<cfelse>
		<cfset output = jsonToParse />
	</cfif>

<cfcatch>
	<cfset output = "{ ""success"": 0, ""message"": ""Something bad has happened while trying to parse your JSON. Sorry!"" }" />
	<cfset writeLog(text = "parseJson.cfm: #cfcatch.message#", type = "Error", log = "application") />
	<cfheader statuscode="500" statustext="Something bad has happened while trying to parse your JSON. Sorry!" />
</cfcatch>
</cftry>

<cfoutput>#output#</cfoutput>