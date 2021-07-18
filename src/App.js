//remote-origin
//branch-master
import React, { useEffect } from "react";
import { useState } from "react";
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table"
import { sortData } from "./util";
import LineGraph from "./LineGraph";

import 'leaflet/dist/leaflet.css';
import './App.css';



function App() {


 const [countries,setCountries] = useState([])
 const [country, setCountry] = useState("Worldwide")
 const [countryInfo, setcountryInfo] = useState({});
 const [tableData, setTableData]=useState([]);
 const [mapCenter, setMapCenter] = useState([ 33, 65]);
 const [mapZoom, setMapZoom] = useState(3);
 const [mapCountries, setMapCounries] = useState([])
 

// https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
// https://disease.sh/v3/covid-19/all
 
useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response=>response.json())
  .then(data =>   {
    setcountryInfo(data);
  })
  
}, [])
 
   

 
 useEffect(()=>{
   const getCountriesData=async()=>{
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((response)=>response.json())
     .then((data)=>{
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        })); 

        const sortedData=sortData(data);
        setTableData(sortedData); 
         setMapCounries(data);
         console.log("<<<<<",data);
        setCountries(countries);    
      });
   };
   getCountriesData();
 },[]);




const onCountryChange=async(event)=>{
  const countryCode=event.target.value;
  
  const url = countryCode === "Worldwide" 
  ? "https://disease.sh/v3/covid-19/all" 
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`
  await fetch(url)
  .then(response => response.json())
  .then(data =>{
    setCountry(countryCode);
    setcountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
   
    setMapZoom(5);
  });
};

console.log("map",mapCountries);


  return (
    <div className="app">
      <div className="app__left">
         <div className="app__header">
            <h1 className="heading">COVID-19 TRACKER</h1>

            <FormControl className="app_dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
               <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((country)=>(
               <MenuItem value={country.value}>{country.name}</MenuItem>
                 ))}
             </Select>
     
            </FormControl>
         </div> 
   
          <div className="app__status">
            <Infobox  className="status" title="corornavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <Infobox  className="status" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <Infobox className="status" title="death" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

          </div>

     
        
         <Map 
              // casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
           
          />
          
       </div>
      <Card className="app__right">
       <CardContent>
       
          <h3>live cases by country</h3>

          {/* {table} */}
         
         <Table countries={tableData}/>
          
 
          <h3>Worldwide new cases</h3>
           <LineGraph/>
          {/* {graph} */}

       </CardContent>
      </Card>
    </div>
  );
}

export default App;
 