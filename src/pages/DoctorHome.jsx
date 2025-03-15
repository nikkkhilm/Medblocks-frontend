import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Divider,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import CreatePrescriptionPage from "./CreatePrescriptionPage";
import Search from "../Components/Search";
import Navbars from "./Navbars";
import { useNavigate } from "react-router-dom";


const DoctorHome = () => {
  const navigate = useNavigate(); 
  const toast = useToast();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isPrescriptionOpen,
    onOpen: onPrescriptionOpen,
    onClose: onPrescriptionClose,
  } = useDisclosure();

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loadingDoctorInfo, setLoadingDoctorInfo] = useState(false);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);

  // Fetch Doctor Info
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      setLoadingDoctorInfo(true);
      try {
        const token = JSON.parse(localStorage.getItem("doctorInfo"));
        if (!token) throw new Error("No token found");

        const { data } = await axios.get(
          `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/doctor/profile`,
          { headers: { Authorization: `Bearer ${token.token}` } }
        );

        setDoctorInfo(data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      } finally {
        setLoadingDoctorInfo(false);
      }
    };

    fetchDoctorInfo();
  }, []);

  // Fetch Doctor Prescription History
  const fetchPrescriptions = async () => {
    setLoadingPrescriptions(true);
    try {
      const token = JSON.parse(localStorage.getItem("doctorInfo"));
      if (!token) throw new Error("No token found");

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_GATEWAY_SERVICE_URL
        }/doctor/prescriptionHistory`,
        { headers: { Authorization: `Bearer ${token.token}` } }
      );

      // Sort prescriptions by most recent (desc)
      data.sort((a, b) => new Date(b.time) - new Date(a.time));

      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoadingPrescriptions(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription);
    onPrescriptionOpen();
  };

   const handleLogout = () => {
     localStorage.removeItem("doctorInfo"); // Remove stored user info
     navigate("/"); // Redirect to landing page
   };

  return (
    <>
      <Navbars role="doctor" onProfileOpen={onProfileOpen} />
      <Box p={6}>
        <Box mt={40}>
          <Text
            align="center"
            fontSize="4xl"
            fontWeight="bolder"
            mb={6}
            textColor={"red"}
            textDecoration={"underline"}
          >
            DOCTOR'S DASHBOARD
          </Text>

          {/* Profile Button */}
          {/* <Box textAlign={"right"}>
            <Button colorScheme="teal" onClick={onProfileOpen} mb={4}>
              View Profile
            </Button>
          </Box> */}

          {/* Profile Modal */}
          <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign={"center"}>Doctor's Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {loadingDoctorInfo ? (
                  <Spinner size="lg" />
                ) : doctorInfo ? (
                  <Box>
                    <Text>
                      <strong>Name:</strong>{" "}
                      {`${doctorInfo.firstName} ${doctorInfo.lastName}`}
                    </Text>
                    <Text>
                      <strong>Email:</strong> {doctorInfo.email}
                    </Text>
                    <Text>
                      <strong>Contact Number:</strong>{" "}
                      {doctorInfo.contactNumber}
                    </Text>
                    <Text>
                      <strong>Specialty:</strong> {doctorInfo.specialization}
                    </Text>
                    <Text>
                      <strong>Medical License Id:</strong>{" "}
                      {doctorInfo.medicalLicenseId}
                    </Text>
                  </Box>
                ) : (
                  <Text>No profile information available.</Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onProfileClose}>
                  Close
                </Button>
                <Button colorScheme="red" ml={3} onClick={handleLogout}>
                  Logout
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Divider my={6} />
          {/* search patient by phone number */}
          <Search />

          <Box mt={4}>
            {/* Create Prescription Component */}
            <CreatePrescriptionPage
              onPrescriptionCreated={fetchPrescriptions}
            />

            {/* prescription history */}
            <Box textAlign={"center"}>
              {/* ***********************************put maxwidth for above to make it in center */}
              <Text
                fontSize="4xl"
                textColor={"red"}
                textAlign={"center"}
                fontWeight="bold"
                mb={4}
              >
                Prescription History
              </Text>
              {loadingPrescriptions ? (
                <Spinner size="lg" />
              ) : (
                <VStack spacing={4} align="stretch">
                  {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => (
                      <Box
                        key={prescription.prescriptionId}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        bg={prescription.fulfilled ? "green.50" : "red.50"} // Conditional color based on fulfillment
                        cursor="pointer"
                        _hover={{
                          bg: prescription.fulfilled ? "green.100" : "red.100",
                        }}
                        onClick={() => handlePrescriptionClick(prescription)}
                      >
                        <HStack justify="space-between">
                          <Text>
                            <strong>Patient Id:</strong>{" "}
                            {prescription.patientId}
                          </Text>
                          <Text>
                            <strong>Date:</strong>{" "}
                            {new Date(prescription.time).toLocaleDateString()}
                          </Text>
                        </HStack>
                      </Box>
                    ))
                  ) : (
                    <Text
                      textColor={"yellow.500"}
                      fontSize={"xl"}
                      fontWeight={"bolder"}
                    >
                      No prescriptions available.
                    </Text>
                  )}
                </VStack>
              )}
            </Box>
          </Box>
          {/* Prescription Details Modal */}
          {selectedPrescription && (
            <Modal isOpen={isPrescriptionOpen} onClose={onPrescriptionClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Prescription Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    <strong>Patient Id:</strong>{" "}
                    {selectedPrescription.patientId}
                  </Text>
                  <Text>
                    <strong>Prescription Id:</strong>{" "}
                    {selectedPrescription.prescriptionId}
                  </Text>
                  <Text>
                    <strong>Drug:</strong> {selectedPrescription.drug}
                  </Text>
                  <Text>
                    <strong>Dosage:</strong> {selectedPrescription.dosage} mg
                  </Text>
                  <Text>
                    <strong>Quantity:</strong> {selectedPrescription.quantity}
                  </Text>
                  <Text>
                    <strong>Directions:</strong>{" "}
                    {selectedPrescription.directions}
                  </Text>
                  <Text>
                    <strong>Fulfilled:</strong>{" "}
                    {selectedPrescription.fulfilled ? "YES" : "NO"}
                  </Text>
                  <Text>
                    <strong>Emergency:</strong>{" "}
                    {selectedPrescription.emergency ? "YES" : "NO"}
                  </Text>
                  <Text>
                    <strong>Justification:</strong>{" "}
                    {selectedPrescription.justification}
                  </Text>
                  <Text>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedPrescription.time).toLocaleDateString()}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={onPrescriptionClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {/* </Box> */}
          <Divider my={6} />
        </Box>
      </Box>
    </>
  );
};

export default DoctorHome;
