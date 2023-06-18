import { DataProvider } from "./contexts/DataContext";

import { Header } from "./components/Header/Header";
import { FileUploader } from "./components/FileUploader/FileUploader";
import { Table } from "./components/Table/Table";
import { Footer } from "./components/Footer/Footer";

import './App.css';

function App() {
    return (
        <>
            <DataProvider>
                <Header />
                <FileUploader />
                <Table />
                <Footer />
            </DataProvider>
        </>
    );
};

export default App;