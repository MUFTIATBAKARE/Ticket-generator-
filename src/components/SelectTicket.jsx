import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function SelectTicket({ nextStep, page, currentStep }) {
  const [ticketType, setTicketType] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const ticketNumber = watch("ticketNumber");
  useEffect(() => {
    if (ticketNumber > 0) {
      localStorage.setItem("ticketNumber", JSON.stringify(ticketNumber));
      console.log(ticketNumber);
      localStorage.setItem("ticketType", JSON.stringify(ticketType));
    }
  }, [ticketNumber, ticketType]);
  const notify = () =>
    toast("Please select a ticket type and/or number of tickets");
  const onSubmit = () => {
    if (ticketNumber && ticketType) {
      nextStep();
    } else notify();
  };
  const handleTicketTypeClick = (type) => {
    setTicketType(type);
  };
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="content_container">
      <div className="content">
        <div className="select-ticket">
          <p className="big">Ticket Selection</p>
          <p className="small">Step 1/3</p>
        </div>
        <ProgressBar currentPage={page} activeStep={currentStep} />
      </div>
      <div className="sub_content">
        <div className="first-content">
          <div className="g">
            <h3>Techember Fest ”25</h3>
            <p className="first-content-texta">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
          </div>
          <span className="first-subcontent">
            <p>📍 [Event Location]</p>
            <p className="hide">| |</p>
            <p>March 15, 2025 | 7:00 PM</p>
          </span>
        </div>
        <form className="second-content" onSubmit={handleSubmit(onSubmit)}>
          <p className="text">Select Ticket Type:</p>
          <span className="flex">
            <span
              className="flex-content"
              onClick={() => handleTicketTypeClick("Regular Access")}
            >
              <p className="a-subcontent">Free</p>
              <span className="flex-subcontent">
                <p className="bold">Regular Access</p>
                <p className="d">20/52</p>
              </span>
            </span>
            <span
              className="flex-content"
              onClick={() => handleTicketTypeClick("VIP Access")}
            >
              <p className="a-subcontent">$50</p>
              <span className="flex-subcontent">
                <p className="bold">Vip Access</p>
                <p className="d">20/52</p>
              </span>
            </span>
            <span
              className="flex-content"
              onClick={() => handleTicketTypeClick("VVIP Access")}
            >
              <p className="a-subcontent">$150</p>
              <span className="flex-subcontent">
                <p className="bold">VVIP Access</p>
                <p className="d">20/52</p>
              </span>
            </span>
          </span>
          <ToastContainer />

          <p className="m"> Number of Tickets</p>
          <select
            id="ticketNumber"
            {...register("ticketNumber", {
              required: "please select number of ticket(s)",
            })}
            aria-invalid={errors.ticketNumber ? "true" : "false"}
          >
            <option value="" disabled>
              Select a number
            </option>
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          {errors.ticketNumber && (
            <p role="alert" className="alert">
              {errors.ticketNumber.message}
            </p>
          )}
          <div className="call-action">
            <button className="back">Cancel</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
SelectTicket.propTypes = {
  nextStep: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
export default SelectTicket;
