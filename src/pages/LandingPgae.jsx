// grey gradient
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

  useEffect(() => {
    gsap.to(textRef.current, {
      y: -50,
      opacity: 0.2, // Smooth fade-out
      background: "linear-gradient(180deg, #000000, #1a1a40, #3a0ca3)", // Black to Deep Blue to Purple
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
      },
    });

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

    // Restart typing effect when scrolling back up
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 80%",
      end: "top 40%",
      onEnter: () => setShowTyping(true),
      onEnterBack: () => {
        setShowTyping(false);
        setTimeout(() => setShowTyping(true), 500);
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    const offset = 200;
    const elementPosition =
      loginRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* Typing Effect Section */}
      <Box
        ref={textRef}
        w="100vw"
        h="110vh"
        bgGradient="linear(to-b, black, #1a1a40, #3a0ca3)" // Black to Deep Blue to Purple Gradient
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        position="relative"
      >
        {/* "BLOCKMEDS" Typing Effect */}
        <Box
          fontSize="8vw"
          fontWeight="bold"
          whiteSpace="nowrap"
          textShadow="0 0 20px rgba(255, 255, 255, 0.8)" // Glowing text effect
        >
          <Typewriter
            text="BLOCKMEDS"
            speed={100}
            typingDelay={200}
            cursor="|"
            loop={false}
          />
        </Box>

        {/* "ONE STOP SOLUTION TO DOCTOR SHOPPING" */}
        <Box
          fontSize="3vw"
          fontWeight="bold"
          mt={2}
          textShadow="0 0 10px rgba(255, 255, 255, 0.6)" // Subtle glow
        >
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

        {/* Get Started Button */}
        <Button
          mt={8}
          size="lg"
          bgGradient="linear(to-r, #0070f3, #3a0ca3)" // Classy gradient button
          color="white"
          boxShadow="0px 10px 30px rgba(0, 112, 243, 0.4)" // Soft glow
          _hover={{
            transform: "scale(1.05)",
            transition: "0.3s ease-in-out",
            bgGradient: "linear(to-r, #0052cc, #1a1a40)", // Darker hover effect
          }}
          onClick={handleScroll}
        >
          Get Started
        </Button>
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


// purple
// import React, { useEffect, useRef, useState } from "react";
// import { Box, Button } from "@chakra-ui/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Typewriter from "react-typewriter-effect";
// import CommonPage from "./CommonPage";
// import Navbar from "../Components/Navbar";

// gsap.registerPlugin(ScrollTrigger);

// const LandingPage = () => {
//   const textRef = useRef(null);
//   const loginRef = useRef(null);
//   const [showTyping, setShowTyping] = useState(true);
//   const [fade, setFade] = useState(1); // Controls fade effect

//   useEffect(() => {
//     gsap.to(textRef.current, {
//       y: -50, // Moves up slightly
//       opacity: 0.5, // Fades slightly instead of full vanish
//       duration: 1.5,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: textRef.current,
//         start: "top 70%", // Fades at 70% viewport
//         end: "top 20%",
//         scrub: 1,
//         onUpdate: (self) => setFade(1 - self.progress * 0.5), // Smooth fade instead of full vanish
//       },
//     });

//     gsap.fromTo(
//       loginRef.current,
//       { y: 200, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: loginRef.current,
//           start: "top 90%",
//           end: "top 50%",
//           scrub: 1,
//         },
//       }
//     );

//     // Restart typing effect when scrolling back up
//     ScrollTrigger.create({
//       trigger: textRef.current,
//       start: "top 90%",
//       end: "top 50%",
//       onEnter: () => setShowTyping(true),
//       onLeaveBack: () => {
//         setShowTyping(false);
//         setTimeout(() => setShowTyping(true), 500);
//       },
//     });

//     return () => ScrollTrigger.killAll();
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleScroll = () => {
//     const offset = 200;
//     const elementPosition =
//       loginRef.current.getBoundingClientRect().top + window.scrollY;
//     window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Typing Effect Section */}
//       <Box
//         ref={textRef}
//         w="100vw"
//         h="110vh"
//         bgGradient="linear(to-b, #000000, #1a1a40, #3a0ca3)"
//         color="white"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         position="relative"
//         opacity={fade} // Soft fade effect
//       >
//         {/* "BLOCKMEDS" Typing Effect */}
//         <Box
//           fontSize="8vw"
//           fontWeight="bold"
//           whiteSpace="nowrap"
//           textShadow="0 0 30px rgba(255, 255, 255, 0.8)"
//           opacity={fade} // Prevents disappearing completely
//         >
//           {showTyping && (
//             <Typewriter
//               key={showTyping}
//               text="BLOCKMEDS"
//               speed={100}
//               typingDelay={200}
//               cursor="|"
//               loop={false}
//             />
//           )}
//         </Box>

//         {/* "ONE STOP SOLUTION TO DOCTOR SHOPPING" */}
//         <Box
//           fontSize="3vw"
//           fontWeight="bold"
//           mt={2}
//           textShadow="0 0 15px rgba(255, 255, 255, 0.7)"
//           opacity={fade} // Soft fade
//         >
//           {showTyping && (
//             <Typewriter
//               key={showTyping}
//               text="ONE STOP SOLUTION TO DOCTOR SHOPPING"
//               speed={80}
//               typingDelay={500}
//               cursor="|"
//               loop={false}
//             />
//           )}
//         </Box>

//         {/* Get Started Button */}
//         <Button
//           mt={8}
//           size="lg"
//           bgGradient="linear(to-r, #0070f3, #3a0ca3)"
//           color="white"
//           boxShadow="0px 10px 40px rgba(0, 112, 243, 0.5)"
//           _hover={{
//             transform: "scale(1.05)",
//             transition: "0.3s ease-in-out",
//             bgGradient: "linear(to-r, #0052cc, #1a1a40)",
//           }}
//           onClick={handleScroll}
//         >
//           Get Started
//         </Button>
//       </Box>

//       {/* Login/Signup Section */}
//       <Box
//         ref={loginRef}
//         w="100vw"
//         minH="80vh"
//         bg="black"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <CommonPage />
//       </Box>
//     </>
//   );
// };

// export default LandingPage;
