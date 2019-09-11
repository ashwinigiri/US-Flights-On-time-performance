import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {topology,feature} from 'topojson';
import * as topojson from 'topojson';
import { Topology } from 'topojson-specification';

// import * as world from 'world-atlas';

@Component({
  selector: 'app-us-map-flights',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './us-map-flights.component.html',
  styleUrls: ['./us-map-flights.component.css']
})
export class USMapFlightsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var slicedDataset;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var svg = d3.select("#barChart");
    var margin = 160
    var width = +svg.attr("width")-margin+60
    var height = +svg.attr("height")-margin

    var xScale = d3.scaleBand().range([0,width]).padding(0.2) ;
    var yScale = d3.scaleLinear().range([height,0]);
    var mode = "#sortAsc";
    var currentCountries = "#allCountries";
    var sliced;
    var dataset;

    d3.csv("demo.csv").then(function(csv){
      slicedDataset = csv
    })

    d3.json("us.json").then(function(json:any){
      var svg = d3.select("#symbolMap");
      var width = +svg.attr("width");
      var height = +svg.attr("height");
      

      var projection = d3.geoAlbersUsa().fitSize([width, height], json);  //json.features[4] to fit California
      var path = d3.geoPath().projection(projection);

      var graticule = d3.geoGraticule()  // graticule generator
          .step([10, 10]);

      svg.append("path")
          .datum(graticule)  //data join with a single path
          .attr("class", "graticule")
          .attr("d", path);

      svg.selectAll(".states")
          .data(json.features)
          .enter()
          .append("path")
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("d", path);

      
      d3.csv("cities.csv",function(data){
        return{
          city:data.Cities,
          lat:+data.Latitude,
          lng:+data.Longitude
        }
      }).then(function(data){

        var circle = svg.selectAll("circle").data(data).enter()
        circle.append("circle")
        .attr("cx",function(d){return projection([d.lng,d.lat])[0]})
        .attr("cy",function(d){return projection([d.lng,d.lat])[1]})
        .attr("r",5)
        .style("opacity",0.7)
        .attr("class","bubble")


        .on("mouseover",function(d){
            var x = d3.mouse(d3.event.currentTarget)[0];
            var y = d3.mouse(d3.event.currentTarget)[1];

            var countryInfo = d.city;

            d3.select("#symbolTooltip")
            .classed("hidden",false)
            .style("left",x+"px")
            .style("top",y+"px")
            .html(countryInfo);
        })



        .on("mousemove",function(){
          return d3.select('#symbolTooltip').style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
          
        })
        .on("mouseout",function(d){
          d3.select("#symbolTooltip")
            .classed("hidden",true)
        })

        .on("click",function(d){
          
          // d3.csv("demo.csv",function(csv){
          //   //console.log(csv)
          //   if (csv["Year"]==d.city){
          //     console.log(csv)
          //     for (var i in csv){
          //       console.log(csv[i])
          //     }
          //   }
            
          // })  
          SortMode("#sortAlpha")
          NumberOfCountries("#allCountries")
          d3.select("#barTitle").html(d.city)
          var temp=[]
          for(var i in slicedDataset){
            // console.log(slicedDataset[i]["Year"])
              if (slicedDataset[i]["Year"]==d.city){
                //console.log(slicedDataset[i])
                for (var j in slicedDataset[i]){
                  if((j=="Year") || (slicedDataset[i][j] == 0)){
                    continue;
                  }
                  //console.log(j)
                  temp.push({
                    "AirLine":j,
                    "Delay":slicedDataset[i][j]
                  })
                  
                }
                break;
              }
          }   
          temp = temp.sort(function(a,b){return d3.ascending(a.AirLine,b.AirLine)})
          changeAxis(temp)
          reloadBars(temp)
          
        })
      })
            
    })


    d3.select("#reset")
    .on("click",function(){
      NumberOfCountries("#allCountries")
      sliced = dataset.slice(0)
      console.log(sliced)
      SortMode("#sortAlpha")
      sliced.sort(function(a,b){
        return d3.ascending(a.AirLine,b.AirLine)
      })
      changeAxis(sliced)
      reloadBars(sliced)
    })

    d3.select("#allCountries")
    .on("click", function () {
    NumberOfCountries("#allCountries")
    
    sliced = dataset.slice(0)
    if (mode === "#sortAlpha") {
    SortMode("#sortAlpha")
    sliced.sort(function (a, b) {console.log(a) ;return d3.ascending(a.AirLine, b.AirLine);});
    xScale.domain(sliced.sort(
    function (a, b) { return d3.ascending(a.AirLine, b.AirLine); }
    ).map(function (d) {
    return d.AirLine;
    }));
    changeAxis(sliced);
    reloadBars(sliced)
    }

    if (mode === "#sortAsc") {
       SortMode("#sortAsc")

        sliced.sort(function (a, b) {
        return d3.ascending(+a.Delay, +b.Delay);
        });
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));

        changeAxis(sliced);

        reloadBars(sliced)
    }
    if (mode === "#sortDesc") {
        SortMode("#sortDesc")
        sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);});
        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;}));
        changeAxis(sliced);
        reloadBars(sliced)
    }       
});

d3.select("#topFive")
    .on("click", function () {
    NumberOfCountries("#topFive")

    if (mode === "#sortAlpha") {
    sliced = dataset.slice(0)
    console.log(dataset)

    var sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);}).slice(0,5)

    //sliced.splice(0, 5);
    console.log(dataset)
    SortMode("#sortAlpha")
    sliced = sliced.sort(function (a, b) {
    return d3.ascending(a.AirLine, b.AirLine);});


    xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine; }));
        changeAxis(sliced);
        reloadBars(sliced)
        }

    if (mode === "#sortAsc") {

        
        sliced = dataset.slice(0)

        sliced.sort(function (a, b) {
            return d3.descending(+a.Delay, +b.Delay);
        });
        sliced.splice(5, 5)
        SortMode("#sortAsc")
        sliced.sort(function (a, b) {
            return d3.ascending(+a.Delay, +b.Delay);
        });
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
                ).map(function (d) {
            return d.AirLine;}));
        changeAxis(sliced);
        reloadBars(sliced)
    }
    if (mode === "#sortDesc") {

        sliced = dataset.slice(0)

        sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });

        SortMode("#sortDesc")
                   
        sliced.splice(5, 5)
        sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });
                

        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
        ).map(function (d) {
                        
        return d.AirLine;}));
        changeAxis(sliced);
        reloadBars(sliced)
    }

});


d3.select("#bottomFive")
    .on("click", function () {

    if (mode === "#sortAlpha") {

        NumberOfCountries("#bottomFive")
        sliced = dataset.slice(0)

        sliced = sliced.sort(function (a, b) {
            return d3.descending(+a.Delay, +b.Delay);
            });

        sliced.splice(0, 5)

        SortMode("#sortAlpha")
        sliced = sliced.sort(function (a, b) {
            return d3.ascending(a.AirLine, b.AirLine);
        });

        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(a.AirLine, b.AirLine); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }

    if (mode === "#sortAsc") {

        NumberOfCountries("#bottomFive")
        sliced = dataset.slice(0)

        sliced = sliced.sort(function (a, b) {
            return d3.descending(+a.Delay, +b.Delay);
        });

        sliced.splice(0, 5)

        SortMode("#sortAsc")
        sliced = sliced.sort(function (a, b) {
            return d3.ascending(+a.Delay, +b.Delay);
        });

        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }
    if (mode === "#sortDesc") {

       NumberOfCountries("#bottomFive")
        sliced = dataset.slice(0)

        sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });

        sliced.splice(0, 5)

        SortMode("#sortDesc")
        sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });

        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
        }

});


d3.select("#sortAlpha")
    .on("click", function () {
    SortMode("#sortAlpha")

    if (currentCountries === "#allCountries") {
        NumberOfCountries("#allCountries")
        sliced = dataset.slice(0)

        sliced = sliced.sort(function (a, b) {
        return d3.ascending(a.AirLine, b.AirLine);
        });


        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(a.AirLine, b.AirLine); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }

    if (currentCountries === "#topFive") {
        sliced = dataset.slice(0)
        NumberOfCountries("#topFive")
        sliced = sliced.sort(function (a, b) {
        return d3.ascending(+a.Delay, +b.Delay);});

        sliced = sliced.splice(5, 5)

        sliced = sliced.sort(function (a, b) {
        return d3.ascending(a.AirLine, b.AirLine);
        });

       
        sliced.splice(5, 5)
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(a.AirLine, b.AirLine); }
            ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }
    if (currentCountries === "#bottomFive") {
        NumberOfCountries("#bottomFive")
        sliced = dataset.slice(0)

        sliced = sliced.sort(function (a, b) {
        return d3.ascending(+a.Delay, +b.Delay);
        });

        sliced = sliced.splice(0, 5)

        sliced = sliced.sort(function (a, b) {
        return d3.ascending(a.AirLine, b.AirLine);
        });

        sliced = sliced.splice(0, 5)

        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(a.AirLine, b.AirLine); }
            ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }

    
});


d3.select("#sortAsc")
    .on("click", function () {

    SortMode("#sortAsc")

    if (currentCountries === "#allCountries") {
        sliced = dataset.slice(0)
        
        NumberOfCountries("#allCountries")
        sliced = sliced.sort(function (a, b) {
            return d3.ascending(+a.Delay, +b.Delay);
        });
        
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;}));
        
        changeAxis(sliced);
        reloadBars(sliced);
    }

    if (currentCountries === "#topFive") {
        sliced = dataset.slice(0)
        NumberOfCountries("#topFive")
        sliced = sliced.sort(function (a, b) {
        return d3.ascending(+a.Delay, +b.Delay);
        });

        sliced = sliced.splice(5, 5)
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }
    if (currentCountries === "#bottomFive") {
        sliced = dataset.slice(0)
        NumberOfCountries("#bottomFive")
        sliced = sliced.sort(function (a, b) {
        return d3.ascending(+a.Delay, +b.Delay);});
        sliced = sliced.splice(0, 5)
        xScale.domain(sliced.sort(
        function (a, b) { return d3.ascending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }
});



d3.select("#sortDesc")
    .on("click", function () {
    SortMode("#sortDesc")
    sliced = dataset.slice(0)
    if (currentCountries === "#allCountries") {
        NumberOfCountries("#allCountries")
        sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });
        
        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        
        changeAxis(sliced);
        reloadBars(sliced)
    }

    if (currentCountries === "#topFive") {
        NumberOfCountries("#topFive")
        sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });
        sliced = sliced.splice(0, 5)
        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
        ).map(function (d) {
        return d.AirLine;
        }));
        changeAxis(sliced);
        reloadBars(sliced)
    }
    if (currentCountries === "#bottomFive") {
        NumberOfCountries("#bottomFive")
        sliced = sliced.sort(function (a, b) {
        return d3.descending(+a.Delay, +b.Delay);
        });

        sliced = sliced.splice(5, 5)
        xScale.domain(sliced.sort(
        function (a, b) { return d3.descending(+a.Delay, +b.Delay); }
            ).map(function (d) {
            return d.AirLine;}));

                
        changeAxis(sliced);
        reloadBars(sliced)
    }

});


    function NumberOfCountries(x) {
      d3.select("#reset").style("background-color", "lightgray");
      d3.select("#allCountries").style("background-color", "lightgray");
      d3.select("#topFive").style("background-color", "lightgray");
      d3.select("#bottomFive").style("background-color", "lightgray");
      d3.select(x).style("background-color", "lightblue");
      currentCountries = x;
  }
  
  function SortMode(x) {
      d3.select("#sortAlpha").style("background-color", "lightgray");
      d3.select("#sortAsc").style("background-color", "lightgray");
      d3.select("#sortDesc").style("background-color", "lightgray");
      d3.select(x).style("background-color", "lightblue");
      mode = x;
  
  }



    d3.csv("LineChart.csv").then(function(data){
      //console.log(data)
      var svg = d3.select("#barChart");
      var margin = 160
      var width = +svg.attr("width")-margin+40
      var height = +svg.attr("height")-margin
      dataset = data
      var xScale = d3.scaleBand().range([0,width]).padding(0.2) ;
      var yScale = d3.scaleLinear().range([height,0]);

      var group = svg.append("g").attr("transform","translate(80,100)");
      xScale.domain(data.map(function(d){return d.AirLine;}));
      yScale.domain([0,d3.max(data,function(d){return +d.Delay})])



      // function wrap(text, width) {
      //   text.each(function() {
      //     var text = d3.select(this),
      //         words = text.text().split(/\s+/).reverse(),
      //         word,
      //         line = [],
      //         lineNumber = 0,
      //         lineHeight = 1.1, // ems
      //         y = text.attr("y"),
      //         dy = parseFloat(text.attr("dy")),
      //         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      //     while (word = words.pop()) {
      //       line.push(word);
      //       tspan.text(line.join(" "));
      //       var node: SVGTSpanElement = <SVGTSpanElement>tspan.node()
      //       var hasGreaterWidth = node.getComputedTextLength()>width
      //       if (hasGreaterWidth) {
      //         line.pop();
      //         tspan.text(line.join(" "));
      //         line = [word];
      //         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      //       }
      //     }
      //   });
      // }
      SortMode("#sortAlpha");
      NumberOfCountries("#allCountries");

      group.append("g")
      .attr("id","x-axis")
      .attr("transform", "translate(0," + height+ ")")
      .call(d3.axisBottom(xScale))
      //.selectAll(".tick text").call(wrap,xScale.bandwidth())
      //.selectAll("text").attr("transform","rotate(-45) translate(-40,0)")
      .append("text")
      .text("Airlines").attr("x",400).attr("y",40).attr("fill","#000"); 

      group.append("g")
      .attr("id","y-axis")
      .call(d3.axisLeft(yScale).tickFormat(function(d:any){return d;})
      .ticks(6))
      .append("text")
      .attr("transform", "rotate(-90)").attr("text-anchor", "middle").attr("fill", "#000").attr("y", height -480 ).attr("x",-150)
      .text("Departure Delay");

      group.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .style("fill",function(d){return color(d.Delay)})
    
    .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')  
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          
    })
    .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          

      })

    .attr("class", "bar")
    .attr("x", function(d:any) { return xScale(d.AirLine); })
    .attr("y", function(d:any) { return yScale(d.Delay); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d:any) {return height - yScale(+d.Delay); })

    })

    
    function changeAxis(temp){

      
      var delay = function(d,i){return i * 25}
      var transition = d3.transition().duration(750).delay(delay);
      xScale.domain(temp.map(function(d){return d.AirLine}))
      yScale.domain([0,d3.max(temp,function(d:any){return +d.Delay})])
      transition.select("#x-axis").call(<any>d3.axisBottom(xScale))
      //.selectAll(".tick text").call(wrap,xScale.bandwidth())
      //.selectAll("text").attr("transform","rotate(-45) translate(-40,0)")
      transition.select("#y-axis").call(<any>d3.axisLeft(yScale))
    }
    
    
    
    function reloadBars(slicedDataset){
      //console.log(slicedDataset)
      // var group = svg.append("g").attr("transform","translate(80,100)");
      //xScale.domain(slicedDataset.map(function(d){return d.AirLine}))
      //yScale.domain([0,d3.max(slicedDataset,function(d:any){return +d.Delay})])
      
      //console.log(slicedDataset)
  
      dataset = slicedDataset
      //slicedDataset = slicedDataset.sort(function (a, b) { return d3.ascending(a.AirLine, b.AirLine); });
      var bars = svg.selectAll(".bar").data(slicedDataset,function(d:any){
        return d.Delay;
      })
    
      
      
      var delay = function(d,i){
        return i*25;
      }
      
      bars.transition()
      .duration(750).delay(delay)
      .attr("x",function(d){return xScale(d.AirLine)})
      .attr("width",xScale.bandwidth());
    
      bars.enter().append("rect")
        .attr("x",function(d){return xScale(d.AirLine);})
        .attr("y",function(d){return yScale(d.Delay);})
        .transition()
        .duration(750)
        .attr("class","bar")
        .attr("x",function(d){return xScale(d.AirLine);})
        .attr("y",function(d){return yScale(d.Delay);})
        .attr("width",xScale.bandwidth())
        .attr("height",function(d){return height - yScale(d.Delay)})
        .style("fill", function (d, i) {return color(i.toString())})
        .attr("transform","translate(80,100)")
    
      bars.exit()
        .transition()
        .duration(500)
        .style("opacity",function(d){console.log(d);return 0})
        .remove();

        
    }

  }

}
