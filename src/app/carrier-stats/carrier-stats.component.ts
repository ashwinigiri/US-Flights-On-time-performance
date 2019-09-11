import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { selection } from 'd3';
@Component({
  selector: 'app-carrier-stats',
  templateUrl: './carrier-stats.component.html',
  styleUrls: ['./carrier-stats.component.css']
})
export class CarrierStatsComponent implements OnInit {
  init_text = "hover";
  card_text = "";
  airline_name = "";
  file_name = "";
  airline="";
  airl_name = "";
  image ="";
  info="";
  wiki="";
  headqu="";
  headquname="";
  AOC="";
  IATA="";
  ICAO="";
  website="";

  endeavor(){
    var _self = this;
    _self.file_name = "data/endevor_airline.json";
    _self.airline="Endeavor Air"; //same as in file pie_chart.csv
    _self.airl_name="Endeavor Airlines";
    _self.image="data:image/png;base64,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";
    _self.info="Endeavor Air is an American regional airline that operates as Delta Connection for Delta Air Lines. The airline was founded as Express Airlines I in 1985 and changed names to Pinnacle Airlines in 2002.";
    _self.wiki="https://en.wikipedia.org/wiki/Endeavor_Air";
    _self.headquname="Minneapolis, MN";
    _self.AOC="REXA257A";
    _self.IATA="9E";
    _self.ICAO="EDV";
    _self.website="endeavorair.com";
    this.draw();
  }
  
  american(){
    var _self = this;
    _self.file_name = "data/american_airlines.json";
    _self.airline="American Airlines"; //same as in file pie_chart.csv
    _self.airl_name="American Airlines";
    _self.image="//upload.wikimedia.org/wikipedia/commons/thumb/2/23/American_Airlines_logo_2013.svg/300px-American_Airlines_logo_2013.svg.png";
    _self.info="American Airlines, Inc. is a major United States airline headquartered in Fort Worth, Texas, within the Dallas-Fort Worth metroplex. It is the world's largest airline when measured by fleet size, revenue, scheduled passengers carried, scheduled passenger-kilometers flown, and number of destinations served. ";
    _self.wiki="https://en.wikipedia.org/wiki/American_Airlines";
    _self.headquname="Centre Port";
    _self.AOC="AALA025A";
    _self.IATA="AA";
    _self.ICAO="AAL";
    _self.website="www.aa.com";
    this.draw();
  }

  alaska(){
    var _self = this;
    _self.file_name = "data/alaska_airlines.json";
    _self.airline="Alaska Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Alaska Airlines";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA+CAMAAAARUnltAAAAq1BMVEX////6+vve3+MAADwAJ1oAK1wAIVcAAD8AADYAJVkAMF/09fYAN2QAHlYALl4APmhwgpjNztQAACOqrbgAACrs7O/Y2d0AOmW6vMUAIEtUcIvk6OwAACaQnq+tt8PAyNEAEkQAF0YAFlMAADJscoaWmaZLVG5ASmd6fY8cSG6jrryDkqWBhZU0VnhaXnQsPF1kaH4rM1cVKU9KZoMADU8AABhheZKMjpsAAEmqkbuaAAADlklEQVRoge2WWZuiOBSGT1hcCEoQk0IowAVkk01qsP//L5uAVleXU+Uyz8zTfZH3IuIJHD/OFgEEAoFAIBAIBAKB4A8ASeh3S/gC6XDcU9OyfzFRM/ptci6Ye3mzwlRu8IcNlQvzaUcBSV0A97+JPItfk3pnQryhv1qXT4eLpaqag6mn/9gg/tOq3HAZS9YugsPyU3yO9bOePMUwUkTnI/dqQxql+Msnvgcl46MN5jIE6/VTfA7jJ5PhFjMnndvg8JBdkarB44IwpZJkbTbNKWJyDBKXhpltRRiiAwX7lUlJyHrL6SGBvjr3M62FQEmv78/U9jFNNNzH1XGzluWJ3MS11KwxPlZgyWW4S6De2YDXUbQIqTUuw2XyyFuSbeFSjWewUK9Lieqz68R+jT2W5XUVhsfV2uq/7ycMyh21XnnpNxBueC3UxypmYPGKq+IHPJqp5gG08xy8PjaBY6QFATdv25ZBp3rgjDzwW271vncS7SNb4uoauR76L9lZEC1tqZc1cZOjGdnBROaTzOSDIh5LN/SwnPR0Uz0lua+k4GpTF7ofTmaoLNimbduBOSqCacqg2Haertyo/yH9bD/ZnIeoz1Mn7UJYHbisyF5U67W5SioLUMMt8q1hkf3YztTUeJm2hHhuqvKi5yHr3jJeUgQKLetvKoz0LUc8vwGQaXbDW89BluuzdDbmiWqO2NpIJc8ZMqsKhw0kJVhrd19VN5wgt3dhv5wrimgO8MCAv/V42FQMra4Rrl0zDN6N+cwHc1bcVsUaeXU5cfBmd+KTq4Z4VdtLi5dUCPZf/SeKmzJYWHdeEJO3dqhqNlddSOc+6PzHHaWXSl5GAdWNVqHgzh0+LjR201fQxMn7ZA9PDLllgCHmg9XE4YLnLbYRsJ09WO7ICtK3SyV3Wg7+vAB/5IM3HyY+epm5RMl8nr18JqE+oMh8rDU/w+Tx+wDs58Z98q1xUY63MwlaJYNCTw1jzjvQKHSFmFveC9MCDG7VlQDMLPsXZ2cUfrTLqbl7amPikPcHmNMh3DkSeF2Gcofxa6cLICcmoGJG887HOaFA/VuTHw+aB5d4iCvCHys+r+fx4Eq3S+Ih8tm9NrwQDc0f9TVmHfoGcIfylvqVxqdhc7BYB+nZA/cLEHEeuy8sP3SVfWDcA/2pK1oPm8PpY9b2Nz7+DxAeEkn7BZ/TxnpdaFjOmaVDHvEf+d9aIBAIBAKBQCAQCB7mb7Q+U+DzguhOAAAAAElFTkSuQmCC" ;
    _self.info="Alaska Airlines is an American airline headquartered in the Seattle metropolitan area of the state of Washington. The company was founded in 1932 as McGee Airways, offering flights from Anchorage, Alaska."
    _self.wiki="https://en.wikipedia.org/wiki/Alaska_Airlines";
    _self.headquname="Seattle, WA";
    _self.AOC="ASAA802A";
    _self.IATA="AS";
    _self.ICAO="ASA";
    _self.website="https://www.alaskaair.com/";
    this.draw();
  }

  jetblue(){
    var _self = this;
    _self.file_name = "data/jetblue_airlines.json";
    _self.airline="JetBlue Airways"; //same as in file pie_chart.csv
    _self.airl_name="JetBlue Airways";
    _self.image="data:image/png;base64,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" 
    _self.info="JetBlue Airways Corporation, stylized as jetBlue, is an American low-cost airline headquartered in New York City."
    _self.wiki="https://en.wikipedia.org/wiki/JetBlue";
    _self.headquname="New York City, NY";
    _self.AOC="YENA176J";
    _self.IATA="B6";
    _self.ICAO="JBU";
    _self.website="https://www.jetblue.com/";
    this.draw();
  }

  continental(){
    var _self = this;
    _self.file_name = "data/continent_air.json";
    _self.airline="Continental Air"; //same as in file pie_chart.csv
    _self.airl_name="Continental Airlines";
    _self.image="//upload.wikimedia.org/wikipedia/en/thumb/9/9e/Continental_Airlines_Logo.svg/150px-Continental_Airlines_Logo.svg.png" ;
    _self.info="Continental Airlines was a major United States airline founded in 1934 and eventually headquartered in Houston, Texas. It had ownership interests and brand partnerships with several carriers.";

	_self.wiki="https://en.wikipedia.org/wiki/Continental_Airlines";
    _self.headquname="Houston, Texas";
    _self.AOC="CALA014A";
    _self.IATA="CO";
    _self.ICAO="COA";
    _self.website="https://www.flights.com/airlines/continental-airlines-flights/"
    this.draw();
  }

  delta(){
    var _self = this;
    _self.file_name = "data/delta_air.json";
    _self.airline="Delta Air"; //same as in file pie_chart.csv
    _self.airl_name="Delta Airlines";
    _self.image="//upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/270px-Delta_logo.svg.png";
_self.info="Delta Air Lines, Inc., often referred to simply as Delta, is a major United States airline, with its headquarters and largest hub at Hartsfield–Jackson Atlanta International Airport in Atlanta, Georgia.";

 _self.wiki="https://en.wikipedia.org/wiki/Delta_Air_Lines";
    _self.headquname="Phoenix, AZ";
    _self.AOC="DALA026A";
    _self.IATA="DL";
    _self.ICAO="DAL";
    _self.website="https://www.delta.com/"
	  this.draw();
  }

  frontier(){
    var _self = this;
    _self.file_name = "data/frontier_air.json";
    _self.airline="Frontier Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Frontier Airlines";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAhCAMAAADj0skjAAAAclBMVEX///8ogGccfGKIsKNdmYYAdlokf2UAc1Y7iXKcl5RYloMTel+ZlJB2pZafmpfl7uuyrqxQk3729vXn5uXs8/G+u7m4tLLW1NPN3djQzszd3NtGjXitycC/1M2ev7WVua5soZDa5+OSjInHxMOppKIAbU3w9Ei4AAAFFUlEQVRYhe1XaY/iOBB1DM6BnQMTaAJJCJD5/39x63Li0K2VVqv+NiWN2viqV69elTNKkfW7rZVP9QzjR3/1ajU/lPckyaexXabodC8/rnTo+5W4gf4Oyn+sjLJC46FefR2M3lrm1WOZsyYrF2QPY3UCltqsDHO5xSOCc4Ifdi+TkZle1Rnuu6oh266Mql1nbHa/hhBNsrX0oNQ9jSa05iieiV0nbc5QWjpud3yZhXO2B08fdwLu3mI8QI7ertS0snrPRr7qYx/cOyq/vVcfCZZhsAJZ53R84EuN5y0/eMIjsHcPfjRSSefTxYDkD6RPzkO6NZuLs9Sg0S3mGYhJrbknhi6yDzxe6hAM2Eh4AEOGR3kBRxnQiT+Bypr5DWZAD+s+Oq6J+/pPkm9s59lZeicGDinfx6nVyYC5K+mCDDcERgz+OMIeDZ48WitIcCxyCVTqqJSYZIOyaikudly36rutsDk+YGMwkg8yTEpiB7k0Eejeyuwq3FAQ6qGZSkyanmJnowgvBJawk7Hc2ihYzDXC1fMJE7wQHEwkR5iwT8K+7EHhLoGQrDBUCmhsazFYwYwEpDjGuoOUmW8VzaUjXJMoTU1JEQrRrPxE4tJEcr1b0h8jIaMKNYPwqw0b6k5lwraSwDTqtv6saFOLs+P1eh3GHGHpA1eCeS64NDv13BhQe0ANIuFqUFvSpZKwMW4qFZevnBDw1k8EOqtVqKDVqCVw78T6QLeQ/Jr32aXBthLklTNHYrajjpH0mxNUSUcR0OrNhz6F5cg92zxYwJsmoVEdH53WJk/1iasX+oKGyJsOrhYBsFTQUtYjN0YT0ojLH7wwLP8nP8RWIofEdRraZ/IIRRPlkQFz80ANLbRj51y32DGuE6By4G7RinkVngZxZyZ20f7UJZDrFLoaxh8iJg6X+p64qkTNmDkrYdjwgjOSEEjoWjtJ52q0kuY5AVsD76c92mGtNNWGLrTXUgdoRIil17o+cF8WNVNHDXpebg6tn20vvWBD4pruYwg8wNgZ1peJ9hLXNuhMy4cDO9ZmP90zEhJ8GrCaiVEvmkxj0hd+veb3nKo/vR+DldLPUCr0bvIzu77P2doB2Bn1Q9oaOrZ0z1Tzu5thwtI1fC6rEIW0/uWzzDDz/J6vT/EYpZvrl7uMfAxEzVDFj1Bvk5XbNo2efW3wtXlma0is3+URGkykAXqEMNSPLwfAw+8FbdIr36Xl7hDTVWeYV+5CVuOiVL6fMuIKp/ZE4mhgbAPNeNfyHO7gl17klcM9+IlmNl1Jg0KPuDKJUtAxUSyiL6OvVzUcYEpKpsfxIWQDvq6x/+n8IWGUh6hi2iPsncLWCZfGeOl4Vc/jPjY46skBk9zieL3hv5n/sbP8tb/218i+3Av7iy8Kr84VWHNS6lJ80WJVnNRXMdOyUg0uF2+lzsWruPh/v/f/2lygJ+WdA1wF+C1gcHEd43KAyxUNLgOuoprnqlOdqy7V6/SrsE6uQioEl3sjltsHrsp1jAtW0C7uAgd/FRb4uJE7wXU+3QrAssU1F64riC/nXpD128u5qvtVWN4VpzcJiPMInjGtF/cV4Tp3rqgI19w0DejqdK6cO/8mrndRvBwyJLgub1cpxNXRf3IZ1wWVFeXRA/LOzb+Jy7nudkO9eCxL1NeM4rkgcaDsgAsKk/gCA57ml5srlOKv2a0Bn8rPjffN7NW76RQMTjAAg7/47zYDAt800B5wFrd0TTWjvv4BhQ9UmSwtWOoAAAAASUVORK5CYII=";
  _self.info="Frontier Airlines is an American ultra low-cost carrier headquartered in Denver, Colorado. The eighth-largest commercial airline in the US, Frontier Airlines operates flights to over 80 destinations throughout the United States and six international destinations, and employs more than 3,000 air-travel professionals.  "
    _self.wiki="https://en.wikipedia.org/wiki/United_Airlines";
    _self.headquname=" Denver, CO";
    _self.AOC="CALA014A";
    _self.IATA="F9";
    _self.ICAO="FFT";
    _self.website="https://www.flyfrontier.com/";
    this.draw();
  }

  airtran(){
    var _self = this;
    _self.file_name = "data/airtran_air.json";
    _self.airline="AirTran Airways"; //same as in file pie_chart.csv
    _self.airl_name="AirTran Airways";
    _self.image="data:image/png;base64,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";
    _self.info="AirTran Airways, most commonly stylized as airTran, was an American low-cost airline that was originally headquartered in Orlando, Florida and ceased operation following its acquisition by Southwest Airlines."

    _self.wiki="https://en.wikipedia.org/wiki/AirTran_Airways";
    _self.headquname=" Denver, CO";
    _self.AOC="CALA014A";
    _self.IATA="FL";
    _self.ICAO="TRS";
    _self.website="https://www.alternativeairlines.com/airtran-airways";
    this.draw();
  }

  hawaiian(){
    var _self = this;
    _self.file_name = "data/hawaiian_air.json";
    _self.airline="Hawaiian Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Hawaiian Airlines";
    _self.image="data:image/png;base64,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";
    _self.info="Hawaiian Airlines is the flag carrier and the largest airline in the U.S. state of Hawaii. It is the 10th largest commercial airline in the US, and is based in Honolulu, Hawaii."
    _self.wiki="https://en.wikipedia.org/wiki/Hawaiian_Airlines";
    _self.headquname=" Hawaii";
    _self.AOC="HALA005A";
    _self.IATA="HA";
    _self.ICAO="HAL";
    _self.website="https://www.hawaiianairlines.com/";
    this.draw();
  }

  americawest(){
    var _self = this;
    _self.file_name = "data/american_west.json";
    _self.airline="America West"; //same as in file pie_chart.csv
    _self.airl_name="America West";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAASCAMAAABhPLwgAAAAkFBMVEX///9Wi3JfkHnG1c67zcTw9PJmlH7m7Oljk3xbjnaCppSRsKGmvrJznYnfQi3s8e+xxryduKvU39psmYP3+fiKq5t6oY7e5+LO29Txt7LdKQDeOB743drqkonkaVzhUkH88O/dMBL1zcrvr6n65+VLhWrme3Dywr3lc2fjX1HbBgDgSTbpioHrmJDtopz31tMO37oZAAAEUUlEQVRIic2Wa3PjKgyGZWFjMDgG3+u0uTTpprez/f//biXATTuzuzP5snM8HQfbAj1Ir0QB4vVxOj3C/+4675ft9rj9uL6Zbl2iXwfFnyxuXhIOx81ms91slivY2P/F/jdXm608o/+DSXcz1w9i2r3Tbb++KTJx2xIVzmmE9e8tpuzmgC0UqjNwwO7Tm1xVcdCGJekvz/MJeudyCqRw9LL0vuSf6C1Hnwy1bciWtiVMDmUex3RZFQI52QKcc2RZWJ7a2xZy/jBbaIOTxvuYrPOy2T5Afzlujqv2xw5jXhivpXkOUXtotOJwDCP7V5rxnIvRQEpTY+lZz4KsEGaN2jqtZAqg7FTYwFMBmURNzE8MzHfJGzQIlpxYkJhmHChe8PMZdp8Ca7SUYRPw1NBOaaNOmsFCg2bQAgzR1mg8B6BKgUVdgKD1Kt0IHIYKqi4frR3qbghxalEqDn5OQtSVlwhl0Arfa+YwEiw5cbO2np/f9rBbHg/vd48UN7hsTxwEtGqENAtGGrqw2YY0MlrmajlYFNIC18CSwEzWA0oQGecBHRT065PcvbLKJK7MgsvKL1zKJi6Injh+d6+n8ws8A+zg4Q62b7xIjf2I/FGggULrr1zGM5fF6E4oGeXjSGBKtRMOiUvGQK5cSoLC/pNLfOOSOF25dBln7I8Edznvzg8AP19ZYaUeyA8Lx0pFrgnRybEuiWtuYx6HlL7B+CEWCNYNKsfThBrHHIzq2isXZQc8ipRHX47f8yg78MxV1cWkMUr24/UdDvCyfBxIabuwdzU4LznJldWTrwZBrzAjLuxYk8RVmTC3z+ZZh+rptaTcVwPtXEhFFEWndPvJZaRxRg6Ja0SVf+UygkTFXOzEa7RhzjM1ictypOb1g0acxk5K2ZEH0GXtlPCkBzW1PdVDTuFiLlOtYbB6TiUszaw6ohR6bsuwvXHl6lVcsoh5dKOEr1wDVLJmLnYCc6dTPe5g83Za7u6X91TzdU1sVH9ZkUsNrrrqq4rxcjFKVFcY+xKnfAbsCEWsvd+rlYuAw5J50hehf+cqsOuivtg6ixL7b3leLrB/ezkegoeQYCpsMugLzUK+cgmWfkXd23PZKJPnQyyBWTEFQ0bdi4Ja6cplwnGQq3rVPY5ENF+5qMISVy/oUEvS325fAB6X4yk8Sd2EH2wdBXSc+fBzisTZN1kL2oQkjmocfDhb2iwcCgV5I1xu9GTb5bK2rKfA1WvFqFTZTeIi3ZZIZq5JXDBwHimoHn2dip16BR9Auw18LW1TAyct5548O420oeapBZ+Fft8o6vc2CCGLiQz1jbQlQbZZaah5TzGX5DQW7TiEfv9EJ0dmyoxqSTTc71msPbLicZyyeJCE64Fv95f0FPYPEyk4Nv3elWXbtnQ+zj2UBbThYHOumELvymPUQxHxig3Z0hIinH9TPD+ndeGSvxD8DD1ZzX0/FzCHBUhxwclkb/yf4V9evwBm3kJbuew7gQAAAABJRU5ErkJggg==" ;
    _self.info="America West Airlines was a U.S. regional airline headquartered in Tempe, Arizona. Their main hub was at Sky Harbor Airport in Phoenix, Arizona, with a secondary hub at Las Vegas McCarran International Airport in Las Vegas, Nevada."
    _self.wiki="https://en.wikipedia.org/wiki/America_West_Airlines";
    _self.headquname="Tempe, AZ";
    _self.AOC="HALA005A";
    _self.IATA="HP";
    _self.ICAO="AWE";
    _self.website="https://web.archive.org/web/*/http://www.americawest.com";
    this.draw();
  }

  aloha(){
    var _self = this;
    _self.file_name = "data/aloha_air.json";
    _self.airline="Aloha Air"; //same as in file pie_chart.csv
    _self.airl_name="Aloha Airlines";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAkCAMAAABc3TOuAAAAk1BMVEX////xWiL09/vn8PcAYrfwTADwSQDxWB7wTwDxVhnxVBT++Pb//fzwRgDxUxD96+b6ybz5w7Xzc0vyZjb4tKL708n72dD3rJjyb0XzeFL+8u+bvN72n4j2mX/4uKfyaTz0h2jxXyvzfVnM3u9/rNb849z1jnL3pY8AW7VZk8sAc770gmHe5/NtotK1yuRnlcsAarrbuiVUAAAEYElEQVRYhb1XaXejOBCUktXFIcDgC3P4gmwmHs/+/1+31RJO7KwzeTuB9AcLhB4qqqtLbcbGj3QWLD9bU84n2Pi30UvF48UthujdmmUcf4p83NhrznncvU1EdRyvb5Z0reaymQxBuFi8n4pmFqh0/zaz4JjR4dWapTRcVlOBKmsr4za8mQtXhMrO3mYKpJSrVfI60a00NyKbClUmLDbUT9dzkUe1epNSLTk3iqv45QJTGK6vUI4ctB/C3Khm7VCtI1Z6bUUkNL1OLTeewGSmuZoggWGXFbRlLbgKCNb26mFPatfgpdIxGUDYAqao2dpwn7VCG27V2N6QFHsjtUb1N5IrVZGWqaDKYku5XAruUCQoNJovcwBHxRWaB0RWMsO3yG34yS7/L6JmJTRkgp2yEqh4yfBrI4KjDRwhJVSwowzq4TJi4c4ARco6LNuVXlVGj6v18Elr5dUk98iK0iUDW9i1XFHqROK5yiA6qoQliwiVWLASn6JTV4BcrMtRUS1d2aHSISbHCxK5iLntWWcNzedrAmebsqVRWcZazGNVlGNU7ZaoGtlC50Y7opTIlYGKlAIboVUmR4Y8h2oY/K1OKYNczlnUBm4ed2I2LlVV7JnS+bwKeBwWWuWMEhmEifBw3sKRpxuDIahJ9WbIvShGBRW2niobNFAz0hgqJVJWayWSEHqzO9o3GODJLHXZVM48Cmvsy4qu9WxcB+3ouyk7fcjmgkTcEFmFUHLBoBtR1UiTrd3mZAdrt95xZKzSe1bJwOpxqWKdr7+APJCuIZdc6SyTCldby3XFZhDzLHGUIlGdc3+xdTCVrPEOuNrIh03ntSP28MAEDMiMKDONIFSF4MEW3h7ALYgyLlAOSzp/RMN6CzGqdFw4Q5SB/2Zq2UrUFrYDCkqRmLOEnB5uWgciLcWlnalx/sXwzHIV58txDf01cudJgr45hA8ZHHchqUbpBUwcci+okwBldA5Z1ySkQq58FzauHVxFb7mHQC1LQHbEKIeoxoR1ZEwwcajMV6QZ2plwMjhDpE690vUorukECrZ1BG73wlsAOglBxyA3u6nhDBG6IpQug66940GV9N7E4BpOdiZAewUKY2sn6+zehUthQDIud4E3y0AEFzcXdeuK1LaUu776Jq4uBoRiWiBh9vVwcVcqruDzOOrk9pvgXKJ3zeeesSccv6Lhw1HcZLHWIoe7Ri/avvznr8/EEToRqfxphwtZMHdrNJl90wxgJrIlisf7gcx5eujQBSoGJSmxvqvrD17xlWB/3Y2/fQs8dFnU6KaxyO82vI/P91/xlfjBHu7HoHjSOPcp6z5wgA9e8LX4OLutb1DifkIF/UEkO6mF+PZS+zzm2fyPTfLRD5d0PJweb+aHEY+HBafT8ODwmwR+Pf45+E02/nZzfvZAnofnfjz8OJ09quezh3M8byZEdT7+uoV1HPD8uoV1fL7AGhYejscJYf08/byF9bAZ2DqeruAdzpsLrKNna+Nh/Qt8jUcPbnwFlwAAAABJRU5ErkJggg==";
    _self.info="Aloha Airlines was a Hawaiian airline headquartered in Honolulu, Oahu, Hawaii, operating from a hub at Honolulu International Airport. Operations began on July 26, 1946, and ceased on March 31, 2008."
    _self.wiki="https://en.wikipedia.org/wiki/Aloha_Airlines";
    _self.headquname="Honolulu, HI";
    _self.AOC="HALA005A";
    _self.IATA="AQ";
    _self.ICAO="AAH";
    _self.website="https://www.alternativeairlines.com/aloha-airlines";
    this.draw();
  }

  spirit(){
    var _self = this;
    _self.file_name = "data/spirit.json";
    _self.airline="Spirit Air"; //same as in file pie_chart.csv
    _self.airl_name="Spirit Airlines";
    _self.image="data:image/png;base64,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";
    _self.info="Spirit Airlines, Inc. is an American ultra-low-cost carrier headquartered in Miramar, Florida. It is the eighth largest commercial airline in North America. Spirit operates scheduled flights throughout the United States and in the Caribbean, Mexico, Latin America, and South America."
    _self.wiki="https://en.wikipedia.org/wiki/Spirit_Airlines";
    _self.headquname="Miramar, FL";
    _self.AOC="HALA005A";
    _self.IATA="NK";
    _self.ICAO="NKS";
    _self.website="https://www.spirit.com/";
    this.draw();
  }

  northwest(){
    var _self = this;
    _self.file_name = "data/northwest_air.json";
    _self.airline="Northwest Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Northwest Airlines";
    _self.image="data:image/png;base64,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" ;
    _self.info="Northwest Airlines Corp. was a major United States airline founded in 1926 and absorbed into Delta Air Lines, Inc. by a merger. The merger, approved on October 29, 2008, made Delta the largest airline in the world until the American Airlines-US Airways merger on December 9, 2013."
    _self.wiki="https://en.wikipedia.org/wiki/Northwest_Airlines";
    _self.headquname=" Eagan, MN";
    _self.AOC="NWLA005A";
    _self.IATA="NW";
    _self.ICAO="NWA";
    _self.website="http://www.northwestairlines.us/";
    this.draw();
  }

  psa(){
    var _self = this;
    _self.file_name = "data/psa_airline.json";
    _self.airline="PSA Airlines"; //same as in file pie_chart.csv
    _self.airl_name="PSA Airlines";
    _self.image="data:image/jpeg;base64,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";
    _self.info="PSA Airlines is an American regional airline headquartered at Dayton International Airport in Vandalia, Ohio, that flies under the American Eagle brand for American Airlines. PSA is a wholly owned subsidiary of American Airlines Group.";
   _self.wiki="https://en.wikipedia.org/wiki/PSA_Airlines";
    _self.headquname=" Vandalia, OH";
    _self.AOC="VNAA111A";
    _self.IATA="OH";
    _self.ICAO="JIA";
    _self.website="https://www.psaairlines.com/";

    this.draw();
  }

  skywest(){
    var _self = this;
    _self.file_name = "data/skywest_airline.json";
    _self.airline="SkyWest Airlines"; //same as in file pie_chart.csv
    _self.airl_name="SkyWest Airlines";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAjCAMAAACuGmgoAAAAb1BMVEX///8jPocgPIYdOoXh5O0xSo8aOIQVNYP5+vwQM4Lu8Pb29/qIlbt8irQLMYE0TI/Z3ep1hLAAK3+dqMdGW5cALoDK0OGTn8Ho6vKstc+4wNc/VpXBx9tufq05UZMoRItNYpxcbqNkdagAJn4AIXz17y8AAAAHiUlEQVRYhb1Y2ZbkKA61wQbvSxLG+1rz/984EhJ25OmuqKx5GF7SEEhI4upKZBA8IxmiBkeU30v50NixX+cx+P1IsshOpjzPBGc46dujTbz8gvL2g/znkdvi3PYQxh6/VhO5RXtsu9Badc3vBZdjjoXSSp84i147Tipn13C+6l1qrV/J/2qWPeF4KdAuIaSqYoOrfSUFrMn6g17zBWKwSZckQZMCJyP8BPJCfwr3x1GkytkUhv5Ph8cc0k3U+klUk0SKnmQbyeseJvmpSNeW/Z01uQdSn5JuqUNFpsA5TZCR3vCjvy3bpReYjOyeM9KyqrT4oT0JgfPa+LxFkzY1j3Y6WVtlAvtF/u4f4JVcbLyATcnBkwo1F+mfxb+NadtVlWqVkkDO2kSNaM9m4UBW9T6M8sh/rytjYbmB8NJxsCsI3jDznbY/Rf2aIppD+aJ7XxhT6nTnn6lOtdzrMWF8EKJ/M4ZNs/FZkKzK2wXEMPGddj8liXyW387z6BI7QiS5zrIfbTMkUcxgmR7ZxDHaG44zY6YX6FNXEtjdZw3eBHslZwhX3ox9UZaFWR7R3I5F2bZ+MRmWnZFqBkdTHrlwef07FKaKzYVdWQPcWbTXK5ZV9x+3KwcDgU6Pw0hmhkeRHoKoI9ZRI9g+p10KPJamnSgj9qeuKu1G5RanygdbhHrGLaVXB/rCgyn1WZdwvUssFapQjqsqdzOnUm7FOBxBmkQ+XBC9PDCM+jlb5lQSZl0oN7wV+3JYklrRuXNWVkIIckVSBpvbLrQirVvrgJoze6V90MQSzBGyFjeqg6gikJ69E++moH/82xOfTLqwu9MjwxeRm4ozcEERKMtrJ8P6a37NW4yTeHamB014+0l7qhVj1rD7XzbaUIvo2oVOrhBwfUVXT+EKuyZ3VpPHW2CJe8Q+zRSSeEoG4iAgkTWlmwBgrRquovrV5k2xHjtGa8wZhEUXfhtCx2DYSJrl3LycWbIIMjoW2WnY3BmqZb4X2di5a6M4eKyplj8co1GGqbXhu5kBqOV+XJBoDRQ0VwiJrQiDrZbht6Ehu1ryM+wpsdQFOUOZjGw+MreNZB9wDm4TtaMK3WYb5zyHU+zZjVh1Tr6+bIWF9sXBxpOMOt/obty+1PtlitQGsdMsjpM9B7sCIndAXELg0y0nhy4XVKBWB7LUMHnJw/BpWGK5YMqLnULc67l0YLppOO2/kdqyxtVb0CrT8OXWvCpmYF2CNqTLQlGqG46LGt2Z1YLXKuRCqAeS8KXfQCfW82WUb4gWQneuPVvIE4zIt5FE5gxvy3Q/VizoFewOc6Q4WDlwCUvsZnfhyfEHERsO12y99Lzt0sFUyK5PWh8wilpo775E1v9sPhI7e8N0Uarw+xAWWwQ8T7WDJh3DwGm3XSiZjq6Mi5mxkhbWGyAU0F1aVVU4n9CpvCr5hhu9JgH3C1g3bnsgxpObem4Au153oPwSZBRRpy4psboxsBxVxzxQcoi2ttqH2CNJyfi4CjPZgY5NxgOKsD9CboMnZdchYbEx5QXdsgxdzU5mv7W/a129P70eNRu6cKiRGxSCyluP6wYC8QZS6CT4dlQZZZx2WRTx5RQvKW+7Ft+5Mbyw35HQ7uqI4sXuXb4Nlfvy3rVStEuMIVa+wKPQmTYPntZofC3MDELiaTk8QcprDguybwiyiVUDy3CxEJortEeUusCwxndi2nK7hz0Gg0Xi68GdE7uC4oimf6th0LEFvgdxArNnUoE8HfS/OgxCOI3wYKo15ndD8IQE9y2SKu2CV+fjAmXrPHY2BrKa6QFp2jN6CJlinkRSy7s4ujBgTXvmcK3ck4DCJOcuSLfTL62A2ncb5FSaBfS6d+sG+YF2Ue0jYcahBCQt/I0vtJHtqpqn5aYceusE0VPsEx56BtDA3W1cNc6Tyreqo4jac1lf5+NAfzus3IMvsNs7n4J1HVbzIsWuQ8iYGM+Nr+ktYUO0EltwwUOGuLDgy45GVZB6anIUGCyEql5YEjtmXVyDVgdTMNq14AaeMzKDvICmTTmCSffTdaPHHuPYW0yG2n3HoQkeXKvWyR6xH7vrfqf9XqgJwVFZqxSbQujOQTneUWJeUuORuLa1tK9Zd5ilaj/u3jSzplgvGG0xNfTGiHi4DvdtEnELJunU+yfeGmRvC159tECnu2K/3OT3idBX09q9LWmWcZxs85ePTRr+gVj1f977fxpN0Rcrl0s5314tvs4uBVeQqDSlX4zKwW/MWg7NgDfX+MeuLSB0/D2MZr33/3SUX1r7N2x1v8Dz1b/ixvukNRn9YvOUu2z2n8eaB7a/xZKMvUhWG9gPb9V/Hc0bY6bnvTzag796/5ybirx/gvgoaL2BpiiDZeGZKZb7HVicbjX5G9ueV5Os1vsWo3XcOPKlzyPD6t3386+NyUfIQn8/jh7v5RQ9HVdTgpd50d7yfxzDrlxRlErF/W1WXmZBQe5mp0fG2tj79kqbeAN6b6KZgPdK3pFD/ctYEgyM4Caavvz5P6bsecxzXc+v9fYUz8JSs1KLdLG1GZxUsOJ87Yveu+BRhB8Nk2cQXaZvB3+GQeWJMc1/AX/0eMFyEnUiAAAAAElFTkSuQmCC";
    _self.info="SkyWest Airlines is a North American regional airline headquartered in St. George, Utah. SkyWest is classified as one of the largest airlines of the United States. As a regional airline, it serves as and flies under the name of other airlines it has contracted with such as American, Delta, Alaska or United.";
   _self.wiki="https://en.wikipedia.org/wiki/SkyWest_Airlines";
    _self.headquname="  St. George, UT";
    _self.AOC="SKAAB12R";
    _self.IATA="OO";
    _self.ICAO="SKW";
    _self.website="http://www.skywest.com/";
    this.draw();
  }

  ata(){
    var _self = this;
    _self.file_name = "data/ata_airlines.json";
    _self.airline="ATA Airlines"; //same as in file pie_chart.csv
    _self.airl_name="ATA Airlines";
    _self.image="data:image/png;base64,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";
    _self.info="ATA Airlines, Inc. – formerly known as American Trans Air and commonly referred to as ATA – was an American low-cost scheduled service and charter airline based in Indianapolis, Indiana.";

   _self.wiki="https://en.wikipedia.org/wiki/ATA_Airlines";
    _self.headquname="  Indianapolis, IN";
    _self.AOC="ATAAB92R";
    _self.IATA="TZ";
    _self.ICAO="AMT";
    _self.website="https://www.alternativeairlines.com/ata-airlines";
    this.draw();
  }

  united(){
    var _self = this;
    _self.file_name = "data/united_air.json";
    _self.airline="United Air"; //same as in file pie_chart.csv
    _self.airl_name="United Airlines";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAkFBMVEX////+/v4AM5ni6fQALZcAK5d9ksU+WKgAMZjd4/Dc4vEAL5gAGJIAJpUuU6gAKJUAH5OFl8i0xOH09/ycp85GYq00V6pphcE0TqMaRaLr8PjI1OlOZq4mTKQAOJ3Q2esVPp5yjsa/yuNVdbmksdWGns6svN2Rp9Jefr5yh79jebhabrFGa7U0Xq89ZrQAEZC5dy8BAAAHl0lEQVR4nO1Yi3aiMBRMeGgkBVRUCspDQKBWu///dxsSEkDxrcWew+yWTiLCeO9kiAUAUgAAYEEBY+X/Yg7A8wd2gWJwFwOtDLwp4FuioZC3DoAa6xCQHdg/PuSs0t7KHrxzeeu3Ksdp8GaKQ7kgq/Fr2WVv/QEc6oVn2fPuBhuzLMWY4SAsfzHG18PJw5FZ72OwyViruQ6+9gS7aBHhTnAX448WfkEu6C3xiCOeigN7dV2XdtQFAm7gZsq/dBX+0ZR/r252XZXX4bz1LhgTnn7pnVO+ynbYYFW7T7DHU56LqbHOnd7+aY9scpwfF3anz2BUS4P9dnWuw6F+cFwvKL56tDLwEOAR6VP+ZnRdldehT/k+5VsZeByPeOsk66JCl1GLavGHB+58buerFtOzLf+eqKrWKOIvN+0QXVflT0Jswo4YFKN2JsJXROJtDLbHqUh5KDgUKV/r9UkGau+541B/ztWfeB2jT/nH0af8Taiq1ijiLzftEF1X5U+iT/k+5Z/PuqjQZfQpfxOqqjWK+MtNO0TXVfmT6FP+nVP+TN9ghym/HLTjy+0y5UFiqq34p9Xs1pry4MaUv4klhQasYIykBj40nvK81xBWFj46gAusvM7VLN1tt1/z3dwIVXQgCx6stnZFN3TmegaC3SaPN1M72+WGitCBrM5SPlqvsyzO1/kmW68NCdWbyOHKssxsBAlzmQmsglFA8rpVnkpmS16wCoA2qD5jiffWhgCUFlvmu9ze2BnRtU/tLx81ZLFiTYzhMKBs5A0XGZ2HM2O4CugZo3j4mZSBmxnDz4iy6HNY4YeuDuu7miHvLVohb/l4m3ADFxeN7PUm26zTIF0G+U8eK+jI8sDWFWVJrab9w/qEmW4yVsxwWVxEW6jjWXnyYKx8TOknSD/IWlIUBZNfpk+vY3kqHRLoYUQ/82huKlihU2Mz5WucNDHe2et1bM8XcTZdLtd2Wa9SFvWfbSKplPUhqRNmuokuSYpDHAi0IdZnpRMHujSe0lMj3wmdkFyMHEODTlmfWPIXDPOATo3mCvIdxwl1RcJ+Klwf2fEg/lpHWpoNjDzNpnt0ZHkiCy1pCZgsWsNClmTOiXomi4HJot7SNC2wVeSkhDCjElnIYWYalWYisvB8SU6I5qakLrhbQTSMB9HEUBbbFAa5t08GCyyqVd7rpCyE1KFWyRLVEjvcgYmdQJiZyMIesCjKKSJL2VEx8rcqjSNu+sjehWGsLfMwDDdTkC8Gtl/LLeYtU2qThY2Y1Gshj9qqxVZrIWtZlyVJe9rDnyNZYKZI+oCfOg032dBDkygZhCiPNkHs5Mqh5amsYiS8VchSVsHXWNK/p3PmrUa16HuJLESrxR5gVBZZBipZLKVwIYs8b8hn/ALle7Wd/p0keGzMXM3zpdhK413YTPmyicUwaMpywc5E2HPQseXpyGJNFEPircLfxOFGeX4pq6AzjPgqJw+f1POMKNgb6jxJM2mx2sg/Hm5afqMjhXUpIyzjTVRWMrBsBZHHaYvl25tIvNVA1US38hZB4qy3urKeDkiUJCD7+ZhH2RY1U345lvBw6lpu5CCEl6wlTBZwSYelNlnwUBatFnYsl6G+EkdaMN1ipBgud+XUs6Oh4k2smWeoX9ly7xjJmsRNPeWtvY5wOFwNQ1Jng81zWcD60bmsNm+VsqgfaBPnLNXnzKw0tz4XxqevIEVPRMonWM2ShaPmgR0qfgzS0LRtBzU2NkUWk80Pjei9C3jKm3OZXiZWcZXyOmYpX8rSlcLykG1aSMrjMuVNX6R8OWUqxrT6Ir30FGxHCOuxtfQ930mChReHjZQnv+TZylFU7KxmMjdw5nlb5lXXNrykdGLmGU5UeXzjGT81y68MgT1bQ/KWDRerr9motrdxd97CCxLfcGwr3qv+INj4uYeONjayFgSBJleGc0eaXL7qaiNXzI602maADEfVEIxqKHcQcjmsbSFoyiehb67SHSnGSkv9fbiX97GHGil/HrW9Ljxm94C8ObE3OpZsd2uG3sQdhNhIsl1h+VEVp/U/nbTd78Je/h4k48hxDH8mh4bv56NBSFbizi+8RbZ+3e3lEz1fO1jxN6lhhj/B1PD38R4h9BGsbUt82+FObDlcj1v28unCS7+xtNhbibPDRhbtw51HAnJMZXW2lydbbsuSXbdYCbJLVprl0hyWa6sQ1o6CQVjNXWWu278unoS47aGm2oH7CJxgoL5Hv52V2wX2Ixi3etl6tiobpuaFO3UAIuXvYkDctM5utPVv4XKjr3XCC9jZu7Zke325PEmLuCTsMOWP78C/tVSWh7+f8nUm/FRj3aT8RfbUXjwXXaX8wSWOXuhTvk/5l7Gzd+1Tvk/5u9hTe/Fc9Cnfp/wrcOiQO9CnfFPYWfYM9Cn/EHtqL56LPuX7lH8FDh1yB/qUbwo7y56BPuUfYk/txStQZf19KX/nXYXTj6/8/il/ZGp+HgQnGF808C52PuVBi9vFu/nd29mD/hZR0GDvgVpwXq3qUsw/SdZhnPYpf0vKNx3Yas3rkvmJjF/7xgfNq3G63bWXzpvrMdan/A2sT/nb0af8o7LKnOhTvk/5e9mfSvn/BG+NSrcAFvAAAAAASUVORK5CYII=" 
  _self.info="United Airlines, Inc., commonly referred to as United, is a major United States airline headquartered in Chicago, Illinois. It is the world's third-largest airline when measured by revenue, after American Airlines and Delta Air Lines. "
    _self.wiki="https://en.wikipedia.org/wiki/United_Airlines";
    _self.headquname="Chicago, IL";
    _self.AOC="CALA014A";
    _self.IATA="UA";
    _self.ICAO="UAL";
    _self.website="https://www.united.com/en/us";
    this.draw();
  }

  us(){
    var _self = this;
    _self.file_name = "data/us_airways.json";
    _self.airline="US Airways"; //same as in file pie_chart.csv
    _self.airl_name="US Airways";
    _self.image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAByCAMAAABpyLN6AAAAk1BMVEX////R09TP0dLQ0tP29vbt7u/e3+DW19j6+/sAIj0AHzsAIT3K1NkAJT8AKkPy9fcAFjZgcH0ACzF9ipVreIQAMEm5w8kQO1IAHDpRbHxle4nBzNKxvcUAACyKl6Ccq7QlP1JvgY1viJaOoKpYZ3SjtLxAWGkvUGQbRFpPYXDi6OuXoal+laEAACMAFDgSNUxBYnXSLijyAAAE0ElEQVR4nO2baXeqOhSGYysYhgQcCKOAUAbRK/7/X3eTENC2HivrdIn3rjxfDEnY+92ZNmILFrM7LCAQwLd7/X6bdxVIXSOQusYhdY1D6hrHCF2zxROZPawLzJ/Lw7qejdQldUldUtcv6YIveq7CZ6ahxWJE3n5/Jv/95wmpayZ1jeWVdb3d4VrXU1GBcpchLcD7/X6dv8xiEolEIvnKk8/xB7Hu58fJ+OF5Yip+es6ZCqlrHFLXOF5Z19RH1U1+er6fjKnToEQikfzvUF+ShubHp74Afwz5fD8OqWscUtc4mK73qUXcgOpSn/vD4oOoz/77lgeZ7vdriUQi+VumPkFvA182D71q3n7Z55ypNdxC6hqH1DUO/nz/grypL/veRCKRSCSSKTEZoQrAgoQU0xL1MEwOCfn6e65lmmDowCDsGpo91tCNcpXkmpA6Eddq38Aqu3u4Bn6vWQivR991q4wAEGZ12/qFsByWbpBkdVp81nVscSiK8+O5beuMdbCSyk3dsqzcKuCRNAG9PrMmGKSEuctK1xchuW4thiSo3dZPFACTLC2PDffqJ1mVJhAA4njrrt9GdxbCKUGIWVHr3efhwkjzh6uFYyzFCzRi4y39KByvVnnFzkMHrnCln3lFthR3FSe8IqIcG17SDUPFxpBgJ2Je6sBiuvR1Z31jOCIkGHguLyS9tY7ELVE6zKTpaksxvJHtrNh9O81I+sB4W27jlrm0SjHycH/GWm/VqpHDWhXeau28ikdF/Gtd8EpXjTC3b/Wz1pnZHxMPxXd0xbre6VJLVLPBL88IsRrSip5EM0ttiI3YekA/1j5ToPgazlnBMuF3Xc2MLpFYw96ZNF9ecxLbMmtU9ev5u66m1LuIqSvNK9j8mJW+gQCuxfTD3RkkhjHEtjZwBEK3uylB2KuI2nm90qUxXfkqp4pzR0NeFQ9z1tuEG6RH33UR2/FCQnZG3S+dCGt0EOKArtraBE1fr2ICzPQSG43EN6uDcJC4OvLqHfdK2s/jVZyZX6j6hqHpaa+BoXiExYTON3Whc+UY7jDvVosNqJQEJJiubeKKEyev6Pb7QN6wzyPs1OXgQt0hDelu8lmX5lyPT5OXGDlXCyxLlx8fmxSvzFu66DzGHnKHQ2tn2FHozkGTotLy+4lD5Qe1gXA9WE2xfR28le8x37CDLrDRsPCoHOZcWYC8w3AHxLwc2Sj4gy56Omil2o/mCfkxs+wjPezDi1reXKHVMAIXXU3CvSqZwTxQXTuua740XNHbOnV2IsceVigoUm5TqVBXoLqMiy58Anyno16YVeOWr6rCxtVeTKPfhRTaWvBdl1p3hWbFDslmb3d7yKy9WGxA6PFNDvJBKTskhKlIF0fFp/3IdQFr7Rkn0lmJdbRnszp3cL//COrMWb6W9gvkokvZ27w5WmEWj7pE+8g0o70d9+kQZtg5kDB2qn57gSLYlgnTX2y2W2etAKXYrU5tzA9o4m9P24SnyrxenTYHpiz0tl0iCbYn7s/Ky3/WLNEtDtV22x20Zmyvtn7BV+X84OKYkINTRTwySyX58XhMrv8rugmPWZabl7zNv25afYGeMfOQDHlbNemXd5GOlVk444M9X4iaJpx10Yo7gXL57toV1W7YYfOWU68h9fovS92onJCr1zMAAAAASUVORK5CYII=" ;
    _self.info="US Airways was a major American airline that ceased to operate independently when the Federal Aviation Administration granted a single operating certificate for US Airways and American Airlines on April 8, 2015. ";
    _self.wiki="https://en.wikipedia.org/wiki/US_Airways";
    _self.headquname=" Tempe, AZ";
    _self.AOC="AALA025A";
    _self.IATA="UA";
    _self.ICAO="USA";
    _self.website="https://www.flights.com/airlines/us-airways-flights/";

    this.draw();
  }

  virgin(){
    var _self = this;
    _self.file_name = "data/virgin_america.json";
    _self.airline="Virgin America"; //same as in file pie_chart.csv
    _self.airl_name="Virgin America";
    _self.image="data:image/png;base64,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";
  _self.info="Virgin America was an American airline that operated between 2007 and 2018, when it was integrated into Alaska Airlines. The airline primarily focused on operating low-fare service between cities on the West Coast and other major metropolitan areas, with higher quality service.";
 
 _self.wiki="https://en.wikipedia.org/wiki/Virgin_America";
    _self.headquname="  Burlingame, CA";
    _self.AOC="	VQIA199L";
    _self.IATA="VX";
    _self.ICAO="VRD";
    _self.website="https://www.alternativeairlines.com/virgin-america";
    this.draw();
  }

  southwest(){
    var _self = this;
    _self.file_name = "data/southwest_airlines.json";
    _self.airline="Southwest Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Southwest Airlines";
    _self.image="data:image/png;base64,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";
    _self.info="Southwest Airlines Co. is a major United States airline headquartered in Dallas, Texas, and is the world’s largest low-cost carrier.";
    _self.wiki="https://en.wikipedia.org/wiki/Southwest_Airlines";
    _self.headquname=" Dallas, TX";
    _self.AOC="SWAA304A";
    _self.IATA="WN";
    _self.ICAO="SWA";
    _self.website="https://www.southwest.com/";
    this.draw();
  }
  
  mesa(){
    var _self = this;
    _self.file_name = "data/mesa_airlines.json";
    _self.airline="Mesa Airlines"; //same as in file pie_chart.csv
    _self.airl_name="Mesa Airlines";
    _self.image="data:image/jpeg;base64,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";
    _self.info="Mesa Airlines, Inc. is an American regional airline based in Phoenix, Arizona. It is a FAA Part 121-certificated air carrier operating under air carrier certificate number MASA036A issued on June 29, 1979.";
    _self.wiki="https://en.wikipedia.org/wiki/Mesa_Airlines";
    _self.headquname="Phoenix, AZ";
    _self.AOC="MESAA304B";
    _self.IATA="YV";
    _self.ICAO="ASH";
    _self.website="http://www.mesa-air.com/";
    this.draw();
  }
  
  constructor() { }

  ngOnInit() {
    this.extraline();
  }
  extraline(){
    function linechart(data){
      var citi = ['Chicago',
        'Atlanta',
        'New York',
        'Dallas',
        'Charlotte',
        'Denver', 
        'Houston',
        'Los Angeles',
        'Washington',
        'Phoenix',
        'San Francisco',
        'Las Vegas',
        'Detroit',
        'Minneapolis',
        'Boston'];
      var width = 900;
      var height = 400;
      var margin = 40;
      var duration = 400;
  
      var lineOpacity = "100";
      var lineOpacityHover = "1.0";
      var otherLinesOpacityHover = "0.1";
      var lineStroke = "2px";
      var lineStrokeHover = "4px";
  
      var circleOpacity = '100';
      
      var circleOpacityOnLineHover = "0.55"
      var circleRadius = 3;
      var circleRadiusHover = 6;
  
      /* Format Data */
      // var parseDate = d3.timeParse("%Y");
      data.forEach(function(d) { 
      d.values.forEach(function(d) {
          d.year = +d.year;
          d.arrdelay = +d.arrdelay;
          d.depdelay = +d.depdelay;    
      });
      });
      // var tic = Object.keys(data[0].values).length;
      /* Scale */
      var xScale = d3.scaleLinear()
      .domain(d3.extent(data[0].values, d => +d["year"]))
      .range([0, width-margin]);
  
      var yScale = d3.scaleLinear()
      .domain(d3.extent(data[0].values, d => +d["arrdelay"]))
      .range([height-margin, 0]);
  
      var color = d3.scaleOrdinal(d3.schemeCategory10);
  
      /* Add SVG */

      var svg = d3.selectAll("#extra").append("svg")
      .attr("width", (width+margin + 60)+"px")
      .attr("height", (height+margin)+"px")
      .append('g')
      .attr("transform", `translate(${margin}, ${margin})`);

      
      /* Add line into SVG */
      var line = d3.line()
      .curve(d3.curveCardinal)
      .x(d => xScale(d["year"]))
      .y(d => yScale(d["arrdelay"]));
  
      let lines = svg.append('g')
                     .attr('class', 'lines');
  
      lines.selectAll('.line-group')
          .data(data)
          .enter()
          .append('g')
          .attr('class', 'line-group')
          .on("mouseover", function(d, i:any) {
            svg.append("text")
              .attr("class", "title-text")
              .style("fill", color(i))        
              .text("")
              .attr("text-anchor", "middle")
              .attr("x", (width-margin)/2)
              .attr("y", 5);
        })
      //   .on("mouseout", function(d) {
      //     svg.select(".title-text").remove();
      // })
      .append('path')
      .attr('class', 'line')  
      .attr('d', d => line(d["values"]))
      .style('stroke', (d, i:any) => color(i))
      .style('opacity', lineOpacity)
      .style('fill', 'none')
      .on("mouseover", function(d) {
          d3.selectAll('.line')
                      .style('opacity', otherLinesOpacityHover);
          d3.select(this).transition().duration(200)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");    
      })
      .on("mouseout", function(d) {
          d3.selectAll(".line")
                      .style('opacity', lineOpacity);
          d3.selectAll('.circle')
                      .style('opacity', circleOpacity);
          d3.select(this).transition().duration(200)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
          d3.selectAll('.legend')
          .style('opacity', 1);
      });
      var path = "M59.79,12.92C62.42,9.4,64,5.75,64,3.15a3.62,3.62,0,0,0-.49-2,1.6,1.6,0,0,0-.29-.37,1.68,1.68,0,0,0-.34-.27,3.56,3.56,0,0,0-2-.51c-2.6,0-6.25,1.58-9.77,4.21-2.84,2.13-5.69,5.12-9.62,9.27L39.34,15.7l-7.62-2.28,0,0a1.71,1.71,0,0,0,0-2.41L30.36,9.61a1.71,1.71,0,0,0-1.21-.5,1.68,1.68,0,0,0-1.21.5l-2.06,2.06-1.09-.33a1.71,1.71,0,0,0-.14-2.25L23.27,7.7a1.71,1.71,0,0,0-1.21-.5,1.67,1.67,0,0,0-1.2.5L19,9.59,11.21,7.27a1.94,1.94,0,0,0-.55-.08,2.05,2.05,0,0,0-1.43.58L6.5,10.5A1.61,1.61,0,0,0,6,11.62,1.56,1.56,0,0,0,6.85,13l16.3,9.11a2.84,2.84,0,0,1,.4.3l4.65,4.65C23.85,31.66,20,36.09,17,40L16.15,41,3.54,39.86H3.32a2.33,2.33,0,0,0-1.56.65L.49,41.76A1.58,1.58,0,0,0,0,42.89a1.55,1.55,0,0,0,.92,1.43l8.87,4.21a2.07,2.07,0,0,1,.34.24l.74.73a5.38,5.38,0,0,0-.35,1.71,2.24,2.24,0,0,0,.62,1.63l0,0h0a2.25,2.25,0,0,0,1.63.61,5.43,5.43,0,0,0,1.69-.35l.75.75a2,2,0,0,1,.23.33l4.2,8.85a1.57,1.57,0,0,0,1.41.93h0a1.58,1.58,0,0,0,1.12-.47l1.3-1.31a2.32,2.32,0,0,0,.62-1.56c0-.07,0-.13,0-.16L23,47.85,24,47c3.86-3,8.3-6.9,12.87-11.24l4.65,4.66a2.49,2.49,0,0,1,.3.4L51,57.13a1.58,1.58,0,0,0,2.54.37l2.74-2.74a2.08,2.08,0,0,0,.56-1.43,2,2,0,0,0-.07-.54L54.41,45l1.89-1.89a1.71,1.71,0,0,0,0-2.41l-1.39-1.38a1.71,1.71,0,0,0-2.25-.14l-.32-1.09,2.06-2.06a1.72,1.72,0,0,0,.5-1.21,1.69,1.69,0,0,0-.5-1.2L53,32.27a1.71,1.71,0,0,0-2.42,0h0L48.3,24.65l2.25-2.14C54.68,18.59,57.67,15.76,59.79,12.92Z"
      /* Add circles in the line */
      lines.selectAll("circle-group")
      .data(data).enter()
      .append("g")
      // .style("fill", "#FFF")//(d, i) => color(i))
      .style("fill", "orange")
      .selectAll("circle")
      .data(d => d["values"])
      .enter()
      .append("g")
      // .append("path")
      // .attr("d",path)
      .attr("class", "circle")
      // .attr("r", 4) 
      .on("mouseover", function(d) {
          d3.select(this)     
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .html(d["arrdelay"] + 'K')
          .attr("x", d => xScale(d["year"]))
          .attr("y", d => yScale(d["arrdelay"]) - 10);
      })
  
      .on("mouseout", function(d) {
          d3.select(this)
          .style("cursor", "none")  
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
      .append("svg")
      
      .attr("x", d => xScale(d["year"]))
      .attr("y", d => yScale(d["arrdelay"])-5)
      // .attr("width","80")
      // .attr("height","80")
      .append("path")
      .attr("d",path)
      .attr("transform","scale(0.25)")
      .style('opacity', circleOpacity)
      .on("mouseover", function(d) {
          d3.select(this)
              .transition()
              .duration(duration)
              // .attr("r", circleRadiusHover);
              .attr("transform","scale(0.7)");
          })
      .on("mouseout", function(d) {
          d3.select(this) 
              .transition()
              .duration(duration)
              .attr("transform","scale(0.2)");
              // .attr("r", circleRadius);  
          });

      /* Add Axis into SVG */

      var myscale1 = d3.scalePoint()
                      .domain(citi)
                      .range([0,width-margin]);

      var xAxis = d3.axisBottom(xScale).ticks(5);
      var yAxis = d3.axisLeft(yScale).ticks(5);
      var myaxis = d3.axisBottom(myscale1);
  
      svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${height-margin})`)
      .call(myaxis)
      .append('text')
      //.attr("fill", "#000")
       .text("Airports")
       .attr("text-anchor", "middle") 
       .attr("x", width/2)
      .attr("y", 36)
      .attr("font-size","12px") 
      .attr("fill","black");
  
      svg.append("g")
      .attr("class", "yAxis")
      .call(yAxis)
      .append('text')
      .attr("x", -width/10 )
      .attr("y", -30)
      .attr("transform", "rotate(-90)")
      //.attr("fill", "#000")
      .text("No of Flights(1000k)")
      .attr("font-size","12px") 
      .attr("fill", "#000");
  } 
        d3.json('data/cityCount.json').then(function (data) {
          linechart(data);});
  }

  draw()
  {
    d3.select("#fordisp").attr("class","view");
    d3.select("#south").select("svg").remove();
    var _self = this;
    function linechart(data){
      var width = 700;
      var height = 300;
      var margin = 40;
      var duration = 400;
  
      var lineOpacity = "100";
      var lineOpacityHover = "1.0";
      var otherLinesOpacityHover = "0.1";
      var lineStroke = "2px";
      var lineStrokeHover = "4px";
  
      var circleOpacity = '100';
      
      var circleOpacityOnLineHover = "0.55"
      var circleRadius = 3;
      var circleRadiusHover = 6;
  
      /* Format Data */
      var parseDate = d3.timeParse("%Y");
      data.forEach(function(d) { 
      d.values.forEach(function(d) {
          d.year = parseDate(d.year);
          d.arrdelay = +d.arrdelay;
          d.depdelay = +d.depdelay;    
      });
      });
      var tic = Object.keys(data[0].values).length;
      /* Scale */
      var xScale = d3.scaleTime()
      .domain(d3.extent(data[0].values, d => +d["year"]))
      .range([0, width-margin]);
  
      var yScale = d3.scaleLinear()
      .domain([0, 28])
      .range([height-margin, 0]);
  
      var color = d3.scaleOrdinal(d3.schemeCategory10);
  
      /* Add SVG */

      var svg = d3.selectAll("#south").append("svg")
      .attr("width", (width+margin + 60)+"px")
      .attr("height", (height+margin)+"px")
      .append('g')
      .attr("transform", `translate(${margin}, ${margin})`);

      // Draw the legend
      var lst = ["Arrival Delay","Departure Delay"];
      var legend = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend');
  
      legend.append('rect')
      .attr('x', width - 170)
      .attr('y', function(d, i) { return height/ 8 - (i + 1) * 20; })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d, i:any) { return color(i); });
      
      legend.append('text')
      .attr('x', width - 150)
      .attr('y', function(d, i) { return height/ 8 - (i + 1) * 20 + 10; })
      .text(function(d,i) { return lst[i]; });
      
      /* Add line into SVG */
      var line = d3.line()
      .x(d => xScale(d["year"]))
      .y(d => yScale(d["arrdelay"]));
  
      let lines = svg.append('g')
                     .attr('class', 'lines');
  
      lines.selectAll('.line-group')
          .data(data)
          .enter()
          .append('g')
          .attr('class', 'line-group')
          .on("mouseover", function(d, i:any) {
            svg.append("text")
              .attr("class", "title-text")
              .style("fill", color(i))        
              .text(d["airline"])
              .attr("text-anchor", "middle")
              .attr("x", (width-margin)/2)
              .attr("y", 5);
        })
      //   .on("mouseout", function(d) {
      //     svg.select(".title-text").remove();
      // })
      .append('path')
      .attr('class', 'line')  
      .attr('d', d => line(d["values"]))
      .style('stroke', (d, i:any) => color(i))
      .style('opacity', lineOpacity)
      .style('fill', 'none')
      .on("mouseover", function(d) {
          d3.selectAll('.line')
                      .style('opacity', otherLinesOpacityHover);
          d3.select(this).transition().duration(200)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");    
      })
      .on("mouseout", function(d) {
          d3.selectAll(".line")
                      .style('opacity', lineOpacity);
          d3.selectAll('.circle')
                      .style('opacity', circleOpacity);
          d3.select(this).transition().duration(200)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
          d3.selectAll('.legend')
          .style('opacity', 1);
      });
      var path = "M59.79,12.92C62.42,9.4,64,5.75,64,3.15a3.62,3.62,0,0,0-.49-2,1.6,1.6,0,0,0-.29-.37,1.68,1.68,0,0,0-.34-.27,3.56,3.56,0,0,0-2-.51c-2.6,0-6.25,1.58-9.77,4.21-2.84,2.13-5.69,5.12-9.62,9.27L39.34,15.7l-7.62-2.28,0,0a1.71,1.71,0,0,0,0-2.41L30.36,9.61a1.71,1.71,0,0,0-1.21-.5,1.68,1.68,0,0,0-1.21.5l-2.06,2.06-1.09-.33a1.71,1.71,0,0,0-.14-2.25L23.27,7.7a1.71,1.71,0,0,0-1.21-.5,1.67,1.67,0,0,0-1.2.5L19,9.59,11.21,7.27a1.94,1.94,0,0,0-.55-.08,2.05,2.05,0,0,0-1.43.58L6.5,10.5A1.61,1.61,0,0,0,6,11.62,1.56,1.56,0,0,0,6.85,13l16.3,9.11a2.84,2.84,0,0,1,.4.3l4.65,4.65C23.85,31.66,20,36.09,17,40L16.15,41,3.54,39.86H3.32a2.33,2.33,0,0,0-1.56.65L.49,41.76A1.58,1.58,0,0,0,0,42.89a1.55,1.55,0,0,0,.92,1.43l8.87,4.21a2.07,2.07,0,0,1,.34.24l.74.73a5.38,5.38,0,0,0-.35,1.71,2.24,2.24,0,0,0,.62,1.63l0,0h0a2.25,2.25,0,0,0,1.63.61,5.43,5.43,0,0,0,1.69-.35l.75.75a2,2,0,0,1,.23.33l4.2,8.85a1.57,1.57,0,0,0,1.41.93h0a1.58,1.58,0,0,0,1.12-.47l1.3-1.31a2.32,2.32,0,0,0,.62-1.56c0-.07,0-.13,0-.16L23,47.85,24,47c3.86-3,8.3-6.9,12.87-11.24l4.65,4.66a2.49,2.49,0,0,1,.3.4L51,57.13a1.58,1.58,0,0,0,2.54.37l2.74-2.74a2.08,2.08,0,0,0,.56-1.43,2,2,0,0,0-.07-.54L54.41,45l1.89-1.89a1.71,1.71,0,0,0,0-2.41l-1.39-1.38a1.71,1.71,0,0,0-2.25-.14l-.32-1.09,2.06-2.06a1.72,1.72,0,0,0,.5-1.21,1.69,1.69,0,0,0-.5-1.2L53,32.27a1.71,1.71,0,0,0-2.42,0h0L48.3,24.65l2.25-2.14C54.68,18.59,57.67,15.76,59.79,12.92Z"
      /* Add circles in the line */
      lines.selectAll("circle-group")
      .data(data).enter()
      .append("g")
      // .style("fill", "#FFF")//(d, i) => color(i))
      .style("fill", function(d, i:any) { return color(i); })
      .selectAll("circle")
      .data(d => d["values"])
      .enter()
      .append("g")
      // .append("path")
      // .attr("d",path)
      .attr("class", "circle")
      // .attr("r", 4) 
      .on("mouseover", function(d) {
          d3.select(this)     
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .html(d["year"].getFullYear() + ": " + d["arrdelay"] + ' min')
          .attr("x", d => xScale(d["year"]) + 5)
          .attr("y", d => yScale(d["arrdelay"]) - 10);
      })
  
      .on("mouseout", function(d) {
          d3.select(this)
          .style("cursor", "none")  
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
      .append("svg")
      
      .attr("x", d => xScale(d["year"]))
      .attr("y", d => yScale(d["arrdelay"])-5)
      // .attr("width","80")
      // .attr("height","80")
      .append("path")
      .attr("d",path)
      .attr("transform","scale(0.2)")
      // .append("circle")
      // .attr("x", d => xScale(d["year"]))
      // .attr("y", d => yScale(d["arrdelay"]))
      // .attr("r", circleRadius)
      .style('opacity', circleOpacity)
      .on("mouseover", function(d) {
          d3.select(this)
              .transition()
              .duration(duration)
              // .attr("r", circleRadiusHover);
              .attr("transform","scale(0.7)");
          })
      .on("mouseout", function(d) {
          d3.select(this) 
              .transition()
              .duration(duration)
              .attr("transform","scale(0.2)");
              // .attr("r", circleRadius);  
          });
      /* Add Axis into SVG */
      var xAxis = d3.axisBottom(xScale).ticks(tic);
      var yAxis = d3.axisLeft(yScale).ticks(5);
  
      svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${height-margin})`)
      .call(xAxis)
      .append('text')
      //.attr("fill", "#000")
       .text("Year")
       .attr("text-anchor", "middle") 
       .attr("x", width/2)
      .attr("y", 40)
      .attr("fill","black")
      .attr("font-size","12px");
  
      svg.append("g")
      .attr("class", "yAxis")
      .call(yAxis)
      .append('text')
      .attr("x", -width/7 )
      .attr("y", -30)
      .attr("transform", "rotate(-90)")
      //.attr("fill", "#000")
      .text("Arrival Delay(minutes)")
      .attr("fill","black")
      .attr("font-size","12px");
  } 

        d3.json(_self.file_name).then(function (data) {
          linechart(data);});

          function makepie() {
            // var _self = this;
            var svg = d3.select("#chart-area"),
              width = +svg.attr("width"),
              height = +svg.attr("height"),
              radius = 200,//Math.min(width, height) / 2.5,
              g = svg.append("g").attr("transform", "translate(" + width /1.5 + "," + height / 3 + ")");
            // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "pink", "yellow", "green"]);
            var pie = d3.pie() //pie generator
              .sort(null)
              .value(function (d:any) {return d[1];});
            
            _self.card_text = _self.init_text;
            
            var color = d3.scaleOrdinal(d3.schemeCategory10);
            
            var path = d3.arc()
              .outerRadius(radius - 20)
              .innerRadius(120); //make != 0 for a donut chart
            
            var label = d3.arc()
              .outerRadius(radius+100)
              .innerRadius(80);
            
              d3.csv("data/pie_chart.csv", function (d:any) {
                  return [d['DelayTypes'], d[_self.airline]]
                }).then(function (data:any) {
                    data = data
                var arc_g = g.selectAll(".arc")
                .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
                .enter().append("g")
                .attr("class", "arc");
                
                arc_g.append("path") //for each slide use arc path generator to draw the pie
                .attr("d", <any>path)
                .attr("fill", function (d:any, i:any) {return color(i);}); //get data from node (select and $0._data_ in console)
              
                // arc_g.append("text") //for each slide use label path generator to place the text
                // .attr("transform", function (d:any) {return "translate(" + label.centroid(d) + ")"})
                // .attr("dy", "0.15em")
                // .attr("fill","white")
                // .text(function (d:any) {return d.data[0]});
              
                arc_g.on("mouseover", function (d:any) {
                _self.airline_name = _self.airline;
                _self.card_text = d.data[0] +"\n"+  ":  " + d.data[1] + " min";})
                arc_g.on("mouseout", function () {
                _self.airline_name = "";
                _self.card_text = _self.init_text});

                //addin

                    //D3 Vertical Legend//////////////////////////
                    var gh = ['Departure Delay','Carrier Delay','Weather Delay','NASA Delay','Security Delay']
                    var legend3 = svg.selectAll('.legend3')
                    .data(color.domain())
                    .enter().append('g')
                    .attr("class", "legends3")
                    .attr("transform", function (d, i) {
                    {
                        return "translate(0," + i * 20 + ")"
                    }
                })
                
                legend3.append('rect')
                    .attr("x", 10)
                    .attr("y", 0)
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (d, i:any) {
                    return color(i)
                })
                
                legend3.append('text')
                    .attr("x", 25)
                    .attr("y", 10)
                //.attr("dy", ".35em")
                .text(function (d, i) {
                    return gh[i]
                })
                    .attr("class", "textselected")
                    .style("text-anchor", "start")
                    .style("font-size", 15)
            });
          }

          makepie();
  }

}
