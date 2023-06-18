import css from './TableRow.module.css';

export const TableRow = (data) => {
    const [empIdOne, empIdTwo, projectId, daysWorked] = data.entry;

    return (
        <tr className={css.regular}>
            <td>{empIdOne}</td>
            <td>{empIdTwo}</td>
            <td>{projectId}</td>
            <td>{daysWorked}</td>
        </tr>
    );
};