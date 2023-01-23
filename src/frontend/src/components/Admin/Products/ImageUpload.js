import React from "react";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

// for profile picture
class ImageUpload extends React.Component {
  state = { warningMsg: "" };

  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      const message = "Please submit valid file type";
      this.setState({ warningMsg: message });
    } else {
      this.props.addFile(accepted);
      this.setState({ warningMsg: "" });
      // console.log(accepted[0].preview)

      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then((value) => {
        // console.log(value);
      });
    }
  };

  render() {
    const { files } = this.props;
    const thumbsContainer = {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
    };

    const thumbs = files.map((file) => (
      <img
        key={uuidv4()}
        style={thumbsContainer}
        src={file.preview}
        alt="profile"
        className="icon"
      />
    ));

    // console.log(thumbs)

    const render =
      Object.keys(files).length !== 0 ? (
        files.map((file) => <aside key={uuidv4()}>{thumbs}</aside>)
      ) : (
        <p className="frame-img">
          {this.props.info ? (
            <img src={this.props.info.img} alt="" style={thumbsContainer} />
          ) : (
            <img src="" alt="" style={thumbsContainer} />
          )}
        </p>
      );
    return (
      <div>
        <p>{this.state.warningMsg}</p>

        <Dropzone
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            border: " 1px dashed",
          }}
          className="frame"
          multiple={false}
          accept="image/*"
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
        >
          {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
            // for drag and drop warning statement
            if (isDragReject) return "Please submit a valid file";
            return render;
          }}
        </Dropzone>
      </div>
    );
  }
}

export default ImageUpload;
