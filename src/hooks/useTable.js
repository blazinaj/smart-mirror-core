import React from "react";
import {Table} from "reactstrap";
import  {inspect}  from 'util'

/**
 * @description A Custom Hook that generates a simple ReactStrap Table out of a JSON object
 * @param data
 * @returns {{display: *}}
 */
export const useTable = (data) => {

    const display =
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
                // This Object.entries() method returns arrays of key/value pairs
                Object.entries(data)
                // The map() function lets you iterate through the array and do something with every array object
                    .map(([key, value]) =>
                        <tr>
                            <td>
                                {key}:
                            </td>
                            <td>
                                {inspect(value)}
                            </td>
                        </tr>
                    )
            }
            </tbody>
        </Table>;

    return {
        display
    }

};