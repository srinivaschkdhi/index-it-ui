import React from 'react';
import '../styles/FieldModal.css'; // Assuming you have some basic CSS

function FieldModal({ isOpen, onClose, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Define Fields</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(); // You might want to pass some data
                }}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <input key={index} type="text" placeholder={`Field ${index + 1}`} />
                    ))}
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default FieldModal;
