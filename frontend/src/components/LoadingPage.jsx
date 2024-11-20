import PropTypes from "prop-types";

const LoadingPage = ({ content }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center flex flex-col justify-center items-center">
        <div className=" animate-twSpin w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full  mb-4"></div>
        <p className="text-xl font-semibold text-gray-700 animate-fadeIn">
          {content}
        </p>
      </div>
    </div>
  );
};
LoadingPage.propTypes = {
  content: PropTypes.string.isRequired
}
export default LoadingPage;
