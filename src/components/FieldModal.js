import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FieldModal.css'; // Assuming you have some basic CSS

function FieldModal({ isOpen, onClose, onSave, documentUUID }) {
    const [fields, setFields] = useState(Array(8).fill(''));

    useEffect(() => {
        if (isOpen && documentUUID) {
            axios.get(`http://localhost:8080/api/field-definitions/${documentUUID}`)
                .then(response => {
                    if (response.status === 200) {
                        if(response.data.length === 0){
                            setFields(Array(8).fill(''));
                        } else {
                            setFields(response.data.map(field => field.name || ''));
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching field definitions:', error);
                    setFields(Array(8).fill('')); // Reset fields or handle differently
                });
        }
    }, [isOpen, documentUUID]);

    const handleChange = (index, value) => {
        const newFields = [...fields];
        newFields[index] = value;
        setFields(newFields);
    };

    // Handle save
    const handleSave = (e) => {
        e.preventDefault();
        onSave(fields);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Define Fields</h2>
                <form onSubmit={handleSave}>
                    {fields.map((field, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Field ${index + 1}`}
                            value={field}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    ))}
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default FieldModal;
