import React from "react";
import {Table} from "reactstrap";

const temp =             {
    "data":[
        {
            "wind_cdir":"NE",
            "rh":59,
            "pod":"d",
            "lon":"-78.63861",
            "pres":1006.6,
            "timezone":"America\/New_York",
            "ob_time":"2017-08-28 16:45",
            "country_code":"US",
            "clouds":75,
            "vis":10,
            "wind_spd":6.17,
            "wind_cdir_full":"northeast",
            "app_temp":24.25,
            "state_code":"NC",
            "ts":1503936000,
            "h_angle":0,
            "dewpt":15.65,
            "weather":{
                "icon":"c03d",
                "code":"803",
                "description":"Broken clouds"
            },
            "uv":2,
            "aqi":45,
            "station":"CMVN7",
            "wind_dir":50,
            "elev_angle":63,
            "datetime":"2017-08-28:17",
            "precip":0,
            "ghi":444.4,
            "dni":500,
            "dhi":120,
            "solar_rad":350,
            "city_name":"Raleigh",
            "sunrise":"10:44",
            "sunset":"23:47",
            "temp":24.19,
            "lat":"35.7721",
            "slp":1022.2
        }
    ],
    "count":1
}

const TestPage = (props) => {
    return (
        <div>
            <Table responive hover striped>
                <thead>
                    <tr>
                        <td>
                            Key
                        </td>
                        <td>
                            Value
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        // This Object.entries() method returns arrays of key/value pairs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                        Object.entries(temp.data[0])
                            // The map() function lets you iterate through the array and do something with every array object
                            .map(([key, value]) =>
                            <tr>
                                <td>
                                    {key}:
                                </td>
                                <td>
                                    {JSON.stringify(value)}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
};

export default TestPage;