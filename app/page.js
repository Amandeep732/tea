import Link from "next/link";
export default function Home() {

  return (
    <>

      <div className="md:w-full flex flex-col justify-center items-center p-12 gap-12 px-5 md:p-36 ">
        <div className=" flex justify-center items-center font-bold text-3xl md:text-5xl text-gray-50 gap-2">
           <h1> Get Me a Chai</h1>
          <span className="pb-4"><img width={60} src="tea.gif" alt="Tea image" /></span>
        </div>
        <p className="text-white font-semibold text-center">A Crowdfunding platform for creaters. Get funded by your fans and followers. Start Now!</p>
        <div className=" flex gap-4 ">
          <Link href="/login">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start here
            </span>
          </button>
          </Link>
          <Link href={"/about"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
            </span>
          </button>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-slate-800 md:w-full"></div>

      {/* second   broo */}

      <h2 className="font-bold text-white md:p-24 p-10 text-center text-2xl">Your fans can buy you a chai</h2>

      <div className="all flex justify-center items-center md:gap-40 md:w-full pb-12 px-4 gap-5">
        {/* first div */}
        <div className=" text-white flex flex-col">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 rounded-full bg-white w-10 md:w-20 ">
              <img className="rounded-full" src="man.gif" alt="man image" />
            </div>
            <div className="font-bold text-center">Fund Yourself</div>
            <p className="text-center">your fans are available to help you</p>
          </div>
        </div>

        <div className=" text-white flex flex-col">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 rounded-full bg-white w-10 md:w-20 ">
              <img className="rounded-full" src="dollar.gif" alt="man image" />
            </div>
            <div className="font-bold text-center">Fund Yourself</div>
            <p className="text-center">your fans are available to help you</p>
          </div>
        </div>
        <div className=" text-white flex flex-col ">
          <div className=" text-white flex flex-col">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-2 rounded-full bg-white w-10 md:w-20 ">
                <img className="rounded-full" src="group.gif" alt="man image" />
              </div>
              <div className="font-bold text-center">help Your Fans</div>
              <p className="text-center">your fans are available to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* third broo */}
      <div className="h-1 bg-slate-800 md:w-full "></div>

      <h2 className="font-bold md:p-20 p-10 text-white text-center text-2xl">Learn More About Us</h2>

      <div className="text-white flex flex-col gap-y-12 w-[90vw] mx-auto  text-center mb-6">
          <p>At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.</p>
          <p>At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.</p>
          <p>We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.</p>
      </div>

      


    </>

  );
}




