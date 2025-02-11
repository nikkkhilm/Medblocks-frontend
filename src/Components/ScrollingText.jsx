import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Define keyframes for seamless scrolling
const scrollAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const ScrollingText = ({ position, top, left, right, bottom, width }) => {
  return (
    <Box
      position={position || "relative"}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={width || "100vw"}
      height="50px"
      bg="black"
      color="white"
      display="flex"
      alignItems="center"
      overflow="hidden"
      whiteSpace="nowrap"
    >
      {/* Wrapper for seamless scrolling effect */}
      <Box
        display="flex"
        gap="40px"
        minWidth="200%"
        animation={`${scrollAnimation} 15s linear infinite`}
      >
        {/* Repeat the text multiple times to avoid gaps */}
        {Array(3)
          .fill("BLOCKMEDS - Your trusted platform for medication tracking.")
          .map((text, index) => (
            <Text key={index} fontSize="xl" fontWeight="bold">
              {text}
            </Text>
          ))}
      </Box>
    </Box>
  );
};

export default ScrollingText;
