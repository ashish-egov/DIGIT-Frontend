import React, { useState } from 'react';
import { CheckBox, Button, TextInput, Dropdown } from "@egovernments/digit-ui-react-components";
import { fieldTypes, propertyMap } from './FieldVariable'


const FieldEditorComponent = ({
    objectMode,
    updatingIndex,
    showCurrentField,
    currentRequired,
    currentUnique,
    currentFieldName,
    setCurrentFieldName,
    state,
    currentFieldType,
    currentOptions,
    updateFieldOption,
    saveField,
    cancelSave,
    setCurrentRequired,
    setCurrentUnique,
    selectedArrayType,
    setSelectedArrayType
}) => {
    const arrayTypes = [
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Date', value: 'date' },
        { label: 'Date-Time', value: 'date-time' },
        { label: 'Object', value: 'object' },
    ];
    const [requiredError, setRequiredError] = useState(null)


    return (
        <div style={{ height: "100%" }}>
            {showCurrentField ? (
                <div>
                    {!objectMode ? (<div style={{ marginLeft: "10px" }}>
                        <CheckBox
                            label="Required"
                            checked={currentRequired}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCurrentRequired(true);
                                    setRequiredError(null);
                                } else {
                                    if (!currentUnique) {
                                        setCurrentRequired(false);
                                        setRequiredError(null);
                                    } else {
                                        setRequiredError("First make the 'Unique' checkbox unchecked.");
                                    }
                                }
                            }}
                        />

                        <CheckBox
                            label="Unique"
                            checked={currentUnique}
                            onChange={(e) => {
                                setCurrentUnique(e.target.checked);
                                setRequiredError(null);
                                if (e.target.checked) {
                                    setCurrentRequired(true);
                                }
                            }}
                        />
                    </div>) : (null)}


                    {requiredError && <span style={{ color: "red", margin: "5px", fontSize: "15px" }}>{requiredError}</span>}
                    <div className='workbench-space-between' style={{ marginRight: "10px", marginLeft: "10px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        <div className='label-field-pair'>
                            <div style={{ backgroundColor: "#fff !important" }}>
                                <h2 className="card-label undefined">Field Name *</h2>
                                <TextInput
                                    type="text"
                                    value={currentFieldName}
                                    onChange={(e) => setCurrentFieldName(e.target.value)}
                                    customClass="employee-card-input"
                                    style={{ backgroundColor: "white" }}
                                />

                                {state.nameError.edit && <div style={{ fontSize: "15px", color: "red" }}>{state.nameError.edit}</div>}
                            </div>
                        </div>
                        <div className='label-field-pair'>
                            <h2 className="card-label">Type</h2>
                            <Dropdown
                                selected={{
                                    label: currentFieldType.charAt(0).toUpperCase() + currentFieldType.slice(1),
                                    value: currentFieldType,
                                }}
                                option={fieldTypes}
                                optionKey="label"
                                t={(text) => text}
                                style={{ width: '100%' }}
                                className="dropdown-zIndex0"
                                disable={true}
                            />
                        </div>
                        {propertyMap[currentFieldType].map((property) => (
                            <div className='label-field-pair' key={property}>
                                <h2 className="card-label">{property}</h2>
                                {currentFieldType === 'array' && property === 'arrayType' ? (
                                    <Dropdown
                                        selected={selectedArrayType}
                                        select={(value) => { setSelectedArrayType(value); updateFieldOption(property, value.value) }}
                                        option={arrayTypes}
                                        optionKey="label"
                                        t={(text) => text}
                                        style={{ width: '100%' }}
                                        // className="dropdown-zIndex0"
                                        disable={updatingIndex !== null}
                                    />
                                ) : (
                                    <TextInput
                                        type={currentFieldType === 'date-time' ? 'datetime-local' : (property === 'pattern' || property === 'format' ? 'text' : (currentFieldType.includes('date') ? 'date' : 'number'))}
                                        value={currentOptions[property] || ''}
                                        onChange={(e) => updateFieldOption(property, e.target.value)}
                                        customClass="employee-card-input"
                                        style={{ backgroundColor: "white" }}
                                    />
                                )}
                            </div>
                        ))}

                        {currentFieldType === 'array' && propertyMap[selectedArrayType.value] && propertyMap[selectedArrayType.value].map((property) => (
                            <div className='label-field-pair' key={property}>
                                <h2 className="card-label">{property}</h2>
                                <TextInput
                                    type={selectedArrayType.value === 'date-time' ? 'datetime-local' : (property === 'pattern' || property === 'format' ? 'text' : (selectedArrayType.value.includes('date') ? 'date' : 'number'))}
                                    value={currentOptions[property] || ''}
                                    onChange={(e) => updateFieldOption(property, e.target.value)}
                                    customClass="employee-card-input"
                                    style={{ backgroundColor: "white" }}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: "10px", marginBottom: "10px" }}>
                        <Button
                            onButtonClick={() => saveField()}
                            label={"Save Field"}
                            style={{ marginRight: "10px", marginLeft: "auto" }}
                        />
                        <Button
                            onButtonClick={() => cancelSave()}
                            label={"Cancel"}
                            style={{ marginRight: "10px" }}
                            variation={"secondary"}
                        />
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>Add a field or select a field to edit</p>
                </div>
            )}
        </div>
    );
};

export default FieldEditorComponent;
