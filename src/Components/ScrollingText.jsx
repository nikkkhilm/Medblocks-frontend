import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const ScrollingText = ({ position, top, left, right, bottom, width }) => {
  // Define keyframes for scrolling
  const scrollAnimation = keyframes`
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  `;

  return (
    <Box
      position={position || "relative"} // Default to relative if no position passed
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={width || "100vw"} // Full width by default
      height="75px"
      bg="black"
      color="white"
      p="10px 0"
      overflow="hidden"
    >
      {/* Box that holds the text */}
      <Box
        display="flex"
        width="100%" // Make the width dynamic based on content
        animation={`${scrollAnimation} 15s linear infinite`} // Apply animation for continuous scroll
      >
        {/* The content that will scroll */}
        <Box display="flex">
          {/* Repeat the text for seamless scrolling */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            whiteSpace="nowrap"
            flexShrink={0} // Prevent shrinking
          >
            BLOCKMEDS - Your trusted platform for medication tracking.
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            whiteSpace="nowrap"
            flexShrink={0} // Prevent shrinking
          >
            BLOCKMEDS - Your trusted platform for medication tracking.
          </Text>
        </Box>

        {/* Duplicate the text again for seamless scrolling */}
        <Box display="flex">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            whiteSpace="nowrap"
            flexShrink={0} // Prevent shrinking
          >
            BLOCKMEDS - Your trusted platform for medication tracking.
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            whiteSpace="nowrap"
            flexShrink={0} // Prevent shrinking
          >
            BLOCKMEDS - Your trusted platform for medication tracking.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollingText;
