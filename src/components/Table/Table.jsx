import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export const Table = () => {
    const { tableRows, values } = useContext(DataContext);

    return (
        <table>
            <thead>
                <tr>
                    {tableRows
                        ? tableRows.map((row, index) => {
                            return <th key={index}>{row}</th>;
                        })
                        : <th>Name</th>}
                </tr>
            </thead>
            <tbody>
                {values
                    ? values.map((value, index) => {
                        return (
                            <tr key={index}>
                                {value.map((val, i) => {
                                    return <td key={i}>{val}</td>;
                                })}
                            </tr>
                        );
                    })
                    : <tr>
                        <td>Value</td>
                    </tr>}
            </tbody>
        </table>
    );
};