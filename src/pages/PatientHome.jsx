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
import { useNavigate } from "react-router-dom";

const PatientHome = () => {
  const navigate=useNavigate();
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

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("userInfo"));
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
        console.log(data);
        
        setPatientDetails(data);
        setPrescriptions(data.prescriptionHistory);
        console.log(patientDetails);  
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove stored user info
    navigate("/"); // Redirect to landing page
  };

  return (
    <>
      <Navbars role="pharmacist" onProfileOpen={onProfileOpen} />
      <Box p={6}>
        <Box mt={40}>
          <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign={"center"}>Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {patientDetails ? (
                  <>
                    <Text fontSize="lg">
                      <strong>Name:</strong> {patientDetails.firstName}{" "}
                      {patientDetails.lastName}
                    </Text>
                    <Text fontSize="lg">
                      <strong>UniqueId:</strong> {patientDetails.uniqueId}
                    </Text>
                    <Text fontSize="lg">
                      <strong>Email:</strong> {patientDetails.email}
                    </Text>
                    <Text fontSize="lg">
                      <strong>Contact Number:</strong>{" "}
                      {patientDetails.contactNumber}
                    </Text>
                    <Text fontSize="lg">
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
                <Button colorScheme="red" ml={3} onClick={handleLogout}>
                                  Logout
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
                      bg={prescription.fulfilled ? "green.50" : "red.50"}
                      cursor="pointer"
                      _hover={{
                        bg: prescription.fulfilled ? "green.100" : "red.100",
                      }}
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        onPrescriptionOpen();
                      }}
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
                    <strong>Fulfilled:</strong> {selectedPrescription.fulfilled ? "Yes" : "No"}
                  </Text>
                  <Text>
                    <strong>Emergency:</strong> {selectedPrescription.emergency ? "Yes" : "No"}
                  </Text>
                  <Text>
                    <strong>Justification:</strong> {selectedPrescription.justification}
                  </Text>
                  <Text>
                    <strong>Flagged:</strong> {selectedPrescription.flagged ? "Yes" : "No"}
                  </Text>
                  <Text>
                    <strong>Time:</strong> {new Date(selectedPrescription.time).toLocaleString()}
                  </Text>
                  <Text>
                    <strong>Diagnosis:</strong> {selectedPrescription.diagnosis.name}
                  </Text>
                  <Text>
                    <strong>Symptoms:</strong> {selectedPrescription.diagnosis.symptoms.join(", ")}
                  </Text>
                  <Text>
                    <strong>Category:</strong> {selectedPrescription.diagnosis.category}
                  </Text>
                  <Text>
                    <strong>Severity:</strong> {selectedPrescription.diagnosis.severity}
                  </Text>
                  <Text>
                    <strong>Diagnosis Id:</strong> {selectedPrescription.diagnosis.diagnosisId}
                  </Text>
                  <Text>
                    <strong>Created At:</strong> {new Date(selectedPrescription.diagnosis.createdAt).toLocaleString()}
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
