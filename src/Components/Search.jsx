import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";

const Search = () => {
  const [contactNumber, setContactNumber] = useState(""); // Holds the input contact number
  const [patientData, setPatientData] = useState(null); // Holds fetched patient data
  const [loading, setLoading] = useState(false); // For loading state
  const [selectedPrescription, setSelectedPrescription] = useState(null); // Holds selected prescription
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls first modal visibility
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Controls second modal visibility

  // Function to handle search request
  const handleSearch = async () => {
    if (!contactNumber) return; // If contact number is empty, do nothing

    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem("doctorInfo"));
      const { data } = await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/doctor/patientProfile`,
        { contactNumber },
        {
          headers: {
            Authorization: `Bearer ${token.token}`, // Include the token here
          },
        }
      );
      console.log(data)
      setPatientData(data); // Set the fetched patient data
      setIsModalOpen(true); // Open the first modal after successful fetch
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle prescription click (open second modal with more info)
  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription); // Update the selected prescription
    setIsDetailModalOpen(true); // Open the second modal
  };

  // Function to close the outer modal
  const handleCloseOuterModal = () => {
    setIsModalOpen(false); // Close only the first modal
    setPatientData(null); // Clear patient data when modal is closed
    setContactNumber(""); // Clear contact number input when modal is closed
  };

  // Function to close the inner modal
  const handleCloseInnerModal = () => {
    setIsDetailModalOpen(false); // Close only the second modal
    setSelectedPrescription(null); // Clear selected prescription when modal is closed
  };

  return (
    <Box p={2}>
      {/* Search Input */}
      <Text align="center" fontSize="2xl" fontWeight="bold" mb={6}>
        Search Patient by Contact Number
      </Text>
      <Box display={"flex"}  gap={4} maxWidth={600} justifyContent={"center"} m={"auto"}>
        <Input
          placeholder="Enter patient contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)} // Update the contact number input value
          mb={4}
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Show loading spinner while fetching data */}
      {loading && <Spinner size="lg" mt={4} />}

      {/* First Modal (Prescription History) */}
      <Modal isOpen={isModalOpen} onClose={handleCloseOuterModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prescription History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display patient's prescription history */}
            {patientData && patientData.prescriptionHistory ? (
              <VStack spacing={4} align="stretch" mt={6}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Prescription History for {patientData.firstName}{" "}
                  {patientData.lastName}
                </Text>
                <Text fontWeight="bold">
                  Patient ID : {patientData.uniqueId}
                </Text>

                {/* Prescription History List */}
                {patientData.prescriptionHistory.length > 0 ? (
                  patientData.prescriptionHistory
                    .sort(
                      (a, b) =>
                        new Date(b.savedPrescription.time) -
                        new Date(a.savedPrescription.time)
                    ) // Sort by most recent first
                    .map((prescription) => (
                      <Box
                        key={prescription.savedPrescription._id}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        bg={
                          prescription.savedPrescription.fulfilled
                            ? "green.50"
                            : "red.50"
                        } // Conditional color based on fulfillment
                        cursor="pointer"
                        _hover={{
                          bg: prescription.savedPrescription.fulfilled
                            ? "green.100"
                            : "red.100",
                        }}
                        onClick={() =>
                          handlePrescriptionClick(
                            prescription.savedPrescription
                          )
                        }
                      >
                        <HStack justify="space-between">
                          <Text>
                            <strong>Drug:</strong>{" "}
                            {prescription.savedPrescription.drug}
                          </Text>
                          <Text>
                            <strong>Date:</strong>{" "}
                            {new Date(
                              prescription.savedPrescription.time
                            ).toLocaleDateString()}
                          </Text>
                        </HStack>
                      </Box>
                    ))
                ) : (
                  <Text>No prescriptions found for this patient.</Text>
                )}
              </VStack>
            ) : (
              <Text>No data available for this patient.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseOuterModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal (Prescription Details) */}
      <Modal isOpen={isDetailModalOpen} onClose={handleCloseInnerModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prescription Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* If a prescription is selected, show the detailed info */}
            {selectedPrescription && (
              <>
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
                  <strong>Directions:</strong> {selectedPrescription.directions}
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
                  {selectedPrescription.justification || "N/A"}
                </Text>
                <Text>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedPrescription.time).toLocaleDateString()}
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseInnerModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Search;
