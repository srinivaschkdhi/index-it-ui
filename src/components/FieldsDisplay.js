import React from 'react';

function FieldsDisplay({ fields }) {
    console.log(fields);
    return (
        <div>
            <h2>Index Fields</h2>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field.label}:</label>
                    <input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value, index)}  // Make sure to handle changes appropriately
                    />
                </div>
            ))}
        </div>
    );
}


export default FieldsDisplay;
