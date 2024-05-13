import React from 'react';

function PDFViewer({ fileUrl }) {
    return (
        <iframe 
            src={fileUrl} 
            style={{ width: '100%', height: '100%', border: 'none' }} // Added border: 'none' for cleaner look
        />
    );
}

export default PDFViewer;
