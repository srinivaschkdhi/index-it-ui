import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileList from './components/FileList';
import PDFViewer from './components/PDFViewer';
import FieldModal from './components/FieldModal';
import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const saveFields = () => {
        console.log("Fields saved");
        closeModal();
    };

    useEffect(() => {
        const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";
        axios.get(`http://localhost:8080/api/pdf/list?path=${directoryPath}`)
        .then(response => {
            setFiles(response.data);
            if (response.data.length > 0) {
                const firstFile = response.data[0];
                setSelectedFile(`http://localhost:8080/api/pdf/files/${firstFile}?path=${encodeURIComponent(directoryPath)}`);
            }
        })
        .catch(error => {
            console.error('There was an error fetching the PDF files: ', error);
        });
    }, []);

    const handleFileSelect = (file) => {
        const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";
        setSelectedFile(`http://localhost:8080/api/pdf/files/${file}?path=${encodeURIComponent(directoryPath)}`);
    };

    return (
        <div className="App">
            <div className="panel-left">
                <FileList onSelectFile={handleFileSelect} />
            </div>
            <div className="panel-right">
                {selectedFile ? <PDFViewer fileUrl={selectedFile} /> : <div>Select a file to view</div>}
                <button onClick={openModal} className="index-button">Index It</button>
                <FieldModal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    onSave={saveFields}
                />
            </div>
        </div>
    );
}

export default App;
