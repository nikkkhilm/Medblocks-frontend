import React from "react";
import { Box, Flex, Text, Button, Spacer, Image } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import logo from "../assets/logo.jpg"; // import your logo

const Navbar = ({ role, onProfileOpen }) => {
  return (
    <Box
      bg="linear-gradient(180deg, #000000, #1a1a40,rgb(14, 22, 95))"
      color="white"
      position="fixed"
      width="100%"
      zIndex="999"
      px={20}
      py={6}
    >
      <Flex alignItems="center">
        {/* Logo */}
        <Flex alignItems="center">
          <Image src={logo} alt="Logo" boxSize="50px" />
          <Text fontSize="3xl" fontWeight="medium" ml={4}>
            BLOCKMEDS
          </Text>
        </Flex>

        <Spacer />

        {/* Links */}
        {/* <Flex gap={36} ml="2vw">
          {["HOME", "PROFILE", "SEARCH"].map((item, index) => (
            <Text
              key={index}
              fontSize="lg"
              fontWeight="light"
              textTransform="capitalize"
            >
              {item}
            </Text>
          ))}
        </Flex> */}

        <Spacer />

        {/* Profile Button (conditionally rendered) */}
        {role && (
          <Button colorScheme="red" onClick={onProfileOpen}>
            View Profile
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
