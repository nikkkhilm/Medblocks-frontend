import React from "react";
import { Box, Flex, Text, Button, Spacer, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png"; // import your logo
import ScrollingText from "./ScrollingText";

const Navbar = () => {
  return (
      <Box
        bg="#4267B2"
        color="white"
        position="fixed"
        width="100%"
        zIndex="999"
        px={20}
        py={6}
      >
        <Flex alignItems="center" ml={126}>
          {/* Logo */}
          <Flex alignItems="center">
            <Image src={logo} alt="Logo" boxSize="60px" borderRadius={50} />
            <Text fontSize="3xl" fontWeight="medium" ml={4}>
              BLOCKMEDS
            </Text>
          </Flex>

          <Spacer />

          {/* Links */}
          <Flex gap={36} mr={-800}>
            {["HOME", "ABOUT US"].map((item, index) => (
              <button
                key={index}
                fontSize="lg"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {item}
              </button>
            ))}
          </Flex>

          <Spacer />
        </Flex>
      </Box>
    
  );
};

export default Navbar;
