import React, {useState, useEffect} from 'react';
import axios from 'axios';

function FileList() {
    // Hardcoded array of PDF filenames
    const [files, setFiles] = useState([]);
    const directoryPath = "C:/Users/Srinivas Chintakindh/Downloads/indexit";

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/pdf/list?path=${directoryPath}`)
        .then(response => {
            setFiles(response.data); // Assuming the response data is the list of files
        })
        .catch(error => {
            console.error('There was an error fetching the PDF files: ', error);
        });
    },[])

    return (
        <div className="file-list">
            <h2>Available PDF Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;