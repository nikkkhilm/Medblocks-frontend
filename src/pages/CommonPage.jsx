import React, { useState } from "react";
import { Box, Container, Text, Button, VStack, Image, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import Slider from "react-slick";
import DoctorLogin from "./DoctorLogin";
import DoctorSignup from "./DoctorSignup";
import PatientLogin from "./PatientLogin";
import PatientSignup from "./PatientSignup";
import PharmacistLogin from "./PharmacistLogin";
import PharmacistSignup from "./PharmacistSignup";
import doctorImage from "../assets/docimg.png";
import patientImage from "../assets/patient-icon-1.png";
import pharmacistImage from "../assets/pharmacist-icon-4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CommonPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const renderLoginSignup = () => {
    switch (selectedRole) {
      case "Doctor":
        return (
          <Tabs variant="soft-rounded" textColor={"black"}>
            <TabList mb="1em">
              <Tab width="50%" fontSize="xl">
                LOGIN
              </Tab>
              <Tab width="50%" fontSize="xl">
                SIGNUP
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DoctorLogin />
              </TabPanel>
              <TabPanel>
                <DoctorSignup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        );
      case "Patient":
        return (
          <Tabs variant="soft-rounded" textColor={"black"}>
            <TabList mb="1em">
              <Tab width="50%" fontSize="xl">
                LOGIN
              </Tab>
              <Tab width="50%" fontSize="xl">
                SIGNUP
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PatientLogin />
              </TabPanel>
              <TabPanel>
                <PatientSignup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        );
      case "Pharmacist":
        return (
          <Tabs variant="soft-rounded" textColor={"black"}>
            <TabList mb="1em">
              <Tab width="50%" fontSize="xl">
                LOGIN
              </Tab>
              <Tab width="50%" fontSize="xl">
                SIGNUP
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PharmacistLogin />
              </TabPanel>
              <TabPanel>
                <PharmacistSignup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        );
      default:
        return null;
    }
  };


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    draggable: true,
    swipe: true,
  };

  return (
    <Container maxW="100%" backgroundColor={"red"} centerContent>
      <Box
        display="flex"
        justifyContent="center"
        bg="white"
        w="100%"
        p={2}
        m="40px 0 15px 0"
        textAlign="center"
        backgroundColor="black"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="white" mb={-4}>
          Welcome to the Portal
        </Text>
      </Box>

      {!selectedRole ? (
        <Box w="100%" minH={"400px"} p={8} borderRadius="lg" textAlign="center">
          <Text fontSize="2xl" fontWeight={"bolder"} mb={6} color="red">
            Select Your Role
          </Text>
          <Slider
            {...settings}
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "400px",
              margin: "auto",
            }}
          >
            <Box
              bg="white"
              p={8}
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
              width="100%"
              height="500px" // Increase height
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignContent={"center"}
            >
              <Image src={doctorImage} alt="Doctor" boxSize="250px" mx="auto" />
              <Text fontSize="xlg" fontWeight={"bolder"} mt={2} color={"Green"}>
                DOCTOR
              </Text>
              <Button
                colorScheme="green"
                onClick={() => handleRoleSelect("Doctor")}
                mt={4}
              >
                Continue as Doctor
              </Button>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
              width="100%"
              height="500px" // Increase height
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignContent={"center"}
            >
              <Image
                src={patientImage}
                alt="Patient"
                boxSize="250px"
                mx="auto"
              />
              <Text fontSize="Xlg" fontWeight={"bolder"} mt={2} color={"Red"}>
                PATIENT
              </Text>
              <Button
                colorScheme="red"
                onClick={() => handleRoleSelect("Patient")}
                mt={4}
              >
                Continue as Patient
              </Button>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
              width="100%"
              height="500px" // Increase height
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignContent={"center"}
            >
              <Image
                src={pharmacistImage}
                alt="Pharmacist"
                boxSize="250px"
                mx="auto"
              />
              <Text
                fontSize="xlg"
                fontWeight={"bolder"}
                mt={2}
                color={"yellow.600"}
              >
                PHARMACIST
              </Text>
              <Button
                colorScheme="yellow"
                textColor={"white"}
                onClick={() => handleRoleSelect("Pharmacist")}
                mt={4}
              >
                Continue as Pharmacist
              </Button>
            </Box>
          </Slider>
        </Box>
      ) : (
        <Box
          w="100%"
          p={8}
          borderRadius="lg"
          bg="white"
          maxW="800px"
          // maxH="60%"
          // width="100%"
          height="700px"
          overflowY="auto"
          // margin="auto"
          mt={20}
          d="flex"
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize="4xl" mb={20} textAlign="center" color={"blue.900"}>
            {`Welcome ${selectedRole}`}
          </Text>
          {renderLoginSignup()}
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              mt={4}
              colorScheme="red"
              onClick={() => setSelectedRole(null)}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CommonPage;
