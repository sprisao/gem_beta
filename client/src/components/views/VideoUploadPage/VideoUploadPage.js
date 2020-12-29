import React, {useState} from 'react'
import {
    Typography,
    Button,
    Form,
    Message,
    Input,
    Icon,
    message
} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {set} from 'mongoose';

const {TextArea} = Input;
const {Title} = Typography;

//map 사용을 위한 정의 부분

const PrivateOptions = [
    {
        value: 0,
        label: "Private"
    }, {
        value: 1,
        label: "Public"
    }
]

const CategoryOptions = [
    {
        value: 0,
        label: "Film & Animation"
    }, {
        value: 1,
        label: "Autos & Vehicles"
    }, {
        value: 2,
        label: "Film & Animation"
    }, {
        value: 3,
        label: "Autos & Vehicles"
    }

]
// 맵사용을 위한 정의 부분

function VideoUploadPage(props) {
    // user 변수에 user에 관한 모든 정보가 담겨 있다.
    const user = useSelector(state => state.user)
    // 여기에 모든 user정보가 담겨있다!!!
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        console.log(e.currentTarget)
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)

    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)

    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)

    }

    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append("file", files[0])

        console.log(files)

        Axios
            .post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios
                        .post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {

                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            } else {
                                alert('썸네일 생성에 실패 했습니다.')
                            }
                        })
                } else {
                    alert('비디오 업로드를 실패했습니다.')
                }
            })

    }

    const onSubmit = (e) => {
        //클릭을 하려고 했던것을 방지할 수 있다.
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }
        Axios
            .post('/api/video/uploadVideo', variables) // 이 부분을 작성하고 이제 router에서 받도록 route> video.js로 가야쥐 !//
            .then(response => {

                if (response.data.success) {

                    message.success('성공적으로 업로드했습니다.')

                    setTimeout(() => {

                        props
                            .history
                            .push('/')

                    }, 3000);

                } else {
                    alert('비디오 업로드에 실패 했습니다.')
                }
            })
    }

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

            <Form onSubmit={onSubmit}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    {/* Drop zone */}

                    <Dropzone onDrop={onDrop} multiple={true} maxSize={10000000000}>
                        {
                            ({getRootProps, getInputProps}) => (
                                <div
                                    style={{
                                        width: '300px',
                                        height: '240px',
                                        border: '1px solid lightgray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    {...getRootProps()}>
                                    <input {...getInputProps()}/>
                                    <Icon
                                        type="plus"
                                        style={{
                                            fontSize: '3rem'
                                        }}/>
                                </div>
                            )
                        }
                    </Dropzone>

                    {/* Thumbnail */}

                    {
                        ThumbnailPath && <div>
                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                            </div>

                    }

                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle}/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>
                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {
                        PrivateOptions.map(
                            (item, index) => <option key={index} value={item.value}>{item.label}</option>
                        )
                    }
                </select>

                <br/>
                <br/>

                <select onChange={onCategoryChange}>
                    {
                        CategoryOptions.map(
                            (item, index) => <option key={index} value={item.value}>{item.label}</option>
                        )
                    }
                </select>

                <br/>
                <br/>

                <Button type="primary" size="large" onClick={onSubmit}>
                    submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage
