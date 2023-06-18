import { createContext, useEffect, useState } from "react";

import Papa from "papaparse";

export const DataContext = createContext();

export const DataProvider = ({
    children
}) => {
    const [values, setValues] = useState([]);
    const [workedTogether, setWorkedTogether] = useState([]);
    const [longest, setLongest] = useState('');
    const [winningPair, setWinningPair] = useState([]);

    useEffect(() => {
        if (values.length > 0) {
            matchChecker();
        };
    }, [values]);

    useEffect(() => {
        if (longest.length > 0) {
            longestPairSetter();
        };
    }, [longest]);

    const fileHandler = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const valuesArray = [];

                results.data.map((d) => {
                    valuesArray.push(Object.values(d));
                });

                setValues(valuesArray);
            },
        });
    };

    const matchChecker = () => {
        const workedTogetherArr = [];
        const pairs = {};

        for (let i = 0; i < values.length; i++) {
            let [empId, projectId, dateFrom, dateTo] = values[i];

            for (let y = i + 1; y < values.length; y++) {
                let [empIdCompare, projectIdCompare, dateFromCompare, dateToCompare] = values[y];

                if (projectId === projectIdCompare) {
                    const overlapDays = overlapChecker(dateFrom, dateTo, dateFromCompare, dateToCompare);

                    if (overlapDays > 0) {
                        const entry = [empId, empIdCompare, projectId, overlapDays];

                        if (pairs.hasOwnProperty(`${empId}-${empIdCompare}`)) {
                            pairs[`${empId}-${empIdCompare}`] = Number(pairs[`${empId}-${empIdCompare}`]) + Number(overlapDays);
                        } else {
                            pairs[`${empId}-${empIdCompare}`] = Number(overlapDays);
                        };

                        workedTogetherArr.push(entry);
                    };
                };
            };
        };
        mostDaysChecker(pairs);
        setWorkedTogether(workedTogetherArr);
    };

    const overlapChecker = (dateFrom, dateTo, dateFromCompare, dateToCompare) => {
        if (dateTo === 'NULL') {
            dateTo = new Date();
        };

        if (dateToCompare === 'NULL') {
            dateToCompare = new Date();
        };

        const empOneFrom = new Date(dateFrom);
        const empOneTo = new Date(dateTo);
        const empTwoFrom = new Date(dateFromCompare);
        const empTwoTo = new Date(dateToCompare);

        let overlapDays = 0;

        if (empTwoTo >= empOneFrom && empTwoFrom <= empOneTo) {
            const fromDate = (empOneFrom >= empTwoFrom ? empOneFrom : empTwoFrom);
            const toDate = (empOneTo <= empTwoTo ? empOneTo : empTwoTo);

            overlapDays = daysCalculator(fromDate, toDate) || 1;
        };

        return overlapDays;
    };

    const daysCalculator = (fromDate, toDate) => {
        return (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
    };

    const mostDaysChecker = (pairs) => {
        const sorted = Object.entries(pairs)
            .sort(([, a], [, b]) => a - b)
            .reduce(
                (r, [k, v]) => ({
                    ...r,
                    [k]: v
                }),
                {}
            );

        const mostDaysPair = Object.keys(sorted).pop();
        setLongest(mostDaysPair);
    };

    const longestPairSetter = () => {
        const longestPairArr = [];

        for (let i = 0; i < workedTogether.length; i++) {
            const [empIdOneBest, empIdTwoBest] = longest.split('-');
            const [empIdOne, empIdTwo] = workedTogether[i];

            if (empIdOneBest === empIdOne && empIdTwoBest === empIdTwo) {
                longestPairArr.push(workedTogether[i]);
            };
        };
        setWinningPair(longestPairArr);
    };

    const dataContextValue = {
        fileHandler,
        winningPair,
    };

    return (
        <DataContext.Provider value={dataContextValue}>
            {children}
        </DataContext.Provider>
    );
};