import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FileList.css';

function FileList({ onSelectFile }) {
    const [files, setFiles] = useState([]);
    const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pdf/list?path=${directoryPath}`)
            .then(response => {
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
                    <li key={index} onClick={() => onSelectFile(file)}>{file}</li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;
