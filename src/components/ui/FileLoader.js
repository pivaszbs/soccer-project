import React, { Component, Fragment } from 'react'
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';
import { firebase } from '../../firebase';

export default class extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: '',

    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) {
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null
    }

    handleUploadStart = () => {
        this.setState({ isUploading: true })
    }

    handleUploadError = (error) => {
        this.setState({
            isUploading: false
        });
        console.log(error)
    }

    handleUploadSuccess = (filename) => {

        console.log(filename)

        this.setState({
            name: filename,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir)
            .child(filename).getDownloadURL()
            .then(url => {
                this.setState({ fileURL: url })
            })

        this.props.filename(filename)

    }

    uploadAgain = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <Fragment>
                {!this.state.fileURL ?
                    <Fragment>
                        <div className="label_inputs">
                            {this.props.tag}
                        </div>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </Fragment> : null
                }
                {this.state.isUploading ?
                    <div className="progress"
                        style={{ textAlign: 'center', margin: '30px 0' }}
                    >
                        <CircularProgress
                            style={{ color: '#98c6e9' }}
                            thickness={7}
                        />
                    </div>
                    : null}
                {
                    this.state.fileURL ?
                        <div className="image_upload_container">
                            <img
                                style={{
                                    width: '100%'
                                }}
                                src={this.state.fileURL}
                                alt={this.state.name}
                            />
                            <div className="remove" onClick={() => this.uploadAgain()}>
                                Remove
                        </div>
                        </div> : null
                }

            </Fragment>
        )
    }
}
