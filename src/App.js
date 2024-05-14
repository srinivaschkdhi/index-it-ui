import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileList from './components/FileList';
import PDFViewer from './components/PDFViewer';
import FieldModal from './components/FieldModal';
import FieldValueModal from './components/FieldValueModal';
import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fields, setFields] = useState([]);
    const [isIndexing, setIsIndexing] = useState(false); // Controls the layout
    const [currentDocumentUUID, setCurrentDocumentUUID] = useState(null);
    const [currentFileName,setCurrentFileName] = useState(null);
    const [isFieldValueModalOpen, setIsFieldValueModalOpen] = useState(false);
    const [fieldDefinitions, setFieldDefinitions] = useState([]);

    const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pdf/files?directoryPath=${directoryPath}`)
            .then(response => {
                setFiles(response.data);
                if (response.data.length > 0) {
                    const firstFile = response.data[0];
                    setSelectedFile(`http://localhost:8080/api/pdf/files/${firstFile.name}?path=${directoryPath}`);
                    setCurrentDocumentUUID(firstFile.id);
                    setCurrentFileName(firstFile.name);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the PDF files: ', error);
            });
    }, []);

    useEffect(() => {
        if(currentDocumentUUID) getFieldDefinitions();
    }, [currentDocumentUUID]);

    useEffect(() => {
        if (isFieldValueModalOpen) {
            getFieldDefinitions();
        }
    }, [isFieldValueModalOpen]);


    const openModal = () => setModalIsOpen(true);

    const closeModal = () => setModalIsOpen(false);

    const saveFields = (fieldsData) => {

        let result = fieldsData.map((ele) => {
            return {
                name: ele,
                dataType: 'String'
            };
        });

        axios.post(`http://localhost:8080/api/field-definitions/${currentDocumentUUID}`, result)  // Adjust the endpoint as necessary
            .then(response => {
                console.log('Fields saved successfully', response.data);
                setIsIndexing(true); // Assuming you update the layout to show fields
                setFields(fieldsData);
                setIsIndexing(true); // Change layout after defining fields
                setIsFieldValueModalOpen(true);
                closeModal();
            })
            .catch(error => {
                console.error('Error saving fields:', error);
            });
    };

    const getFieldDefinitions = async () => {
        const response = await axios.get(`http://localhost:8080/api/field-definitions/${currentDocumentUUID}`);
        console.log(response.data);
        setFieldDefinitions(response.data);
    };

    const handleFileSelect = (file) => {
        setSelectedFile(`http://localhost:8080/api/pdf/files/${file.name}?path=${directoryPath}`);
        setCurrentDocumentUUID(file.id);
        setCurrentFileName(file.name);
    };

    const saveFile = () => {
        const filePath = `${directoryPath}/${currentFileName}`

        axios.post('http://localhost:8080/save-file', `filePath=${encodeURIComponent(filePath)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleFormSubmit = () => {
        setIsIndexing(false);
    };

    return (
        <div className="App">
            {isIndexing ? (
                <>
                    <div className="index-panel-left">
                        {selectedFile && <PDFViewer fileUrl={selectedFile} />}
                    </div>
                    <div className="index-panel-right">
                        <FieldValueModal
                            isOpen={isFieldValueModalOpen}
                            onClose={() => setIsFieldValueModalOpen(false)}
                            fieldDefinitions={fieldDefinitions}
                            onFormSubmit={handleFormSubmit}
                            onSave={saveFile}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="panel-left">
                        <FileList onSelectFile={handleFileSelect} />
                    </div>

                    <div className="panel-right">
                        {selectedFile && <PDFViewer fileUrl={selectedFile} />}
                        <button onClick={openModal} className="index-button">Index It</button>
                        <FieldModal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                            onSave={saveFields}
                            documentUUID={currentDocumentUUID}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default App;
