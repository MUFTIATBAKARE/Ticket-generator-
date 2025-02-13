import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import Upload from "../assets/cloud-download.svg";

function AttendeeDetails({ nextStep, widgetRef, page, currentStep }) {
  const [personalData, setPersonalData] = useState({
    Name: "",
    Mail: "",
    SpecialRequest: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    localStorage.setItem("personalData", JSON.stringify(personalData));
    console.log(personalData);
  }, [personalData]);

  const onSubmit = (data) => {
    setPersonalData({
      Name: data.Name,
      mail: data.Mail,
      SpecialRequest: data.SpecialRequest,
    });
    nextStep();
  };
  const handleRequestChange = (e) => {
    console.log(e.target.value);
    setPersonalData((prevData) => ({
      ...prevData,
      SpecialRequest: e.target.value,
    }));
  };
  console.log(localStorage);
  return (
    <div className="content_container">
      <div className="content">
        <p className="big">Attendee Details</p>
        <p className="small">Step 2/3</p>
      </div>
      <ProgressBar currentPage={page} activeStep={currentStep} />
      <div className="sub_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="first-content-a">
            <p className="first-content-textb">Upload Profile Photo</p>
            <div className="upload-box">
              <div className="upload" onClick={() => widgetRef.current.open()}>
                <img src={Upload} alt="upload" />
                <p>Drag & drop or click to upload</p>
              </div>
            </div>
          </div>
          <div className="form-details-a">
            <label>Enter your name</label>
            <input
              type="text"
              {...register("Name", { required: true })}
              value={personalData.Name}
              onChange={(e) =>
                setPersonalData((prevData) => ({
                  ...prevData,
                  Name: e.target.value,
                }))
              }
              aria-invalid={errors.Name ? "true" : "false"}
            />
            {errors.Name?.type === "required" && (
              <p role="alert" className="alert">
                Name is required
              </p>
            )}
          </div>
          <div className="form-details">
            <label>Enter your mail *</label>
            <input
              type="email"
              name="mail"
              id="mail"
              placeholder="hello@avioflagos.io"
              {...register("mail", { required: "Email Address is required" })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {errors.mail && (
              <p role="alert" className="alert">
                {errors.mail.message}
              </p>
            )}
          </div>
          <div className="form-details">
            <label>Special request</label>
            <textarea
              name="textarea"
              id="textarea"
              onChange={handleRequestChange}
              placeholder="Textarea"
            ></textarea>
          </div>
          <div className="call-action">
            <button className="back">Back</button>
            <button type="submit">Get My Free Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}
AttendeeDetails.propTypes = {
  nextStep: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  widgetRef: PropTypes.shape({
    current: PropTypes.shape({
      open: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
const UploadWidget = ({ setWidgetRef }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dhwgprnjz",
          uploadPreset: "newbie",
        },
        function (error, result) {
          console.log(result);
          console.log(result.info.secure_url);
          if (result && result.info.secure_url) {
            const newImageUrl = result.info.secure_url;
            setImageUrl(newImageUrl);
            localStorage.setItem("imageUrl", JSON.stringify(newImageUrl));
            console.log(newImageUrl);
            console.log(localStorage);
          }
        }
      );
      setWidgetRef(widgetRef);
    }
  }, [setWidgetRef, imageUrl]);

  return null;
};
UploadWidget.propTypes = {
  setWidgetRef: PropTypes.func.isRequired,
};
export { AttendeeDetails, UploadWidget };
