"use client";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import {motion, useScroll, useTransform, useMotionValue, useSpring} from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";

export const Hero = () => {
    const sectionRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    });

    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth - 0.5) * 50;
            const yPos = (clientY / innerHeight - 0.5) * 50;
            mouseX.set(xPos);
            mouseY.set(yPos);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.section
            ref={sectionRef}
            className="flex h-[600px] md:h-[800px] items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            style={{
                backgroundImage: `url(${starsBg.src})`,
                backgroundPositionY,
            }}
            animate={{
                backgroundPositionX: starsBg.width,
            }}
            transition={{
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {/*background particlees*/}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 w-1 bg-white rounded-full opacity-50"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, -20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>

            <motion.div
                className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-[26%] left-[38%] translate-x-[-40%] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 70px rgba(140,69,255,0.5), 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)',
                        '0 0 140px rgba(140,69,255,0.8), 0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.6)',
                        '0 0 70px rgba(140,69,255,0.5), 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)'
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    x: useTransform(x, value => value * 0.5),
                    y: useTransform(y, value => value * 0.5),
                }}
            />

            <motion.div
                style={{
                    translateY: '-50%',
                    translateX: '-50%',
                    x: useTransform(x, value => value * 1.2),
                    y: useTransform(y, value => value * 1.2),
                }}
                animate={{
                    rotate: '1turn',
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border-white border opacity-20 rounded-full top-1/2 left-1/2"
            >
                {[0, 90, 180, 270].map((angle, index) => (
                    <motion.div
                        key={index}
                        className="absolute h-2 w-2 bg-white rounded-full cursor-pointer"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${angle}deg) translateX(${index % 2 ? '172px' : '290px'})`,
                        }}
                        whileHover={{
                            scale: 2,
                            boxShadow: '0 0 20px rgba(255,255,255,0.8)',
                        }}
                    />
                ))}
            </motion.div>

            <motion.div
                style={{
                    translateY: '-50%',
                    translateX: '-50%',
                    x: useTransform(x, value => value * 1.5),
                    y: useTransform(y, value => value * 1.5),
                }}
                animate={{
                    rotate: '-1turn',
                }}
                transition={{
                    repeat: Infinity,
                    duration: 60,
                    ease: 'linear',
                }}
                className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 border-dashed"
            />

            <motion.div
                style={{
                    translateY: '-50%',
                    translateX: '-50%',
                    x: useTransform(x, value => value * 2),
                    y: useTransform(y, value => value * 2),
                }}
                animate={{
                    rotate: '1turn',
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 border-dashed"
            />

            <div className="container relative mt-28">
                <motion.h1
                    className="text-7xl md:text-[168px] lg:text-[180px] md:leading-none font-semibold text-center tracking-tighter text-transparent bg-clip-text"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, white 0%, rgb(184,148,255) 50%, rgb(74,32,138) 100%)',
                        backgroundSize: '200% 200%',
                    }}
                >
                    Coming <br />Soon
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl lg:text-2xl text-white/70 mt-5 text-center max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    DevSomeware is an open-source community that believes in working and growing together
                </motion.p>
                <motion.div
                    className="flex justify-center mt-5 lg:mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <Link href="/Contact">
                        <Button>( Contact Us )</Button>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
};
