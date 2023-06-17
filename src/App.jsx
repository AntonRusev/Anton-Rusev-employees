import { FileUploader } from "./components/FileUploader/FileUploader";
import { DataProvider } from "./contexts/DataContext";

function App() {
    return (
        <>
            <DataProvider>
                <FileUploader />
            </DataProvider>
        </>
    );
};

export default App;