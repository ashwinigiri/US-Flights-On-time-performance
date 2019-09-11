import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { USMapFlightsComponent } from './us-map-flights/us-map-flights.component';
import { CarrierStatsComponent } from './carrier-stats/carrier-stats.component';
import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BipartiteComponent } from './bipartite/bipartite.component';
import { PublicationsComponent } from './publications/publications.component';
import { AirportConnectivityComponent } from './airport-connectivity/airport-connectivity.component';
// import {bootstrap} from '@angular/platform-browser';
// import {provide} from '@angular/core';
// import {ɵROUTER_PROVIDERS} from '@angular/router';
// import {LocationStrategy,HashLocationStrategy} from '@angular/common';

// import {MyApp} from './home-page';

// bootstrap(MyApp,[ɵROUTER_PROVIDERS,{provide: LocationStrategy, useClass: HashLocationStrategy}]);


const appRoutes:Routes=[
  {path:'us-map-flights',component:USMapFlightsComponent},
  {path:'carrier-stats',component:CarrierStatsComponent},
  {path:'home-page',component:HomePageComponent},
  {path:'bipartite',component:BipartiteComponent},
  {path:'publications',component:PublicationsComponent},
  {path:'',redirectTo:'/home-page',pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    USMapFlightsComponent,
    CarrierStatsComponent,
    HomePageComponent,
    BipartiteComponent,
    PublicationsComponent,
    AirportConnectivityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true,
      useHash: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
