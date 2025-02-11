import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "react-typewriter-effect";
import CommonPage from "./CommonPage";
import Navbar from "../Components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const textRef = useRef(null);
  const loginRef = useRef(null);
  const [showTyping, setShowTyping] = useState(true);
  // const [showButton, setShowButton] = useState(false);
  // const buttonRef = useRef(null);

  useEffect(() => {
    // Moves "BLOCKMEDS" slightly up on scroll
    gsap.to(textRef.current, {
      y: -50,
      opacity: 0.6,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 50%",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Moves login/signup up smoothly
    gsap.fromTo(
      loginRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: loginRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    // Triggers retyping when scrolling up
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 70%",
      end: "top 30%",
      onLeaveBack: () => {
        setShowTyping(false);
        setTimeout(() => setShowTyping(true), 100);
      },
    });
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page starts at the top when loaded
  }, []);


  // Scrolls to login/signup section
  const handleScroll = () => {
    loginRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* Typing Effect Section */}
      <Box
        ref={textRef}
        w="100vw"
        h="100vh"
        bg="black"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        position="relative"
      >
        {/* "BLOCKMEDS" Typing Effect */}
        <Box fontSize="8vw" fontWeight="bold" whiteSpace="nowrap">
          <Typewriter
            text="BLOCKMEDS"
            speed={100}
            typingDelay={200}
            cursor="|"
            loop={false}
            onTypingEnd={() => setTimeout(() => setShowButton(true), 500)}
          />
        </Box>

        {/* "ONE STOP SOLUTION TO DOCTOR SHOPPING" */}
        <Box fontSize="3vw" fontWeight="bold" mt={2}>
          {showTyping && (
            <Typewriter
              text="ONE STOP SOLUTION TO DOCTOR SHOPPING"
              speed={80}
              typingDelay={500}
              cursor="|"
              loop={false}
            />
          )}
        </Box>

        {/* Get Started Button
        {showButton && (
          <Button
            ref={buttonRef}
            mt={6}
            px={6}
            py={3}
            fontSize="xl"
            bg="white"
            color="black"
            _hover={{ bg: "#898F9C", color: "white" }}
            onClick={handleScroll}
          >
            Get Started
          </Button>
        )} */}
      </Box>

      {/* Login/Signup Section */}
      <Box
        ref={loginRef}
        w="100vw"
        minH="80vh"
        bg="black"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CommonPage />
      </Box>
    </>
  );
};

export default LandingPage;
