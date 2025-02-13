import PropTypes from "prop-types";

function ProgressBar({ currentPage, activeStep }) {
  const totalSteps = 2;
  const progressBarValue = (currentPage / totalSteps) * 100;

  return (
    <>
      <div className="progress_bar">
        <div className="filler" style={{ width: `${progressBarValue}%` }}></div>
        <div className={`  ${activeStep >= 2 ? "active" : ""}`}></div>
        <div className={` ${activeStep >= 3 ? "active" : ""}`}></div>
      </div>
    </>
  );
}
ProgressBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default ProgressBar;
