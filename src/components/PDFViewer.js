import React from 'react';

function PDFViewer({ fileUrl }) {
    return (
        <iframe src={fileUrl} width="100%" height="500px" />
    );
}

export default PDFViewer;
