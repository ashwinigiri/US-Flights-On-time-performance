d3.csv("2015-2014_airline_delay_causes.csv", function(d) {
        d['aircraft'] = +d['carrier_ct'];
        d['weather'] = +d[' weather_ct'];
        d['nas'] = +d['nas_ct'];
        d['security'] = +d['security_ct'];
        d['late'] = +d['late_aircraft_ct'];
        d['cancelled'] = +d['arr_cancelled'];
        d['diverted'] = +d['arr_diverted'];
        d['arr_flights'] = +d['arr_flights'];
        d['month'] = d[' month']; 
        d['state'] = d['airport_name'].substring(
        		d['airport_name'].indexOf(',')+1, 
        		d['airport_name'].indexOf(':')).trim();

        d['total_delay'] = d['aircraft'] + d['weather'] +
        	d['nas'] + d['security'] + d['late'];
        d['total_not_on_time'] = d['cancelled'] + d['diverted'] + d['total_delay'];
		d['on-time'] = d['arr_flights'] - d['total_not_on_time'];
		
        return d;
    }, draw);