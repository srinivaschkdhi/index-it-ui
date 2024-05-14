import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FieldValueModal.css'; // Assuming you have some basic CSS

function FieldValueModal({ fieldDefinitions,...props }) {
    // state variable to store field values
    const [fieldValues, setFieldValues] = useState({});

    useEffect(() => {
        const initialValues = fieldDefinitions.reduce((acc, curr) => {
            acc[curr.id] = curr.fieldValue || '';
            return acc;
        }, {});

        setFieldValues(initialValues);
    }, [fieldDefinitions]);

    const handleChange = (fieldId, value) => {
        setFieldValues({ ...fieldValues, [fieldId]: value });
    };

    const namedFields = fieldDefinitions.filter(def => def.name && def.name.trim() !== '');

    const handleSubmit = () => {
        console.log("Button clicked");
        console.log('field defintions',fieldDefinitions);
        console.log('field values',fieldValues);

        const transformedData = Object.entries(fieldValues).map(([key, value]) => ({
            fieldDefinition: { id: Number(key) },
            fieldValue: value,
        }));

        console.log("transformedData", transformedData);

        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/field-values/batch',
            data: transformedData,
        })
            .then((response) => {
                console.log(response);
                props.onFormSubmit();
            })
            .catch((error) => {
                console.log(error)
            });
            
    };

    return (
        <div>
            {namedFields.map(def => (
                <div key={def.id} className='field-value-container'>
                    <label>{def.name || 'Unnamed Field'}</label>
                    <input
                        name={def.name}
                        value={fieldValues[def.id] || ''}
                        onChange={(e) => handleChange(def.id, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Save metadata</button>
            <button onClick={props.onSave}>Save file</button>
        </div>
    );
}

export default FieldValueModal;