import React from 'react'
import {
    Typography,
    Button,
    Form,
    message,
    Input,
    Icon
} from 'antd';
import Dropzone from 'react-dropzone';

const {TextArea} = Input;
const {Title} = Typography;

function VideoUploadPage() {
    return (

        <div
            style={{
                maxWidth: '700px',
                margin: '2rem auto'
            }}>
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit="onSubmit">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    {/* Drop zone */}

                    {/* Thumbnail */}

                    <div>
                        <img src="src" alt="alt"/>
                    </div>

                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input onChange="onChange" value="value"/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange="onChange" value="value"/>
                <br/>
                <br/>

                <select onChange="onChange">
                    <option key="key" value="value"></option>
                </select>

                <select onChange="onChange">
                    <option key="key" value="value"></option>
                </select>

                <Button type="primary" size="lager" onClick="onClick">
                    submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage
