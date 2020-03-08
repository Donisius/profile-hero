import React, { useState } from 'react';

import {
    Button,
    Dropdown,
    TextArea,
    FileUploaderItem,
    FileUploaderDropContainer
} from 'carbon-components-react';

import axios from 'axios';
import { css } from 'emotion';
import { useHistory } from "react-router-dom";

const formParent = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`;

const formWrapper = css`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const formHeader = css`
    h2 {
        margin-bottom: 1rem;
    }
    margin-bottom: 1rem;
`;

const fieldDropdown = css`
    width: 60%;
`;

const textAreaWrapper = css`
    margin-top: 2rem;
`;

const fileUploaderWrapper = css`
    margin-top: 2rem;
    display: flex;

    @media screen and (max-width: 975px) {
        flex-wrap: wrap;
    }
`;

const resumeUploader = css`
    margin-right: 1rem;

    @media screen and (max-width: 975px) {
        margin-bottom: 1rem;
    }
`;

const formButtons = css`
    margin-top: 2rem;
    margin-left: auto;
`;

const clearButton = css`
    margin-right: 0.5rem;
`;

let lastId = 0;

const uid = (prefix = 'id') => {
    lastId++;
    return `${prefix}${lastId}`;
}

export const Home = ({ setPersonalityInsight, selectedField, setSelectedField, setToneAnalysis }) => {
    const [textInputValue, setTextInputValue] = useState('');
    const [resumeFiles, setResumeFiles] = useState([]);

    let history = useHistory();

    const dropdownItems = [
        {
            text: 'Software Engineering',
            value: 'softwareEng'
        },
        {
            text: 'Business',
            value: 'business'
        }
    ]

    const readAllFiles = () => {
        let promises = [];

        for (let i = 0; i < resumeFiles.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onloadend = (event) => {
                    resolve(event.target.result);
                };
                reader.onerror = (err) => {
                    reject(err)
                };
                reader.readAsText(resumeFiles[i].content);
            }))
        }

        return Promise.all(promises);
    };

    const onSubmit = async () => {
        let textPayload = textInputValue;
        await readAllFiles(resumeFiles).then(result => textPayload = textPayload + result);
        if (textPayload.split(' ').length < 100) {
            return;
        }
        axios.post('/api/upload-text', { chosenField: selectedField.value, textContent: textPayload })
            .then(response => {setPersonalityInsight(response.data.PI); setToneAnalysis(response.data.TONE); console.log(response.data.TONE)})
            // .then(response => {console.log(response.data)})
            .then(() => {history.push('/dashboard')})
            .catch(err => console.log(err));
    };

    const onResumeUpload = (event) => {
        const uploadedFiles = Array.from(event).map(file => (
            {
                name: file.name,
                size: file.size,
                content: file,
                uuid: uid()
            }
        ))
        setResumeFiles([...resumeFiles, ...uploadedFiles]);
    };

    const handleResumeFileDelete = (event) => {
        const updatedResumeFiles = resumeFiles.filter(resumeFile => ( resumeFile.uuid !== event ));
        setResumeFiles(updatedResumeFiles);
    };

    return (
        <div className={formParent}>
            <div className={formWrapper}>
                <div className={formHeader}>
                    <h2>Generate a new insight</h2>
                    <p>Generate a new personality insight and see how you compare to others in the same field</p>
                </div>
                <Dropdown
                    className={fieldDropdown}
                    id='field-dropdown'
                    titleText='Choose what field you are applying for'
                    label='dropdown for choosing a field'
                    items={dropdownItems}
                    itemToString={item => (item ? item.text : '')}
                    onChange={(event) => {setSelectedField(event.selectedItem)}}
                    selectedItem={selectedField}/>
                <div className={textAreaWrapper}>
                    <TextArea
                        labelText='Enter some text to be analyzed (optional)'
                        placeholder='Enter some text here...'
                        rows='10'
                        onChange={event => {setTextInputValue(event.target.value)}} />
                </div>
                <div className={fileUploaderWrapper}>
                    <div className={resumeUploader}>
                        <label className={'bx--label'}>Upload your resume and/or cover letter (optional)</label>
                        <FileUploaderDropContainer
                            labelText="Drag and drop text files here or click to upload"
                            onChange={(event) => {onResumeUpload(event.target.files)}}
                            multiple={true}
                            accept={["text/plain"]} />
                        <div className={'bx--file-container'}>
                            {
                                resumeFiles.map(
                                    ({ name, uuid }) => (
                                        <FileUploaderItem
                                            key={uuid}
                                            uuid={uuid}
                                            name={name}
                                            status={'edit'}
                                            onDelete={() => {handleResumeFileDelete(uuid)}}
                                        />
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={formButtons}>
                    <Button
                        className={clearButton}
                        kind='secondary'>
                        Clear
                    </Button>
                    <Button onClick={() => {onSubmit()}}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
