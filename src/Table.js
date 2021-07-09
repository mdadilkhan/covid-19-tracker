import React from 'react'
import "./Table.css";

function Table({ countries }) {
    
    return (
        <div className="table">
    
          {countries.map(({ country, cases }) => (
            <tr>
               
                <td>{country}</td>
                <td>
                 <strong>{cases}</strong>
                </td>
            </tr>
          ))}




          {/* {Object.entries(countries).map((item) => {
              
            
              return (
                <tr>
                <td>{item[1].country}</td>
                <td>
                 <strong>{item[1].cases}</strong>
                 </td>
            </tr>
              )
          })} */}

          
            
        </div>
    );
    
}

export default Table
