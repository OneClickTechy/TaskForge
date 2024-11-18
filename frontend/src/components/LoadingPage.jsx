const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center flex flex-col justify-center items-center">
          <div className=" animate-twSpin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full  mb-4"></div>
        <p className="text-xl font-semibold text-gray-700 animate-fadeIn">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
