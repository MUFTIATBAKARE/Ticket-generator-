import { useState } from "react";
import "./App.css";
import SelectTicket from "./components/SelectTicket";
import TicketReady from "./components/TicketReady";
import Logo from "./assets/logo.svg";
import Arrow from "./assets/arrow.svg";
import { AttendeeDetails, UploadWidget } from "./components/AttendeeDetails";

function App() {
  const [page, setPage] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalPages = 3;
  const [widgetRef, setWidgetRef] = useState(null);
  const nextStep = () => {
    if (page !== totalPages - 1) {
      setPage(page + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const ShowNextPage = () => {
    switch (page) {
      case 0:
        return (
          <SelectTicket
            nextStep={nextStep}
            page={page}
            currentStep={currentStep}
          />
        );
      case 1:
        return (
          <AttendeeDetails
            nextStep={nextStep}
            widgetRef={widgetRef}
            page={page}
            currentStep={currentStep}
          />
        );
      case 2:
        return <TicketReady page={page} currentStep={currentStep} />;
      default:
        break;
    }
  };
  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" />
        <span className="header_content">
          <p>Events</p>
          <p>My Tickets</p>
          <p>About Project</p>
        </span>
        <button className="header_btn">
          <p>My Tickets </p>
          <img src={Arrow} alt="arrow" />
        </button>
      </div>
      {ShowNextPage()}
      <div>
        <UploadWidget setWidgetRef={setWidgetRef} />
      </div>
    </>
  );
}

export default App;
