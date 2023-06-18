import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

import css from './FileUploader.module.css';

export const FileUploader = () => {
    const { fileHandler } = useContext(DataContext);

    return (
        <>
            <form className={css.form}>
                <label htmlFor="file" className={css.label}> Select File </label>
                <input className={css.file} type="file" name="file" id="file" accept=".csv" onChange={fileHandler} />
            </form>
        </>
    );
};