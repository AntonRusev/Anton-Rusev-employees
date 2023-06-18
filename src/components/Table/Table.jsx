import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { TableRow } from "../TableRow/TableRow";

import css from './Table.module.css';

export const Table = () => {
    const { winningPair } = useContext(DataContext);

    return (
        <table className={css.table}>
            <thead>
                <tr className={css['title-row']}>
                    <th className={css.title}>Employee ID #1</th>
                    <th className={css.title}>Employee ID #2</th>
                    <th className={css.title}>Project ID</th>
                    <th className={css.title}>Days Worked</th>
                </tr>
            </thead>
            <tbody>
                {
                    winningPair.length > 0
                        ? winningPair.map(entry => <TableRow key={entry} entry={entry} />)
                        : <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                }
            </tbody>
        </table>
    );
};