import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import Upload from "../assets/cloud-download.svg";

function AttendeeDetails({ nextStep, widgetRef, page, currentStep }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formData = watch();
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log(formData);
  }, [formData]);
  console.log(localStorage);
  console.log(formData.mail);
  const onSubmit = () => {
    nextStep();
  };
  console.log(localStorage);
  return (
    <div className="content_container">
      <div className="content">
        <div className="select-ticket">
          <p className="big">Attendee Details</p>
          <p className="small">Step 2/3</p>
        </div>
        <ProgressBar currentPage={page} activeStep={currentStep} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="first-content-a">
            <p className="first-content-textb">Upload Profile Photo</p>
            <div className="upload-box">
              <div className="upload">
                <img
                  src={Upload}
                  alt="upload"
                  onClick={() => widgetRef.current.open()}
                />
                <p>Drag & drop or click to upload</p>
              </div>
            </div>
          </div>
          <div className="form-details-a">
            <label>Enter your name</label>
            <input
              type="text"
              {...register("Name", { required: true })}
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
              placeholder="Textarea"
              {...register("specialRequest", {
                required: "Nil, if no request",
              })}
              aria-invalid={errors.specialRequest ? "true" : "false"}
            ></textarea>
            {errors.specialRequest && (
              <p role="alert" className="alert">
                {errors.specialRequest.message}
              </p>
            )}
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
