import React from 'react';

function FieldsDisplay({ fields }) {
    return (
        <div>
            <h2>Index Fields</h2>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field.label}:</label>
                    <input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value, index)}
                    />
                </div>
            ))}
        </div>
    );
}


export default FieldsDisplay;
