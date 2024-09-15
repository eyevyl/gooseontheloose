"use client";

import React from "react";
import { FaHome, FaCamera } from "react-icons/fa";
import { GiGoose } from "react-icons/gi";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <nav className="absolute z-50 bottom-0 w-[430px] flex items-center justify-between p-8">
            <motion.a
                href="/"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className="duration-300 ease-in-out rounded-full p-3 shadow-lg border border-black"
                style={{
                    backgroundImage: 'url("/assets/iconbkg.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >
                    <FaHome className="text-black text-3xl" />
                </div>
            </motion.a>
            <motion.a
                href="/camera"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className="duration-300 ease-in-out rounded-full p-3 shadow-lg border border-black"
                    style={{
                        backgroundImage: 'url("/assets/iconbkg.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <FaCamera className="text-black text-3xl" />
                </div>
            </motion.a>
            <motion.a
                href="/collection"
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 1 }}
                className="cursor-pointer"
            >
                <div className="duration-300 ease-in-out rounded-full p-3 shadow-lg border border-black"
                style={{
                    backgroundImage: 'url("/assets/iconbkg.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >
                    <GiGoose className="text-black text-3xl" />
                </div>
            </motion.a>
        </nav>
    );
};

export default Navbar;
