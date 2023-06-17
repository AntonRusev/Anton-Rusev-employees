import { FileUploader } from "./components/FileUploader/FileUploader";
import { Table } from "./components/Table/Table";
import { DataProvider } from "./contexts/DataContext";

function App() {
    return (
        <>
            <DataProvider>
                <FileUploader />
                <Table />
            </DataProvider>
        </>
    );
};

export default App;