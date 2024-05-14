import Image from "next/image";
import HomeCarousel from "@/components/shared/carousel";
import ProfilePicImage from "@/public/images/profilepicgroup.svg";
import StarImage from "@/public/images/5stars.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24
    bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
       <div className="flex flex-row flex-wrap lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center lg:w-1/2 w-fit min-w-[330px] h-[80vh]">
            <div className="badge badge-ghost badge-md font-sans font-semibold p-4 mb-8 bg-white border border-gray-300 opacity-75">Launching August 2024</div>
            <h1 className="font-heading text-4xl mb-8">Prep all your learning materials with the click of a button.</h1>
            <p className="font-sans mb-8 text-gray-500">Prepple is a free GPT-powered service that allows you to build customizable learning materials in minutes from scratch.</p>
            <div className="join mb-8 font-sans">
              <input type="text" placeholder="me@email.com" className="input input-bordered input-secondary join-item w-full max-w-xs" />
              <a className="btn btn-secondary join-item">Subscribe</a>
            </div>
            <p className="font-sans lg:mb-12 sm:mb-8 text-gray-500 text-sm">You will be notified via email when Prepple has officially launched!</p>
            <Image  
                src={StarImage}
                alt="5 stars"
                width="97"
                height="16"
                ></Image>
              <div className="font-sans text-sm mt-2 text-gray-500"><span className="font-extrabold">21</span> teachers have signed up for Prepple! 🎉</div>
          </div>
          <div className="flex flex-1 items-center justify-center lg:w-1/2 w-full min-w-[400px] h-3/5 ">
          <HomeCarousel/>
          </div>
       </div>
       <h1 className="font-heading text-4xl mb-8">Take a peak at what resources you can build with Prepple.</h1>
       <div className="flex flex-row justify-center flex-wrap gap-4 p-6 font-sans">
            <div className="collapse p-4 shadow-lg max-w-64 border border-gray-300 bg-white h-fit">
              <input type="radio" name="my-accordion-1" /> 
              <div className="collapse-title text-lg font-semibold">
                Flashcard sets
              </div>
              <div className="collapse-content"> 
                <p>hello</p>
              </div>
            </div>
            <div className="collapse p-4 shadow-lg max-w-64 border border-gray-300 bg-white h-fit">
              <input type="radio" name="my-accordion-1" /> 
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content"> 
                <p>hello</p>
              </div>
            </div>
          </div>
    </main>
  );
}
