import React from "react";
import { FaHome, FaCamera } from "react-icons/fa";


const Navbar: React.FC = () => {
    return (
        <nav className="absolute z-50">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-16">
                <div className="items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="md:block">
                            <div className="ml-2 flex flex-col items-baseline space-x-4 space-y-6">
                                <div className=""><a href="/"><FaHome className="text-black border bg-gray-400 p-1 rounded-full text-5xl" /></a></div>
                                <div className=""><a href="/camera"><FaCamera className="text-black border bg-gray-400 p-1 rounded-full text-5xl" /></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        {/* Add your additional buttons or components here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
