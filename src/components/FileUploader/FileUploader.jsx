import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export const FileUploader = () => {
    const { fileHandler } = useContext(DataContext);
    
    return (
        <>
            <p>Select File:</p>
            <input type="file" name="file" accept=".csv" onChange={fileHandler} />
        </>
    );
};