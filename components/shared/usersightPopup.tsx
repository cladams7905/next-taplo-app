"use client";

import React from 'react'
import Draggable from "react-draggable";

export default function UsersightPopup() {
  return (
    <Draggable>
        <div className="collapse fixed p-4 z-50 shadow-lg max-w-[380px] border border-gray-300 bg-white h-fit">
            <div className='flex flex-row align-top flex-wrap gap-2'>
                <div className="avatar">
                    <div className="w-12 mask mask-squircle">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <p className='font-sans text-sm text-gray-500 mb-6'>Hi there! 👋 To help me better understand what youre looking for, please answer the following questions:</p>
            </div>
            <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs mb-6" />
            <div className='flex justify-center items-center w-full'>
                <div className="join max-w-10">
                    <button className="join-item btn btn-xs">←</button>
                    <button className="join-item btn btn-xs">→</button>
                </div>
            </div>
            <p className='font-sans text-[10px] text-right text-gray-400'>Powered by TapInsight</p>
        </div>
    </Draggable>
  )
}
