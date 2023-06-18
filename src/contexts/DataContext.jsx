import { createContext, useEffect, useState } from "react";

import Papa from "papaparse";

export const DataContext = createContext();

export const DataProvider = ({
    children
}) => {
    const [parsedData, setParsedData] = useState(null);
    const [tableRows, setTableRows] = useState(null);
    const [values, setValues] = useState(null);
    const [workedTogether, setWorkedTogether] = useState(null);

    useEffect(() => {
        // console.log('ParsedData STATE:');
        // console.log(parsedData);
        // console.log('ROWS STATE:');
        // console.log(tableRows);
        // console.log('Values STATE:');
        // console.log(values);
        if (values) {
            overlapChecker();
        }
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

    const overlapChecker = () => {
        for (let i = 0; i < values.length; i++) {
            let [empId, projectId, dateFrom, dateTo] = values[i];

            if (dateTo === 'NULL') {
                dateTo = new Date();
            };

            const dateOne = new Date(dateFrom);
            const dateTwo = new Date(dateTo);

            for (let y = i + 1; y < values.length; y++) {
                let [empIdCompare, projectIdCompare, dateFromCompare, dateToCompare] = values[y];

                if (dateToCompare === 'NULL') {
                    dateToCompare = new Date();
                };

                if (projectId === projectIdCompare) {

                    const comparedOne = new Date(dateFromCompare);
                    const comparedTwo = new Date(dateToCompare);

                    if (comparedTwo >= dateOne || comparedOne <= dateTwo) {
                        console.log('BINGO')
                    }

                    console.log(dateOne, dateTwo, comparedOne, comparedTwo);
                };

            };
        };
    };

    const daysCalculator = (employeeOne, employeeTwo, projectId, ) => {

    }

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