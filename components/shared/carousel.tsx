"use client";

import React from 'react'
import { Carousel } from 'react-responsive-3d-carousel'
import Image from 'next/image';
import AddContentImg from "@/public/images/1-addContent.svg";
import SelectContentImg from "@/public/images/2-selectContent.svg";
import EditContentImg from "@/public/images/3-EditContent.svg";
import ShareContentImg from "@/public/images/4-shareContent.svg";

export default function HomeCarousel() {
  return (
    <Carousel isShadow={false} showArrows={false} showStatus={false} isIndicatorsShadow={false} interval={8000} height='500px' width='384px'>
      <div className="card w-96 bg-base-100">
        <Image  
          src={AddContentImg}
          alt="Add Your Content"
          width="384"
          height="345"
          className='rounded-tr-[12px] rounded-tl-[12px]'/>
        <div className="card-body font-sans">
          <h2 className="card-title">1. Add your content</h2>
          <p className='text-gray-500'>Copy and paste the base content you want to use to generate lesson materials.</p>
        </div>
      </div>
      <div className="card w-96 bg-base-100">
        <Image  
          src={SelectContentImg}
          alt="Select Your Lesson Materials"
          width="384"
          height="345"
          className='rounded-tr-[12px] rounded-tl-[12px]'/>
        <div className="card-body font-sans">
          <h2 className="card-title">2. Choose what to generate</h2>
          <p className='text-gray-500'>Simeltaneously generate over 20 different lesson materials, including flashcards, quizzes, games, puzzles, and more.</p>
        </div>
      </div>
      <div className="card w-96 bg-base-100">
        <Image  
          src={EditContentImg}
          alt="Select Your Lesson Materials"
          width="384"
          height="345"
          className='rounded-tr-[12px] rounded-tl-[12px]'/>
        <div className="card-body font-sans">
          <h2 className="card-title">3. Customize your materials</h2>
          <p className='text-gray-500'>Effortlessly edit and customize your lesson materials for your learners.</p>
        </div>
      </div>
      <div className="card w-96 bg-base-100">
        <Image  
          src={ShareContentImg}
          alt="Select Your Lesson Materials"
          width="384"
          height="345"
          className='rounded-tr-[12px] rounded-tl-[12px]'/>
        <div className="card-body font-sans">
          <h2 className="card-title">4. Share to other platforms</h2>
          <p className='text-gray-500'>Exporting content to other teaching platforms like Quizlet and Kahoot is simple and painless.</p>
        </div>
      </div>
    </Carousel>
  )
}