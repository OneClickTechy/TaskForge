import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
const ThemeToggler = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div
        className="z-50 md:absolute sm:right-6 sm:top-6 toggler-container w-[50px] bg-primary rounded-3xl"
        onClick={handleToggleTheme} role="button" tabIndex={0} aria-label="Click to submit"
      >
        <div
          className={`${
            theme === "dark" ? "translate-x-[100%]" : null
          } bg-accent transition-transform ease-linear duration-300 w-[25px] h-[25px] rounded-3xl flex justify-center items-center`}
        >
          {theme === "dark" ? (
            <MdDarkMode className="text-[black] " />
          ) : (
            <MdLightMode className="text-[white]" />
          )}
        </div>
      </div>
    </>
  );
};

export default ThemeToggler;
