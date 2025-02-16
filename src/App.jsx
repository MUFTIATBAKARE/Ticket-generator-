import { useEffect, useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("imageUrl");
    console.log(storedImageUrl);
    if (storedImageUrl) {
      setImageUrl(JSON.parse(storedImageUrl));
    }
  }, []);
  const nextStep = () => {
    if (page !== totalPages - 1) {
      setPage(page + 1);
      setCurrentStep(currentStep + 1);
    }
  };
  const newTicket = () => {
    setPage(0);
    setCurrentStep(1);
    localStorage.removeItem("imageUrl");
    setImageUrl("");
  };
  const goBack = () => {
    setPage(0);
    setCurrentStep(1);
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
            imageUrl={imageUrl}
            page={page}
            currentStep={currentStep}
            goBack={goBack}
          />
        );
      case 2:
        return (
          <TicketReady
            page={page}
            currentStep={currentStep}
            imageUrl={imageUrl}
            newTicket={newTicket}
          />
        );
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
        <UploadWidget setWidgetRef={setWidgetRef} setImageUrl={setImageUrl} />
      </div>
    </>
  );
}

export default App;
