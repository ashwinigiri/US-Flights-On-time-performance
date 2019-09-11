import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { Renderer2,  Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import * as d3 from 'd3';
@Component({
  selector: 'app-bipartite',
  templateUrl: './bipartite.component.html',
  styleUrls: ['./bipartite.component.css']
})
export class BipartiteComponent implements OnInit{

  constructor() { }

  ngOnInit() {
    var dat = ["http://d3js.org/d3.v3.min.js",'http://underscorejs.org/underscore.js','biPartiteFlight.js','bipar1.js','bipar2.js']
    d3.selectAll("#bi")
    .data(dat)
    .enter()
    .append("script")
    .attr("type","text/javascript")
    .attr("src",function(d,i) { return dat[i]; });
    
    // let s = this._renderer2.createElement('script');
    //     s.type = 'text/javascript';
    //     s.src = 'http://d3js.org/d3.v3.min.js'
    //     this._renderer2.appendChild(this._document.getElementById('bi'), s);

    //     let t = this._renderer2.createElement('script');
    //     t.type = 'text/javascript';
    //     t.src = 'http://underscorejs.org/underscore.js'
    //     this._renderer2.appendChild(this._document.getElementById('bi'), t);
        
    //     let q = this._renderer2.createElement('script');
    //     q.type = 'text/javascript';
    //     q.src = 'biPartiteFlight.js'
    //     this._renderer2.appendChild(this._document.getElementById('bi'), q);

    //     let r = this._renderer2.createElement('script');
    //     r.type = 'text/javascript';
    //     r.src = 'bipar1.js'
    //     this._renderer2.appendChild(this._document.getElementById('bi'), r);

    //     let v = this._renderer2.createElement('script');
    //     v.type = 'text/javascript';
    //     v.src = 'bipar2.js'
    //     this._renderer2.appendChild(this._document.getElementById('bi'), v);
    // this.loadScript('http://d3js.org/d3.v3.min.js');
    // this.loadScript('http://underscorejs.org/underscore.js');
    // this.loadScript('biPartiteFlight.js');
    // this.loadScript('bipar1.js');
    // this.loadScript('bipar2.js');
  }
  // ngAfterViewInit()
  // {
  // //  var s=document.createElement("script");
  // //  s.type="text/javascript";
  // //  s.innerHTML="console.log('done');"; //inline script
  // //  s.src="path/test.js"; //external script

  //  let s = document.createElement('script');
  //       s.type = 'text/javascript';
  //       s.src = 'http://d3js.org/d3.v3.min.js'
  //       // this._renderer2.appendChild(this._document.getElementById('bi'), s);

  //       let t = document.createElement('script');
  //       t.type = 'text/javascript';
  //       t.src = 'http://underscorejs.org/underscore.js'
  //       // this._renderer2.appendChild(this._document.getElementById('bi'), t);
        
  //       let q = document.createElement('script');
  //       q.type = 'text/javascript';
  //       q.src = 'biPartiteFlight.js'
  //       // this._renderer2.appendChild(this._document.getElementById('bi'), q);

  //       let r = document.createElement('script');
  //       r.type = 'text/javascript';
  //       r.src = 'bipar1.js'
  //       // this._renderer2.appendChild(this._document.getElementById('bi'), r);

  //       let v = document.createElement('script');
  //       v.type = 'text/javascript';
  //       v.src = 'bipar2.js'
  //       // this._renderer2.appendChild(this._document.getElementById('bi'), v);
  // }

  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.getElementById("bi");
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   // script.async = false;
  //   // script.defer = true;
  //   body.appendChild(script);
  // }

}
