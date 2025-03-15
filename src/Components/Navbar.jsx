import React from "react";
import { Box, Flex, Text, Image, Spacer } from "@chakra-ui/react";
import logo from "../assets/logo.jpg"; // Import your logo

const Navbar = () => {
  return (
    <Box
      bg="linear-gradient(180deg, #000000, #1a1a40,rgb(14, 22, 95))"
      color="white"
      position="fixed"
      top="0"
      width="100%"
      zIndex="999"
      px={16}
      py={5}
      boxShadow="md"
    >
      <Flex alignItems="center">
        {/* Logo Section */}
        <Flex alignItems="center">
          <Image src={logo} alt="Logo" boxSize="80px" borderRadius="full" />
          <Text fontSize="2xl" fontWeight="bold" ml={3}>
            BLOCKMEDS
          </Text>
        </Flex>

        <Spacer />

        {/* Navigation Links */}
        {/* <Flex gap={12}>
          {["HOME", "ABOUT US"].map((item, index) => (
            <Text key={index} fontSize="lg" fontWeight="bold" cursor="pointer">
              {item}
            </Text>
          ))}
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
