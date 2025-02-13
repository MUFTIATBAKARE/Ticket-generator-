import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";

function SelectTicket({ nextStep, page, currentStep }) {
  const [ticketData, setTicketData] = useState({
    numberOfTickets: 0,
    ticketType: "",
  });
  useEffect(() => {
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
  }, [ticketData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };
  const handleTicketChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setTicketData((prevData) => ({
        ...prevData,
        numberOfTickets: value,
      }));
    }
  };

  const handleTicketTypeClick = (type) => {
    setTicketData((prevData) => ({
      ...prevData,
      ticketType: type,
    }));
  };

  return (
    <div className="content_container">
      <div className="content">
        <p className="big">Ticket Selection</p>
        <p className="small">Step 1/3</p>
      </div>
      <ProgressBar currentPage={page} activeStep={currentStep} />
      <div className="sub_content">
        <div className="first-content">
          <h3>Techember Fest ”25</h3>
          <p className="first-content-texta">
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
          <span className="first_subcontent">
            <p>📍 [Event Location]</p>
            <p>| |</p>
            <p>March 15, 2025 | 7:00 PM</p>
          </span>
        </div>
        {/* <span className="divider"></span> */}
        <form className="second-content" onSubmit={handleSubmit}>
          <p>Select Ticket Type:</p>
          <span className="flex">
            <span className="flex-content a">
              <span
                className="flex-subcontent "
                onClick={() => handleTicketTypeClick("Regular Access")}
              >
                <p className="bold">Regular Access</p>
                <p>20 left!</p>
              </span>
              <p className="a-subcontent">Free</p>
            </span>
            <span className="flex-content b">
              <span
                className="flex-subcontent"
                onClick={() => handleTicketTypeClick("VIP Access")}
              >
                <p className="bold">Vip Access</p>
                <p>20 left!</p>
              </span>
              <p>$50</p>
            </span>
            <span className="flex-content b">
              <span
                className="flex-subcontent"
                onClick={() => handleTicketTypeClick("VVIP Access")}
              >
                <p className="bold">VVIP Access</p>
                <p>20 left!</p>
              </span>
              <p>$150</p>
            </span>
          </span>
          <p> Number of Tickets</p>
          <input
            type="number"
            name="ticket-number"
            id="ticket-number"
            min="1"
            onChange={handleTicketChange}
          />
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
