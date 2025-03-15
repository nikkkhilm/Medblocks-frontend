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
  Input,
  FormControl,
  FormLabel,
  useToast,
  Image,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

const RegulatoryHome = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [remarks, setRemarks] = useState(""); // State to store resolution remarks
  const [drug, setDrug] = useState(""); // State to store drug name
  const [limit, setLimit] = useState(""); // State to store limit
  const [ethPubKey, setEthPubKey] = useState(""); // State to store Ethereum public key
  const [doctorInfo, setDoctorInfo] = useState(null); // State to store fetched doctor info
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRemarksOpen,
    onOpen: onRemarksOpen,
    onClose: onRemarksClose,
  } = useDisclosure();
  const {
    isOpen: isSafeLimitOpen,
    onOpen: onSafeLimitOpen,
    onClose: onSafeLimitClose,
  } = useDisclosure();
  const toast = useToast();

  // Fetch real-time data using SSE
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("regulatoryInfo"));
    console.log(token);
    const eventSource = new EventSource(
      `${
        import.meta.env.VITE_GATEWAY_SERVICE_URL
      }/regulatoryBody/viewAllPrescriptions`
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrescriptions(data);
      console.log(data);
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
      toast({
        title: "Error",
        description: "Please enter remarks.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    console.log(selectedPrescription);

    try {
      const token = JSON.parse(localStorage.getItem("regulatoryInfo"));
      await axios.post(
        `${
          import.meta.env.VITE_GATEWAY_SERVICE_URL
        }/regulatoryBody/resolveFlaggedPrescription`,
        {
          prescriptionId: selectedPrescription.prescriptionId, // Send prescription ID
          resolution: remarks, // Send the remarks
        },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      toast({
        title: "Success",
        description: "Prescription resolved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onRemarksClose(); // Close the remarks modal
      setRemarks(""); // Clear the remarks field
    } catch (error) {
      console.error("Error resolving prescription:", error);
      toast({
        title: "Error",
        description: "Failed to resolve prescription.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle reject
  const handleReject = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("regulatoryInfo"));
      await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/regulatoryBody/rejectPrescription`,
        { prescriptionId: id },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      toast({
        title: "Success",
        description: "Prescription rejected successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error rejecting prescription:", error);
      toast({
        title: "Error",
        description: "Failed to reject prescription.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle set safe limit
  const handleSetSafeLimit = async () => {
    if (!drug || !limit) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("regulatoryInfo"));
      await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/regulatoryBody/setSafeLimit`,
        { drug, limit },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      toast({
        title: "Success",
        description: "Safe limit set successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    
      onSafeLimitClose(); // Close the safe limit modal
      setDrug(""); // Clear the drug field
      setLimit(""); // Clear the limit field
    } catch (error) {
      console.error("Error setting safe limit:", error);
      toast({
        title: "Error",
        description: "Failed to set safe limit.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle search doctor by Ethereum public key
  const handleSearchDoctor = async () => {
    if (!ethPubKey) {
      toast({
        title: "Error",
        description: "Please enter the Ethereum public key.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("regulatoryInfo"));
      const { data } = await axios.get(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/regulatoryBody/findDoctorByEthPublicKey/${ethPubKey}`,
        {
          // params: { ethPubKey },
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      setDoctorInfo(data.doctor);
      toast({
        title: "Success",
        description: "Doctor information fetched successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching doctor information:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctor information.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setEthPubKey("");
    setDoctorInfo(null);
  };

  // Segregate prescriptions by flagged and emergency status
  const flaggedPrescriptions = prescriptions.filter((p) => p.flagged);
  const nonFlaggedPrescriptions = prescriptions.filter((p) => !p.flagged);

  return (
    <Center bg="gray.100" minH="100vh" p={6}>
      <Box w="80%" mt="150px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="3xl" mb={6} textAlign="center" fontWeight="bold">
            Regulatory Dashboard
          </Text>
          <Button colorScheme="blue" onClick={onSafeLimitOpen}>
            Set Safe Limit
          </Button>
        </Box>

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

        {/* Input for Ethereum public key and search button */}
        <Box mt={6} p={4} borderRadius="lg" borderWidth="1px" bg="white">
          <FormControl mb={4}>
            <FormLabel>Doctor's Ethereum Address</FormLabel>
            <Input
              placeholder="Enter Ethereum Address"
              value={ethPubKey}
              onChange={(e) => setEthPubKey(e.target.value)}
            />
          </FormControl>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSearchDoctor}>
              Search
            </Button>
            <Button colorScheme="red" onClick={handleClearSearch}>
              Clear
            </Button>
          </HStack>
        </Box>

        {/* Display fetched doctor information */}
        {doctorInfo && (
          <Box mt={6} p={4} borderRadius="lg" borderWidth="1px" bg="white">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Doctor Information
            </Text>
            {/* <Image src={doctorInfo.profileUrl} alt="Doctor Profile" boxSize="150px" mb={4} /> */}
            <Text><strong>First Name:</strong> {doctorInfo.firstName}</Text>
            <Text><strong>Last Name:</strong> {doctorInfo.lastName}</Text>
            <Text><strong>Date of Birth:</strong> {new Date(doctorInfo.dateOfBirth).toLocaleDateString()}</Text>
            <Text><strong>Gender:</strong> {doctorInfo.gender}</Text>
            <Text><strong>Contact Number:</strong> {doctorInfo.contactNumber}</Text>
            <Text><strong>Email:</strong> {doctorInfo.email}</Text>
            <Text><strong>Ethereum Wallet Address:</strong> {doctorInfo.ethereumWalletAddress}</Text>
            <Text><strong>Specialization:</strong> {doctorInfo.specialization}</Text>
            <Text><strong>Medical License ID:</strong> {doctorInfo.medicalLicenseId}</Text>
            <Text><strong>Medical License Certificate:</strong> <a href={doctorInfo.medicalLicenseCertificateUrl} target="_blank" rel="noopener noreferrer">View Certificate</a></Text>
          </Box>
        )}

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
                  <strong>Direction:</strong> {selectedPrescription.directions}
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
                  <strong>Time</strong>{" "}
                  {selectedPrescription.time || "N/A"}
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

        {/* Modal for Setting Safe Limit */}
        <Modal isOpen={isSafeLimitOpen} onClose={onSafeLimitClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Set Safe Limit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Drug</FormLabel>
                <Input
                  placeholder="Enter Drug Name"
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Limit</FormLabel>
                <Input
                  placeholder="Enter Limit"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSetSafeLimit} mr={3}>
                Submit
              </Button>
              <Button onClick={onSafeLimitClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
};

export default RegulatoryHome;
