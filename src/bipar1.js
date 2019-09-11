var groupColumns = ["year", "month"];   //defines how the data is grouped
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
		"October", "November", "December"];
					
	var performanceColumns = ["late", "nas", "aircraft", "weather", "security", "cancelled", "diverted"];
	var performanceLongNames = ["Late Arriving Aircraft", "National Aviation System", "Air Carrier", "Extreme Weather",  "Security", "Cancelled Flight", "Diverted Flight"];
	var keyColumns = ["carrier", "airport"];
	var keyColumnsLongNames = ["carrier_name", "airport_name"];
	var id2 = "AirportPerformance";
	var id1 = "AirlinePerformance";
	
	//ordering according to https://en.wikipedia.org/wiki/List_of_largest_airlines_in_North_America
	var keyColumn_carrier = ["AA", "DL", "WN", "UA"];
	var keyColumn_airport = ["ATL","LAX", "ORD", "DFW", "JFK", "DEN", "SFO", "CLT", "LAS", "PHX", "IAH", "MIA"];
	
	

	/** 
	 **  	Group data according to groups array for easy retrieval
	 **     i.e.  {"2003":{"1":{"AA":
	 **/
    function groupData(bigdata, groups, groupI) {
    	groupI = typeof groupI !== 'undefined' ? groupI:0;
    	var group = _.groupBy(bigdata, function(d) {
    		return d[groups[groupI]];
    		});
    	
    	groupI++;
    	if (groupI < groups.length) {
	    	var data = {};
	    	var keys = _.keys(group);
	    	for (var i=0; i < keys.length; i++) {
	    		data[keys[i]+""] = groupData(group[keys[i]], groups, groupI);
	    	}
	    	return data;
	    } else return group;
    }
 	
 	/**
 	 *  Get all the key values for each item in groups
 	 *  Format returned: {	"year":["2003","2004"...],
 	 *						"month":["1","2",...,"12"],
 	 *						"carrier":["AA", "AQ", "AS", ...n],
 	 *						"airport":["JFK", "ABQ", "ANC", ...],
 	 *                      "performance":["ontime","delayed","cancelled"]
 	 *					}
 	 **/
 	function allKeys(bigdata, groups) {
 		var groupKeys = {}
 		groups.forEach(function(g) {
			groupKeys[g] = _.keys(_.groupBy(bigdata, function(d) {
		    	return d[g];
		    }));
			groupKeys[g].sort(function(a,b){ 
				if (!isNaN(a) && !isNaN(b)) {
					a = parseInt(a);
					b = parseInt(b);				
				}
				return ( a<b? -1 : a>b ? 1 : 0);
			});
 		});
		return groupKeys; 		
 	}
	

 	function draw(bigdata) {
		/** Set up biPartite variables **/		
		bP.id1=id1;
		bP.id1_key1="performance";
		bP.id1_key2=keyColumns[0];
		bP.id1_header=["Performance Factor", "Airline", "Airline Flight Performance ", "% of Total Flights"];
		bP.id2=id2;
		bP.id2_key1="performance";
		bP.id2_key2=keyColumns[1];
		bP.id2_header=["Performance Factor", "Airport", "Airport Flight Performance ", "% of Total Flights"];
		bP.total_flights_key="arr_flights";
		bP.key1_long_names = performanceLongNames;
		bP.key2_long_names = keyColumnsLongNames;
		
		/**  set up tooltip  */
    	bP.tip = d3.select("body").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);
	    
	    /** Override function for formatting the tooltip text
	       to appropriately show the long name for Airport, 
	       which is Airport name and State Address in second line.
	     **/
    	bP.getTooltipText = function (d, m, id) {
			var tiptext = "";
			if (m == 1 && id == id2) {
				var long_name = (d.long_name).split(":");
				tiptext += "<strong>";
				tiptext += long_name[1];
				tiptext += "</strong>";
				tiptext += "<br>";
				tiptext += "<strong>";
				tiptext += long_name[0];
				tiptext += "</strong>";
			} else {
				tiptext += "<strong>";
				tiptext += d.long_name;
				tiptext += "</strong>";
			}
			tiptext += "<br>";
			tiptext += "<b>Total Flights:</b><span>";
			tiptext += d.tf;
			tiptext += "</span>";
			return tiptext;
    	};
    
    

 		/** Set up data grouping **/
		debugger;
 		var keysPerGroup = allKeys(bigdata, groupColumns.concat(keyColumns));
		keysPerGroup["performance"] = performanceColumns;
		keysPerGroup["carrier"] = keyColumn_carrier;	//sort according to wikipedia
		keysPerGroup["airport"] = keyColumn_airport;	//sort according to wikipedia
		
 		var groupedData = groupData(bigdata, groupColumns);

		/**  Get and display data for first year  first month **/
		var yr = keysPerGroup["year"][0];
 		var groupedByMonth = groupedData[yr];

		var month = 	keysPerGroup["month"][0];
		var dataByDate = groupedByMonth[month];
		var data = [ bP.partDataForID1(dataByDate, keysPerGroup), 
					 bP.partDataForID2(dataByDate, keysPerGroup)];


 		
		/**  Set-up time slider  **/
		var mm_ctr = 0;
 		var time_array = [];
 		
 		keysPerGroup["year"].forEach(function(year, y) {
 			groupedByMonth = groupedData[year];
 			_.keys(groupedByMonth).forEach(function (d, i) {
 				time_array[mm_ctr] = [y, i];
 				mm_ctr++;
 			});
 		});
 		
		/** Update main header **/					 
		d3.select(".mainheader").text("Flight Performance for " + months[0] + " " + yr);

		/** Update time slider  **/
		var minMonth = 0;
		var maxMonth = time_array.length-1;
		d3.select("#min-time").text(months[time_array[minMonth][1]] + " " + keysPerGroup["year"][time_array[minMonth][0]]);
		d3.select("#max-time").text(months[time_array[maxMonth][1]] + " " + keysPerGroup["year"][time_array[maxMonth][0]]);
		d3.select("#slider-month").attr("max", maxMonth)


					 
		/** Draw SVG **/				
		var width = 1200, height = 610, margin ={b:0, t:40, l:220, r:50};
		
		
		var svg = d3.select("body")
			.append("svg").attr('width',width).attr('height',(height+margin.b+margin.t))
			.append("g").attr("transform","translate("+ margin.l+","+margin.t+")");

		bP.draw(data, svg, dataByDate, keysPerGroup);
		

		/** Animation by Month Intervals **/
		
		mm_ctr = 0;
		groupedByMonth = groupedData[yr]
		
		var updateMonth = function (mm_ctr) {
			d3.select("#slider-month").property("value", mm_ctr);
			yr = keysPerGroup["year"][time_array[mm_ctr][0]];
			groupedByMonth = groupedData[yr];
			var month = keysPerGroup["month"][time_array[mm_ctr][1]];
			dataByDate = groupedByMonth[month];
			d3.select(".mainheader").text("Flight Performance " + months[month-1] + " " + yr	);
			bP.updateData(data, dataByDate, keysPerGroup);
		};
		
		var month_interval = setInterval(function() {
			updateMonth(mm_ctr);
			mm_ctr++;
			if (mm_ctr >= time_array.length) {
				clearInterval(month_interval);			
			}

		}, 1000); 
		
		d3.select("#slider-month")
      		.on("mousemove", function() { 
        	updateMonth(parseInt(this.value));
      	});


 	};