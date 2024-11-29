import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Slider from 'react-slick';


export default function TopTeacher() {
    const navigate = useNavigate();
    const { teachers } = useContext(AppContext);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024, // Laptop
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              autoplay: true,
            },
          },
          {
            breakpoint: 640, // Mobile
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
            },
          },
        ],
      };

    return (
          <div className='flex flex-col items-center my-16 text-gray-900 '>
            <h1 className='text-3xl font-medium'>Get to Know Our Teachers</h1>
            <div className="w-full pt-5 px-3 sm:px-0">
      <Slider {...settings}>
        {teachers.slice(0, 5).map((item, index) => (
          <div cla
            onClick={() => navigate(`/appointment/${item.id}`)} // Ensure the correct ID is used
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p>Arabic</p>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>

    );
}