import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Spinner,
  FormControl,
  FormLabel,
  useDisclosure,
  HStack,
  Center,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import Navbars from './Navbars'
// import ScrollingText from "../Components/ScrollingText";
import { useNavigate } from "react-router-dom";

const PharmacistHome = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [pharmacistInfo, setPharmacistInfo] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const {
    isOpen: isFulfillOpen,
    onOpen: onFulfillOpen,
    onClose: onFulfillClose,
  } = useDisclosure();

  const [fulfillData, setFulfillData] = useState({
    pharmacistAddress: "",
    privateKey: "",
  });

  // Fetch Pharmacist Info
  useEffect(() => {
    const fetchPharmacistInfo = async () => {
      setLoadingProfile(true);
      try {
        const token = JSON.parse(localStorage.getItem("pharmaInfo"));
        if (!token) throw new Error("No token found");

        const { data } = await axios.get(
          `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/pharmacist/profile`,
          { headers: { Authorization: `Bearer ${token.token}` } }
        );

        console.log(data)
        setPharmacistInfo(data);
        console.log("pharmacistInfo", pharmacistInfo);
      } catch (error) {
        console.error("Error fetching pharmacist info:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchPharmacistInfo();
  }, []);

  // Fetch Prescription by ID
  const fetchPrescription = async () => {
    setLoadingSearch(true);
    try {
      const token = JSON.parse(localStorage.getItem("pharmaInfo"));
      if (!token) throw new Error("No token found");

      const { data } = await axios.get(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/pharmacist/viewPrescription/${searchId}`,
        { headers: { Authorization: `Bearer ${token.token}` } }
      );
      console.log(data)
      if (data.prescription.fulfilled) {
        toast({
          title: "Error",
          description: "This prescription is already fulfilled.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setSearchId(""); // Reset search field
        setPrescriptions([]); // Clear previous search results
      } else {
        setPrescriptions((prev) => [...prev, data.prescription]); // Add to list
        console.log("prescriptions", prescriptions)
        setSearchId(""); // Reset search field
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast({
        title: "Error",
        description: "Failed to fetch prescription.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setSearchId(""); // Reset search field
      setPrescriptions([]); // Clear previous search results
    } finally {
      setLoadingSearch(false);
    }
  };

  // Handle Fulfill Form Submission
  const handleFulfillSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("pharmaInfo"));
      if (!token) throw new Error("No token found");

      const payload = {
        prescriptionId: selectedPrescription.id,
        ...fulfillData,
      };
      console.log(payload)

      const { data } = await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/pharmacist/fulfillPrescription`,
        payload,
        { headers: { Authorization: `Bearer ${token.token}` } }
      );
      console.log(data)

      toast({
        title: "Success",
        description: "Prescription fulfilled successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onFulfillClose();
      onDetailsClose();

      // Remove fulfilled prescription from list
      setPrescriptions((prev) =>
        prev.filter(
          (p) => p.prescriptionId !== selectedPrescription.prescriptionId
        )
      );

      // Reset fulfill data
      setFulfillData({
        pharmacistAddress: "",
        privateKey: "",
      });
    } catch (error) {
      console.error("Error fulfilling prescription:", error);
      toast({
        title: "Error",
        position: "top-right",
        description: "Failed to fulfill prescription.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setSearchId(""); // Reset search field
      setPrescriptions([]); // Clear previous search results
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pharmaInfo");
    navigate("/")
  };

  return (
    <>
      <Navbars role="pharmacist" onProfileOpen={onProfileOpen} />
      <Box p={6}>
        <Box mt={40}>
          <Text
            fontSize="4xl"
            fontWeight="bolder"
            textColor={"red"}
            mb={6}
            textAlign={"center"}
            textDecor={"underline"}
          >
            PHARMACIST DASHBOARD
          </Text>

          <Box display="flex" flexDir="column" alignItems="center">
            {/* Search Box */}
            <Box mt={6} maxWidth={900}>
              <HStack spacing={4} minWidth={600}>
                <Input
                  placeholder="Enter Prescription ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  onClick={fetchPrescription}
                  isLoading={loadingSearch}
                >
                  Search
                </Button>
              </HStack>
            </Box>

            {/* Prescription List */}
            <Box mt={6}>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                To-Do Prescriptions
              </Text>
              {prescriptions.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {prescriptions.map((prescription) => (
                    <Box
                      key={prescription.id} //this should be prescriptionId or id check
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      boxShadow="md"
                      bg="gray.50"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        onDetailsOpen();
                      }}
                    >
                      <Text>
                        <strong>Prescription ID:</strong> {prescription.id}
                      </Text>
                      <Text>
                        <strong>Patient ID:</strong> {prescription.patientId}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>No prescriptions found.</Text>
              )}
            </Box>
          </Box>

          {/* Prescription Details Modal */}
          {selectedPrescription && (
            <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Prescription Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    <strong>Prescription ID:</strong> {selectedPrescription.id}
                  </Text>
                  <Text>
                    <strong>Doctor:</strong> {selectedPrescription.doctor}
                  </Text>
                  <Text>
                    <strong>Patient ID:</strong> {selectedPrescription.patientId}
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
                    <strong>Justification:</strong> {selectedPrescription.justification}
                  </Text>
                  <Text color={selectedPrescription.fulfilled ? "green" : "red"}>
                    <strong>Fulfilled:</strong> {selectedPrescription.fulfilled ? "YES" : "NO"}
                  </Text>
                  <Text>
                    <strong>Emergency:</strong> {selectedPrescription.emergency ? "YES" : "NO"}
                  </Text>
                  <Text>
                    <strong>Flagged:</strong> {selectedPrescription.flagged ? "YES" : "NO"}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" onClick={onFulfillOpen}>
                    Fulfill
                  </Button>
                  <Button colorScheme="blue" ml={3} onClick={onDetailsClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* Fulfill Modal */}
          <Modal isOpen={isFulfillOpen} onClose={onFulfillClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Fulfill Prescription</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>Pharmacist Address</FormLabel>
                  <Input
                    value={fulfillData.pharmacistAddress}
                    onChange={(e) =>
                      setFulfillData({
                        ...fulfillData,
                        pharmacistAddress: e.target.value,
                      })
                    }
                    placeholder="Enter Pharmacist Address"
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Private Key</FormLabel>
                  <Input
                    value={fulfillData.privateKey}
                    onChange={(e) =>
                      setFulfillData({
                        ...fulfillData,
                        privateKey: e.target.value,
                      })
                    }
                    placeholder="Enter Private Key"
                    type="password"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" onClick={handleFulfillSubmit}>
                  Submit
                </Button>
                <Button colorScheme="blue" ml={3} onClick={onFulfillClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default PharmacistHome;
