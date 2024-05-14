import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FileList.css';

function FileList({ onSelectFile }) {
    const [files, setFiles] = useState([]);
    const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pdf/files?directoryPath=${directoryPath}`)
            .then(response => {
                console.log(response.data);
                setFiles(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the PDF files: ', error);
            });
    }, []);

    return (
        <div className="file-list">
            <h2>Available PDF Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={file.id || index} onClick={() => onSelectFile(file)}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;
