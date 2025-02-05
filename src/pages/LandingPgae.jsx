import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import drimage from "../assets/drimage.jpg";
import CommonPage from "./CommonPage";
import Navbar from "../Components/Navbar";
import ScrollingText from "../Components/ScrollingText";

const LandingPgae = () => {
  return (
    <>
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Landing page content */}
      <Box
        bg="black"
        color="white"
        py="14"
        pt="15vh"
        w="100vw" // Ensures full width
        minH="100vh" // Ensures full screen height
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
        position="relative"
      >
        {/* Container for image and text */}
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          {/* Left Section - Image */}
          <Box w="100vw" minH="100vh" bg="yellow" display="flex" justifyContent="center" alignContent="center" alignItems={"center"}>
            <Image src={drimage} alt="DOCTOR" minH="500px" mb={52} borderRadius={"3xl"}/>
          </Box>

          {/* Right Section - CommonPage */}
          <Box w="100vw" minH="100vh" display="flex" justifyContent="center" bg={"blue"}>
            <CommonPage />
          </Box>
        </Flex>
      </Box>
    </>
  );
};


export default LandingPgae;
