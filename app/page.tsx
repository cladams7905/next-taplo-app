import Image from "next/image";
import HomeCarousel from "@/components/shared/carousel";
import ProfilePicImage from "@/public/images/profilepicgroup.svg";
import StarImage from "@/public/images/5stars.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24
    bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
       <div className="flex flex-row flex-wrap items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center w-1/2 min-w-[300px] h-[80vh]">
            <div className="badge badge-ghost badge-lg font-sans font-semibold p-4 mb-8">Launching August 2024</div>
            <h1 className="font-heading text-4xl mb-8">Prep all your teaching materials with the click of a button.</h1>
            <p className="font-sans mb-8">Prepple is a GPT-powered service that allows you to generate quality lesson materials with your favorite tools in seconds.</p>
            <div className="join mb-8">
              <input type="text" placeholder="me@email.com" className="input input-bordered input-secondary join-item w-full max-w-xs" />
              <a className="btn btn-secondary join-item">Join the Waitlist</a>
            </div>
            <p className="font-sans lg:mb-12 sm:mb-8 text-gray-500 text-sm">You will be notified via email when Prepple has officially launched!</p>
            <Image  
                src={StarImage}
                alt="5 stars"
                width="97"
                height="16"
                ></Image>
              <div className="font-sans text-sm mt-2"><span className="font-extrabold">21</span> teachers have signed up for Prepple! 🎉</div>
          </div>
          <div className="flex flex-1 items-center justify-center w-1/2 min-w-[300px] h-3/5 ">
          <HomeCarousel/>
          </div>
       </div>
       <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" checked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
</div>
    </main>
  );
}
