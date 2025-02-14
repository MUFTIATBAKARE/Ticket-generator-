import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";

function TicketReady({ page, currentStep }) {
  const [ticketData, setTicketData] = useState({
    numberOfTickets: 0,
    ticketType: "",
  });
  const [personalData, setPersonalData] = useState({
    Name: "",
    Mail: "",
    SpecialRequest: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const storedTicketData = localStorage.getItem("ticketData");
    const storedPersonalData = localStorage.getItem("personalData");
    const storedImageUrl = localStorage.getItem("imageUrl");

    if (storedTicketData) {
      setTicketData(JSON.parse(storedTicketData));
    }
    if (storedPersonalData) {
      setPersonalData(JSON.parse(storedPersonalData));
    }
    if (storedImageUrl) {
      setImageUrl(JSON.parse(storedImageUrl));
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
          <div className="ticket-h">
            <div className="z">
              <p className="z-head">Techember Fest ”25</p>
              <p className="z-text">📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className="z-text">📅 March 15, 2025 | 7:00 PM</p>
            </div>
            <div className="y">
              {imageUrl && <img src={imageUrl} alt="avatar" />}
            </div>
            <div className="x">
              <div className="xa">
                <span>
                  <label>Name</label>
                  <p>{personalData.Name}</p>
                </span>
                <span>
                  <label>mail</label>
                  <p>{personalData.Mail}</p>
                </span>
              </div>
              <div className="xa">
                <span>
                  <label>Ticket Type</label>
                  <p>{ticketData.ticketType}</p>
                </span>
                <span>
                  <label>Ticket No</label>
                  <p>{ticketData.numberOfTickets}</p>
                </span>
              </div>
              <div>
                <span>
                  <label>Special request?</label>
                  <p>{personalData.SpecialRequest}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="ticket-barcode"></div>
      </div>
      <div className="call-action">
        <button className="back">Book Another Ticket</button>
        <button type="submit">Download Ticket</button>
      </div>
    </div>
  );
}
TicketReady.propTypes = {
  page: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
export default TicketReady;
