import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import Navbars from "./Navbars";

const PatientHome = () => {
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
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Safely retrieving token from localStorage
  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/patient/profile`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        // Set patient details and prescriptions
        setPatientDetails(data);

        // Flatten and sort prescriptions by date (most recent first)
        const flattenedPrescriptions = data.prescriptionHistory
          .map((item) => item.savedPrescription)
          .sort((a, b) => new Date(b.time) - new Date(a.time));
        setPrescriptions(flattenedPrescriptions);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription);
    onPrescriptionOpen();
  };

  return (
    <>
      <Navbars role="pharmacist" onProfileOpen={onProfileOpen} />
      <Box p={6}>
        <Box mt={40}>
          {/* UNDO IT WHEN DONE************************** */}
          {/* <Text>
          <strong>Name:</strong>{" "}
          {`${patientDetails.firstName} ${patientDetails.lastName}`}
        </Text> */}
          {/* Profile Button at the top right */}
          {/* <Flex justify="flex-end" mb={4}>
            <Button colorScheme="blue" onClick={onProfileOpen}>
              View Profile
            </Button>
          </Flex> */}

          <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign={"center"}>Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {patientDetails ? (
                  <>
                    <Text>
                      <strong>Name:</strong>{" "}
                      {`${patientDetails.firstName} ${patientDetails.lastName}`}
                    </Text>
                    <Text>
                      <strong>UniqueId:</strong> {patientDetails.uniqueId}
                    </Text>
                    <Text>
                      <strong>Email:</strong> {patientDetails.email}
                    </Text>
                    <Text>
                      <strong>Contact Number:</strong>{" "}
                      {patientDetails.contactNumber}
                    </Text>
                    <Text>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(
                        patientDetails.dateOfBirth
                      ).toLocaleDateString()}
                    </Text>
                  </>
                ) : (
                  <Text>Loading patient details...</Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onProfileClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Divider />

          <Box mt={4}>
            <Heading
              size="md"
              mb={24}
              textAlign={"center"}
              fontSize={"4xl"}
              textColor={"red"}
              textDecor={"underline"}
            >
              YOUR PRESCRIPTION HISTORY
            </Heading>
            {loading ? (
              <Center>
                <Spinner size="lg" />
              </Center>
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
                      bg={prescription.fulfilled ? "green.50" : "red.50"} // Conditional background color
                      cursor="pointer"
                      _hover={{
                        bg: prescription.fulfilled ? "green.100" : "red.100",
                      }}
                      onClick={() => handlePrescriptionClick(prescription)}
                    >
                      <HStack justify="space-between">
                        <Text>
                          <strong>Doctor:</strong> {prescription.doctor}
                        </Text>
                        <Text>
                          <strong>Date:</strong>{" "}
                          {new Date(prescription.time).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </Box>
                  ))
                ) : (
                  <Text textAlign={"center"}>No prescriptions available.</Text>
                )}
              </VStack>
            )}
          </Box>

          {selectedPrescription && (
            <Modal isOpen={isPrescriptionOpen} onClose={onPrescriptionClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Prescription Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    <strong>Doctor:</strong> {selectedPrescription.doctor}
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
        </Box>
      </Box>
    </>
  );
};

export default PatientHome;
