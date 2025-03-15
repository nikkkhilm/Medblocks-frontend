import React from "react";
import { Box, Text, Flex, Divider, Spacer } from "@chakra-ui/react";

const About = () => {
  return (
    <div>
      {/* Our Mission Section */}
      <Box bg="gray.300" textAlign="center" py={5}>
        <Box
          bg="white"
          color="black"
          p={10}
          my={8}
          boxShadow="2xl"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
          gap={8}
          maxW="lg"
          mx="auto"
        >
          <Text
            fontSize="4xl"
            fontWeight="extrabold"
            textDecoration="underline"
            textDecorationThickness="2px"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          >
            OUR MISSION
          </Text>

          <Text
            color="red.500"
            fontSize="xl"
            fontWeight="semibold"
            textTransform="capitalize"
          >
            A trusted community collaborating to improve the health and
            well-being of those we serve
          </Text>
          <Divider borderColor="gray.300" />
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quos
            reprehenderit voluptate temporibus accusamus tenetur culpa magnam
            porro assumenda quas a nulla eveniet dolor neque exercitationem nam,
            error dignissimos illo eos. Quam aliquam, doloribus cumque
            architecto recusandae quibusdam perferendis, dolores porro
            blanditiis temporibus omnis reiciendis corrupti veritatis quae.
          </Text>
        </Box>
      </Box>

      {/* Testimonials Section
      <Box textAlign="center" mx={20}>
        <Text
          fontSize="3xl"
          fontWeight="extrabold"
          mb={10}
          textDecoration="underline"
          textDecorationThickness="2px"
        >
          Testimonials
        </Text> */}
        {/* <Flex justify="center" gap={8} wrap="wrap"> */}
          {/* Testimonial Card 1 */}
          {/* <Box
            bg="#898F9C17"
            p={8}
            maxW="300px"
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="extrabold">User hx097</Text>
            <Text mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              inventore nemo nulla enim similique dicta earum voluptate quia
              laborum soluta nihil dolorum est perferendis ipsam reiciendis
              possimus, maiores officiis minima asperiores harum repellat facere
              libero unde totam. Quasi, a beatae.
            </Text>
          </Box> */}

          {/* Testimonial Card 2 */}
          {/* <Box
            bg="#898F9C17"
            p={8}
            maxW="300px"
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="extrabold">User hx097</Text>
            <Text mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              inventore nemo nulla enim similique dicta earum voluptate quia
              laborum soluta nihil dolorum est perferendis ipsam reiciendis
              possimus, maiores officiis minima asperiores harum repellat facere
              libero unde totam. Quasi, a beatae.
            </Text>
          </Box> */}

          {/* Testimonial Card 3 */}
          {/* <Box
            bg="#898F9C17"
            p={8}
            maxW="300px"
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="extrabold">User hx097</Text>
            <Text mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              inventore nemo nulla enim similique dicta earum voluptate quia
              laborum soluta nihil dolorum est perferendis ipsam reiciendis
              possimus, maiores officiis minima asperiores harum repellat facere
              libero unde totam. Quasi, a beatae.
            </Text>
          </Box> */}
        {/* </Flex> */}
      {/* </Box> */}
      
    </div>
  );
};

export default About;
