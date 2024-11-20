import { FaHandshake, FaToolbox, FaClock, FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuMailOpen } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router";

const Home = () => {
 const navigate = useNavigate();

  return (
    <>
    <section
      className={`hero-container text-text bg-contain bg-center min-h-screen w-full bg-no-repeat gap-8`}
    >
      <article className="w-full min-h-screen backdrop-blur-sm shadow-2xl shadow-gray-500 flex flex-col justify-center items-center">
        <div
          className="absolute  bottom-0 h-full w-full bg-gradient-to-r from-gradient-start to-gradient-end animate-lightSpeedInRight animate-duration-1000 animate-ease-linear"
          style={{
            clipPath:
              "polygon(76% 1%, 100% 0, 100% 60%, 100% 100%, 19% 100%, 0 71%, 39% 36%)",
          }}
        ></div>

        <div className="z-10 flex p-2 flex-col items-end justify-center">
          <blockquote className="text-sm font-semibold animate-backInRight animate-delay-300 animate-duration-1000 animate-ease-in-out">
            Get Organized, Get Productive
          </blockquote>
          <h1 className="text-4xl font-bold rounded-lg animate-backInLeft animate-delay-500 animate-duration-1000 animate-ease-in-out">
            TASKFORGE - DAILY TASK MANAGEMENT
          </h1>
          <p className="leading-loose mt-8 mb-8 animate-fadeInUp animate-duration-1000 animate-delay-700 animate-ease-in">
            TaskForge is your ultimate solution for managing daily tasks with
            ease. Our drag-and-drop feature, priority and due date options, and
            versatile task editing capabilities make organizing simple and
            efficient.
          </p>
        </div>
        <button className="z-20 animate-jackInTheBox animate-delay-500 animate-duration-1000 animate-ease-in-quart" onClick={()=> navigate("/register")}>
          Get Started
        </button>
      </article>

      <article className="flex flex-col justify-center items-center gap-8 p-2  w-full mt-8 ">
        <h2 className="text-3xl text-center font-semibold">COLLABORATION'S</h2>
        <p>
          With TaskForge, you can create, manage and delete tasks effortlessly.
          From individual task lists to collaborative group projects, our
          platform provides the tools you need to stay on top of your workload.
        </p>
        <div className="grid grid-flow-row  p-2 grid-cols-2 justify-center items-center ">
          <div className="flex flex-col justify-center items-center min-h-[110px] active:bg-accent active:text-text-muted">
            <FaHandshake size={36} />
            <p className="text-center">SIMPLE TASK CREATION AND EDITING</p>
          </div>
          <div className="flex flex-col justify-center min-h-[110px] items-center active:bg-accent active:text-text-muted">
            <IoSettingsSharp size={36} />
            <p className="text-center">PRIORITY AND DUE DATE OPTIONS</p>
          </div>
          <div className="flex flex-col justify-center min-h-[110px] items-center active:bg-accent active:text-text-muted">
            <FaToolbox size={36} />
            <p className="text-center">DRAG-AND-DROP FUNCTIONALITY</p>
          </div>
          <div className="flex flex-col justify-center min-h-[110px] items-center active:bg-accent active:text-text-muted">
            <FaClock size={36} />
            <p className="text-center">CATEGORY TASK MANAGEMENT</p>
          </div>
        </div>
      </article>

     

      <article className="min-h-screen w-full p-2 flex flex-col justify-center items-center">
      <div className="p-8 flex gap-4">
        <div>
          <img
            src="https://picsum.photos/150/250?random=1"
            alt="showcase image 1"
            className="mt-8"
          />
        </div>
        <div>
          <img
            src="https://picsum.photos/150/250?random=2"
            alt="showcase image 2"
            className=""
          />
        </div>
      </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="text-3xl font-semibold text-center">EXPLORE TASKFORGE</h2>
          <p className="text-center leading-relaxed">
            Take a glimpse into the world of TaskForge. Our gallery showcases
            our platform's intuitive interface, powerful features and the
            seamless task management experience it offers
          </p>
          <button className="bg-">contact us</button>
        </div>
      </article>

      <article className="flex flex-col justify-center items-center p-2">
          <h3 className="text-3xl font-semibold text-center">CLIENT TESTIMONIALS</h3>
          <p className="text-center leading-relaxed">Discover what our clients have to say about their experience with TaskForge. Hear firsthand how our platform has transformed their task management processes.</p>
          <div className="flex flex-col gap-8 mt-8">
          <Testimonial id={64} name={"john smith"} position={"CEO, Tech Solutions inc."} review={"TaskForge has revolutionized the way out team organizes and manages tasks. Its intuitive features and seamless user experience make it a must-have for any organization."}/>

          <Testimonial id={65} name={"emily johnson"} position={"Freelance Designer"} review={"As a freelance professional, staying on top of my tasks is crucial. TaskForge has become my go-to platform for efficient task management, helping me stay productive and organized."}  />

          <Testimonial id={91} name={"michael thompson"} position={"Small Business Owner"} review={"TaskForge has been a game-changer for my small business. It has streamlined our task management processes and improved our team's overall productivity."}/>
          </div>
      </article>
    </section>
    <footer className="flex flex-col justify-center items-center p-2 gap-4">
          <article className="flex flex-col justify-center items-center">
            <h2>GET IN TOUCH</h2>
            <p className="text-center">Connect with TaskForge to streamline your daily task management. Our team is ready to assist you in optimizing your productivity.</p>
          </article>

          <article className="flex flex-col justify-center items-center">
            <h2>CONTACT</h2>
            <div className="flex justify-center items-center gap-1">
              <FaLocationDot />
              <address>
                TaskForge, Tamilnadu, IN.
              </address>
            </div>
            <div className="flex justify-center items-center gap-1">
            <FaPhone />
            <a href="tel:+911234567890">+9112 345 6789</a>
          </div>
          <div className="flex justify-center items-center gap-1">
            <LuMailOpen />
            <a href="mailto:support@dummy.com">support@dummy.com</a>
          </div>
          </article>

          <article className="flex flex-col justify-center items-center">
            <h2>SERVICES</h2>
            <ul>
              <li>Priority and Due Date Options</li>
              <li>Drag-and-Drop Functionality</li>
              <li>Personalized Task Lists</li>
              <li>Group Task Management</li>
            </ul>
          </article>

          <hr className="w-full border-text"/>
          <div>
            <small>Copyright {new Date().getFullYear()} All Rights Reserved.</small>
            <small>This website is design and developed by <a href="https://github.com/OneClickTechy" target="_blank" rel="noopener noreferrer">OneClick Techy</a></small>
          </div>
    </footer>
    </>
  );
};

export default Home;

function Testimonial({id, name, position, review}){
  return (
    <div className="flex flex-col justify-center items-center gap-4 rounded-2xl mt-4 relative overflow-hidden">
      <img src={`https://picsum.photos/id/${id}/100/100`} alt="client's photo" className="rounded-full mt-4 z-20" />
      <div className="absolute w-full bg-white h-[90%] z-10 rounded-2xl mt-16"></div>
      <h2 className="text-lg z-20 text-black font-semibold">{name.toUpperCase()}</h2>
      <p className="text-sm z-20 text-black">{position.toUpperCase()}</p>

        <p className="z-20 text-black text-center text-sm p-4 bg-primary rounded-b-2xl leading-relaxed">{review}</p>
        

    </div>
  );
}


