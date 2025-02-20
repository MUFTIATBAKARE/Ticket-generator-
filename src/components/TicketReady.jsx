import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import Barcode from "../assets/bar-code.svg";
import Frame from "../assets/bg.svg";

function TicketReady({ page, currentStep, imageUrl, newTicket }) {
  const [ticketNumber, setTicketNumber] = useState(0);
  const [ticketType, setTicketType] = useState("");
  const [personalData, setPersonalData] = useState({
    Name: "",
    mail: "",
    specialRequest: "",
  });
  useEffect(() => {
    const storedTicketNumber = localStorage.getItem("ticketNumber");
    const storedTicketType = localStorage.getItem("ticketType");
    const storedPersonalData = localStorage.getItem("formData");

    if (storedTicketNumber) {
      setTicketNumber(JSON.parse(storedTicketNumber));
    }
    if (storedTicketType) {
      setTicketType(JSON.parse(storedTicketType));
    }
    if (storedPersonalData) {
      setPersonalData(JSON.parse(storedPersonalData));
    }
  }, []);
  return (
    <div className="content_container">
      <div className="content">
        <div className="select-ticket">
          <p className="big">Ready</p>
          <p className="small">Step 3/3</p>
        </div>
      </div>
      <ProgressBar currentPage={page} activeStep={currentStep} />
      <div className="ticket-content">
        <p className="ticket-heading">Your Ticket is Booked!</p>
        <p className="ticket-body">
          Check your mail for a copy or you can download
        </p>
        <div className="ticket-subcontent">
          <div className="ticket-frame">
            <img src={Frame} alt="frame" />
          </div>
          <div className="ticket-h">
            <div className="z">
              <p className="z-head">Techember Fest ”25</p>
              <p className="z-text">📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className="z-text">📅 March 15, 2025 | 7:00 PM</p>
            </div>
            <div className="y">
              {imageUrl && (
                <img src={imageUrl} alt="avatar" className="avatar" />
              )}
            </div>
            <div className="x">
              <div className="xa k">
                <span>
                  <label>Name</label>
                  <p>{personalData.Name}</p>
                </span>
                <span className="i">
                  <label>mail</label>
                  <p>{personalData.mail}</p>
                </span>
              </div>
              <div className="xa k">
                <span>
                  <label>Ticket Type</label>
                  <p>{ticketType}</p>
                </span>
                <span className="i">
                  <label>Ticket No</label>
                  <p>{ticketNumber}</p>
                </span>
              </div>
              <div>
                <span>
                  <label>Special request?</label>
                  <p>{personalData.specialRequest}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="ticket-barcode">
            <img src={Barcode} alt="barcode" className="barcode" />
          </div>
        </div>
      </div>
      <div className="call-action">
        <button className="back" onClick={newTicket}>
          Book Another Ticket
        </button>
        <button type="submit">Download Ticket</button>
      </div>
    </div>
  );
}
TicketReady.propTypes = {
  page: PropTypes.number.isRequired,
  newTicket: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
};
export default TicketReady;
