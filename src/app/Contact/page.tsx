"use client";
import starsBg from "@/assets/stars.png";
import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import img1 from '@/assets/terminal.png';
import img2 from '@/assets/arrow-up.png';
import {motion,useScroll,useTransform} from "framer-motion";
import { LogoMotion } from "@/sections/LogoMotion";
const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  type AlertType = 'danger' | 'success';

  const [alert, setAlert] = useState<{ show: boolean; text: string; type: AlertType }>({
    show: false,
    text: '',
    type: 'danger',
  });
  const [loading, setLoading] = useState<boolean>(false);

  interface FormState {
    name: string;
    email: string;
    message: string;
  }

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  // Alert functions
  const showAlert = ({ text, type = 'danger' }: { text: string; type?: AlertType }) =>
    setAlert({ show: true, text, type });
  const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormState;
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          to_name: 'Aniket Subudhi',
          from_email: form.email,
          to_email: 'aniketsubudhi00@gmail.com,khanbasir5555@gmail.com,ankit245202@gmail.com',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert();
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };

  // Alert component
  const Alert = ({ type, text }: { type: AlertType; text: string }) => {
    return (
      <div className="fixed bottom-5 right-5 flex justify-center items-center z-50">
        <div
          className={`p-5 ${
            type === 'danger' ? 'bg-red-800' : 'bg-blue-800'
          } items-center text-indigo-100 leading-none rounded-md flex`}
          role="alert"
        >
          <span
            className={`flex rounded-full ${
              type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
            } uppercase px-2 py-1 text-xs font-semibold mr-3`}
          >
            {type === 'danger' ? 'Failed' : 'Success'}
          </span>
          <span className="mr-2 text-left">{text}</span>
        </div>
      </div>
    );
  };
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
     target: sectionRef,
     offset: ['start end','end start']
   });
   
   const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  return (
    <>

      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <motion.section 
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
      className="my-20 " id="contact">
        <div className="relative min-h-screen flex items-center justify-center">
          <Image
            src={img1}
            alt="terminal-bg"
            height={800}
            width={1000}
            
            className="absolute mb-8 lg:h-[810px] lg:w-[1100px] lg:left-60 inset-0 left-auto object-cover lg:right-72 lg:top-0 right-0 top-8 h-[800px]"
          />

          <div className="relative z-10 max-w-2xl w-full px-4">
            <h3 className="text-4xl font-extrabold text-white">Lets talk</h3>
            <p className="mt-3 text-lg text-gray-300">
            Whether you are interested in contributing to open-source projects, joining our developer community, participating in events, or just saying hello, we’d love to hear from you!
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-12 space-y-6">
              <label className="block">
                <span className="text-white">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., DevSomeware"
                />
              </label>

              <label className="block">
                <span className="text-white">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., devsomeware@gmail.com"
                />
              </label>

              <label className="block">
                <span className="text-white">Your Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Share your thoughts or inquiries..."
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Image
                  src={img2}
                  alt="arrow-up"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </button>
            </form>
          </div>
        </div>
      </motion.section>
      <LogoMotion />
    </>
  );
};

export default Contact;
