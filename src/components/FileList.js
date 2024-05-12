import React from 'react';

function FileList() {
    // Hardcoded array of PDF filenames
    const files = ['Document1.pdf', 'Report2.pdf', 'Sample3.pdf'];

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