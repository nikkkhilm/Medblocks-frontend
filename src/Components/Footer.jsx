import React from "react";
import { Box, Text, Flex, List, ListItem, Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="#4267B2" p={10} textAlign="center" color="white" mt={4}>
      <Text fontWeight="semibold" mb={4}>
        @ all rights reserved
      </Text>
      <Divider borderColor="white" borderWidth="4px" mb={4} />

      <Flex justify="space-evenly" mt={4} flexWrap="wrap">
        {/* Patient Info */}
        <Box textAlign="center">
          <Text
            textDecoration="underline"
            textDecorationThickness="2px"
            fontWeight="semibold"
            mb={2}
          >
            Patient Info
          </Text>
          <List spacing={2} color="yellow.200">
            <ListItem>Specialities</ListItem>
            <ListItem>Notice of Privacy</ListItem>
            <ListItem>Terms & condition</ListItem>
          </List>
        </Box>

        {/* General Info */}
        <Box textAlign="center">
          <Text
            textDecoration="underline"
            textDecorationThickness="2px"
            fontWeight="semibold"
            mb={2}
          >
            General Info
          </Text>
          <List spacing={2} color="yellow.200">
            <ListItem>About Us</ListItem>
            <ListItem>Careers</ListItem>
          </List>
        </Box>

        {/* Regulations */}
        <Box textAlign="center">
          <Text
            textDecoration="underline"
            textDecorationThickness="2px"
            fontWeight="semibold"
            mb={2}
          >
            Regulations
          </Text>
          <List spacing={2} color="yellow.200">
            <ListItem>Report Drug Abuse</ListItem>
            <ListItem>Privacy policy</ListItem>
          </List>
        </Box>

        {/* Partner Sites */}
        <Box textAlign="center">
          <Text
            textDecoration="underline"
            textDecorationThickness="2px"
            fontWeight="semibold"
            mb={2}
          >
            Partner Sites
          </Text>
          <List spacing={2} color="yellow.200">
            <ListItem>Ethereum</ListItem>
            <ListItem>Bitcoin</ListItem>
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
