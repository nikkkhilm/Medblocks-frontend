import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Center,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import axios from "axios";

// DiagnosisSearch component
const DiagnosisSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("doctorInfo"));
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          `${
            import.meta.env.VITE_GATEWAY_SERVICE_URL
          }/doctor/findDiagnosis?q=${query}`,
          { headers: { Authorization: `Bearer ${token.token}` } }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching diagnosis records:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchData, 500); // Debounce to avoid excessive API calls
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search diagnosis..."
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul className="mt-2 border rounded divide-y">
        {results.length > 0
          ? results.map((diagnosis) => (
              <li key={diagnosis._id} className="p-2">
                <Button variant="link" onClick={() => onSelect(diagnosis)}>
                  {diagnosis.name} (ID: {diagnosis.diagnosisId})
                </Button>
              </li>
            ))
          : query && !loading && <p className="p-2">No results found</p>}
      </ul>
    </div>
  );
};

const DrugSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("doctorInfo"));
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          `${
            import.meta.env.VITE_GATEWAY_SERVICE_URL
          }/doctor/findMedicines?q=${query}`,
          { headers: { Authorization: `Bearer ${token.token}` } }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching drug records:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchData, 500); // Debounce to avoid excessive API calls
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search drug..."
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul className="mt-2 border rounded divide-y">
        {results.length > 0
          ? results.map((drug) => (
              <li key={drug._id} className="p-2">
                <Button variant="link" onClick={() => onSelect(drug)}>
                  {drug.drug} (LIMIT: {drug.limit})
                </Button>
              </li>
            ))
          : query && !loading && <p className="p-2">No results found</p>}
      </ul>
    </div>
  );
};


const CreatePrescriptionPage = ({ onPrescriptionCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();
  const [prescription, setPrescription] = useState({
    doctorAddress: "",
    patientId: "",
    drug: "",
    dosage: "",
    quantity: "",
    directions: "",
    emergency: false,
    justification: "",
    privateKey: "",
    diagnosisId: "",
  });

  // Handle input change for prescription fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  // Handle submitting prescription
  const handleSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("doctorInfo"));
      if (!token) throw new Error("No token found");

      // API call to submit prescription
      const response = await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/doctor/createPrescription`,
        prescription,
        { headers: { Authorization: `Bearer ${token.token}` } }
      );

      console.log("Prescription submitted:", response.data);
      // alert("Prescription submitted successfully!");
      toast({ title: "Prescription submitted successfully!", status: "success" });

      if (onPrescriptionCreated) onPrescriptionCreated();

      setPrescription({
        doctorAddress: "",
        patientId: "",
        drug: "",
        dosage: "",
        quantity: "",
        directions: "",
        emergency: false,
        justification: "",
        privateKey: "",
        diagnosisId: "",
      });

      onClose();
    } catch (error) {
      console.error("Error submitting prescription:", error.response.data);
      console.log("Error submitting prescription:", error.response.data.message.error);
      // alert(
      //   error.response.data.message.error
      // );
      toast({
        title: error.response.data.message.error,
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top-right",
        size: "xxxl",
      });
    }
  };

  // Handle diagnosis selection
  const handleDiagnosisSelect = (diagnosis) => {
    setPrescription({ ...prescription, diagnosisId: diagnosis.diagnosisId });
  };

  // Handle drug selection
  const handleDrugSelect = (drug) => {
    setPrescription({ ...prescription, drug: drug.drug });
  };

  return (
    <Center
      bg="linear-gradient(180deg, #000000, #1a1a40, rgb(14, 22, 95))"
      h="50vh"
      color="white"
    >
      <Box
        bg="white"
        w="60%"
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Text
          fontSize="2xl"
          mb={4}
          textAlign="center"
          fontWeight="bolder"
          color="red"
        >
          Create Prescription
        </Text>

        <Button colorScheme="blue" onClick={onOpen} mb={4} w="100%" size="lg">
          Create Prescription
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Prescription</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Doctor's Ethereum Address</FormLabel>
                <Input
                  name="doctorAddress"
                  value={prescription.doctorAddress}
                  onChange={handleChange}
                  placeholder="Enter Ethereum Address"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Patient ID</FormLabel>
                <Input
                  type="number"
                  name="patientId"
                  value={prescription.patientId}
                  onChange={handleChange}
                  placeholder="Enter Patient ID"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Drug</FormLabel>
                <DrugSearch onSelect={handleDrugSelect} />
                <Input
                  name="drug"
                  value={prescription.drug}
                  readOnly
                  placeholder="Selected Drug"
                  mt={2}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Dosage</FormLabel>
                <Input
                  name="dosage"
                  value={prescription.dosage}
                  onChange={handleChange}
                  placeholder="Enter Dosage (e.g., 500 mg)"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  value={prescription.quantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Directions</FormLabel>
                <Textarea
                  name="directions"
                  value={prescription.directions}
                  onChange={handleChange}
                  placeholder="Enter Directions for Usage"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Emergency</FormLabel>
                <Checkbox
                  name="emergency"
                  isChecked={prescription.emergency}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      emergency: e.target.checked,
                    })
                  }
                >
                  Mark as Emergency
                </Checkbox>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Justification</FormLabel>
                <Textarea
                  name="justification"
                  value={prescription.justification}
                  onChange={handleChange}
                  placeholder="Enter Justification (if any)"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Doctor's Private Key</FormLabel>
                <Input
                  name="privateKey"
                  value={prescription.privateKey}
                  onChange={handleChange}
                  placeholder="Enter Private Key"
                />
              </FormControl>

              {/* Diagnosis Autocomplete Dropdown */}
              <FormControl mb={4}>
                <FormLabel>Diagnosis</FormLabel>
                <DiagnosisSearch onSelect={handleDiagnosisSelect} />
                <Input
                  name="diagnosisId"
                  value={prescription.diagnosisId}
                  readOnly
                  placeholder="Selected Diagnosis ID"
                  mt={2}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit Prescription
              </Button>
              <Button ml={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
};

export default CreatePrescriptionPage;
