import React from "react";
import Header from "./components/ui/Header";

const Home = () => {
  return (
    <div className=''>
        <Header />
        <main className='bg-[#18191A] w-full text-white py-[110px] flex flex-col items-center'>
            <div className='w-full mb-5'>
                Carousel
            </div>
        </main>
    </div>
  );
};

export default Home;
