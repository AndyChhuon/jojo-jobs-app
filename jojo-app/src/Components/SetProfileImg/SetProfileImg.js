import "./SetProfileImg.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Popover from "react-bootstrap/Popover";

export default function SetProfileImg(props) {
  const { setProfileHasChanged, croppedImg, setCroppedImg } = props;

  const TO_RADIANS = Math.PI / 180;

  var scale = 1;
  var rotate = 0;

  const [crop, setCrop] = useState();
  const [aspect, setAspect] = useState(1 / 1);

  //On select file, set image src inside cropper
  const [imgSrc, setImgSrc] = useState("");

  const [show, setShow] = useState(false);

  const uploadFileRef = useRef(null);
  const imgRef = useRef(null);

  //Crop image
  const resizeImage = (image, crop, callback) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var imageObj = new Image();

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    ctx.rotate(rotateRads);
    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    callback(canvas.toDataURL("image/png"));
  };

  const onCompletedCrop = (crop) => {
    if (crop.width && crop.height) {
      resizeImage(imgRef.current, crop, (url) => {
        setCroppedImg(url);
        setProfileHasChanged(true);
      });
    }
  };

  //Handle image upload (show crop preview)
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCroppedImg(reader.result?.toString() || "");
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
      setShow(true);
    }
    e.target.value = "";
  };

  const handleIconClick = () => {
    uploadFileRef.current.click();
  };

  return (
    <div className="setProfileImg">
      <div className="profileImgContainer">
        <img className="image" src={croppedImg}></img>
        <Popover
          id="popover-positioned-right"
          className="popover-positioned-right"
          style={show ? { display: "block" } : { display: "none" }}
        >
          <Popover.Header as="h3">
            <span>Crop Your Profile</span>
            <span className="close-btn" onClick={() => setShow(false)}>
              <FontAwesomeIcon icon={faClose} />
            </span>
          </Popover.Header>
          <Popover.Body>
            {imgSrc && (
              <div className="crop-image">
                <ReactCrop
                  crop={crop}
                  aspect={aspect}
                  onComplete={(c) => onCompletedCrop(c)}
                  onChange={(c) => setCrop(c)}
                >
                  <img id="crop-img" ref={imgRef} src={imgSrc} alt="Crop me" />
                </ReactCrop>
              </div>
            )}
          </Popover.Body>
        </Popover>

        <div className="overlay" onClick={handleIconClick}>
          <input
            type="file"
            className="file-upload"
            ref={uploadFileRef}
            accept="image/*"
            onChange={onSelectFile}
          ></input>
          <FontAwesomeIcon icon={faEdit} className="iconEdit" />
        </div>
      </div>
    </div>
  );
}
