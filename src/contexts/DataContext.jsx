import { createContext, useEffect, useState } from "react";

import Papa from "papaparse";

export const DataContext = createContext();

export const DataProvider = ({
    children
}) => {
    const [parsedData, setParsedData] = useState(null);
    const [tableRows, setTableRows] = useState(null);
    const [values, setValues] = useState(null);

    useEffect(() => {
        console.log('ParsedData STATE:');
        console.log(parsedData);
        console.log('ROWS STATE:');
        console.log(tableRows);
        console.log('Values STATE:');
        console.log(values);
    }, [parsedData, tableRows, values]); 

    const fileHandler = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                  });
                  
                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                setValues(valuesArray);
                  
                // console.log('Parsed ARRAY:');
                // console.log(results.data);
                // console.log('ROWS ARRAY:');
                // console.log(rowsArray[0]);
                // console.log('Values ARRAY:');
                // console.log(valuesArray);
            },
        });
    };

    const dataContextValue = {
        fileHandler,
        tableRows,
        values
    };

    return (
        <DataContext.Provider value={dataContextValue}>
            {children}
        </DataContext.Provider>
    );
};