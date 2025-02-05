import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

const RegulatoryHome = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [remarks, setRemarks] = useState(""); // State to store resolution remarks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRemarksOpen,
    onOpen: onRemarksOpen,
    onClose: onRemarksClose,
  } = useDisclosure();

  // Fetch real-time data using SSE
  useEffect(() => {
    const eventSource = new EventSource(
      `${
        import.meta.env.VITE_GATEWAY_SERVICE_URL
      }/regulatoryBody/viewAllPrescriptions`
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrescriptions(data);
    };
    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Handle modal open
  const handleOpenModal = (prescription) => {
    setSelectedPrescription(prescription);
    onOpen();
  };

  // Handle resolve action
  const handleResolve = () => {
    onClose(); // Close the first modal
    onRemarksOpen(); // Open the remarks modal
  };

  // Handle resolve with remarks
  const handleResolveWithRemarks = async () => {
    if (!remarks) {
      alert("Please enter remarks.");
      return;
    }
    console.log(selectedPrescription)

    try {
      await axios.post(
        `${
          import.meta.env.VITE_GATEWAY_SERVICE_URL
        }/regulatoryBody/resolveFlaggedPrescription`,
        {
          prescriptionId: selectedPrescription.prescriptionId, // Send prescription ID
          resolution: remarks, // Send the remarks
        }
      );
      onRemarksClose(); // Close the remarks modal
      setRemarks(""); // Clear the remarks field
    } catch (error) {
      console.error("Error resolving prescription:", error);
    }
  };

  // Handle reject
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/prescriptions/${id}/reject`);
      onClose();
    } catch (error) {
      console.error("Error rejecting prescription:", error);
    }
  };

  // Segregate prescriptions by flagged and emergency status
  const flaggedPrescriptions = prescriptions.filter((p) => p.flagged);
  const nonFlaggedPrescriptions = prescriptions.filter((p) => !p.flagged);

  return (
    <Center bg="gray.100" minH="100vh" p={6}>
      <Box w="80%" mt="150px">
        <Text fontSize="3xl" mb={6} textAlign="center" fontWeight="bold">
          Regulatory Dashboard
        </Text>

        <Box display="flex" justifyContent="space-between" gap={4}>
          {/* Flagged (Emergency) */}
          <Box flex={1} bg="red.100" p={4} borderRadius="lg" borderWidth="1px">
            <Text fontSize="xl" mb={4} fontWeight="bold" color="red.600">
              Flagged / Emergency
            </Text>
            {flaggedPrescriptions.map((prescription) => (
              <Box
                key={prescription._id}
                p={3}
                mb={3}
                bg="white"
                borderRadius="md"
                borderWidth="1px"
                cursor="pointer"
                onClick={() => handleOpenModal(prescription)}
              >
                <Text>Patient ID: {prescription.patientId}</Text>
                <Text>Drug: {prescription.drug}</Text>
                <Text>Dosage: {prescription.dosage}</Text>
                <Text>Emergency: {prescription.emergency ? "Yes" : "No"}</Text>
                <Text>Flagged: {prescription.flagged ? "Yes" : "No"}</Text>
                <Text>Fulfilled: {prescription.fulfilled ? "Yes" : "No"}</Text>
              </Box>
            ))}
          </Box>

          {/* Non-Flagged */}
          <Box
            flex={1}
            bg="green.100"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize="xl" mb={4} fontWeight="bold" color="green.600">
              Non-Emergency
            </Text>
            {nonFlaggedPrescriptions.map((prescription) => (
              <Box
                key={prescription._id}
                p={3}
                mb={3}
                bg="white"
                borderRadius="md"
                borderWidth="1px"
                cursor="pointer"
                onClick={() => handleOpenModal(prescription)}
              >
                <Text>Patient ID: {prescription.patientId}</Text>
                <Text>Drug: {prescription.drug}</Text>
                <Text>Dosage: {prescription.dosage}</Text>
                <Text>Emergency: {prescription.emergency ? "Yes" : "No"}</Text>
                <Text>Flagged: {prescription.flagged ? "Yes" : "No"}</Text>
                <Text>Fulfilled: {prescription.fulfilled ? "Yes" : "No"}</Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Modal for Prescription Details */}
        {selectedPrescription && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Prescription Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  <strong>Prescription ID:</strong> {selectedPrescription.prescriptionId}
                </Text>
                <Text>
                  <strong>Patient ID:</strong> {selectedPrescription.patientId}
                </Text>
                <Text>
                  <strong>Doctor:</strong> {selectedPrescription.doctor}
                </Text>
                <Text>
                  <strong>Drug:</strong> {selectedPrescription.drug}
                </Text>
                <Text>
                  <strong>Dosage:</strong> {selectedPrescription.dosage}
                </Text>
                <Text>
                  <strong>Direction:</strong> {selectedPrescription.direction}
                </Text>
                <Text>
                  <strong>Comments:</strong> {selectedPrescription.comments}
                </Text>
                <Text>
                  <strong>Emergency:</strong>{" "}
                  {selectedPrescription.emergency ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Flagged:</strong>{" "}
                  {selectedPrescription.flagged ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Fulfilled:</strong>{" "}
                  {selectedPrescription.fulfilled ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Is Safe:</strong>{" "}
                  {selectedPrescription.isSafe ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Is Verified:</strong>{" "}
                  {selectedPrescription.isVerified ? "Yes" : "No"}
                </Text>
                <Text>
                  <strong>Creation Time:</strong>{" "}
                  {new Date(selectedPrescription.time).toLocaleString()}
                </Text>
                <Text>
                  <strong>Prescription Creation TxHash:</strong>{" "}
                  {selectedPrescription.prescriptionCreationTxHash || "N/A"}
                </Text>
                <Text>
                  <strong>Prescription Fulfillment TxHash:</strong>{" "}
                  {selectedPrescription.prescriptionFulfillmentTxHash || "N/A"}
                </Text>
              </ModalBody>
              <ModalFooter>
                {/* Show resolve and reject buttons only for flagged prescriptions */}
                {selectedPrescription.flagged && (
                  <>
                    <Button colorScheme="green" onClick={handleResolve} mr={3}>
                      Resolve
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleReject(selectedPrescription._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Modal for Remarks */}
        {selectedPrescription && (
          <Modal isOpen={isRemarksOpen} onClose={onRemarksClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Resolution Remarks</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  placeholder="Enter resolution remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={handleResolveWithRemarks}
                  mr={3}
                >
                  Submit
                </Button>
                <Button onClick={onRemarksClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Center>
  );
};

export default RegulatoryHome;
