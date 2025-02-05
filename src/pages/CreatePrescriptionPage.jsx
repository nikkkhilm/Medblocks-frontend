import React, { useState } from "react";
// import { useToast } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import axios from "axios";

const CreatePrescriptionPage = ({ onPrescriptionCreated }) => {
  // const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("doctorInfo"));
      if (!token) {
        alert("No authorization token found");
        return;
      }

      // API call to submit prescription
      const response = await axios.post(
        `${import.meta.env.VITE_GATEWAY_SERVICE_URL}/doctor/createPrescription`,
        prescription,
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );

      // console.log(response.data.details)
      console.log("Prescription submitted successfully:", response.data);
      alert("Prescription submitted successfully!");
      //  toast({
      //    title: "Prescribed Successfully",
      //    status: "success",
      //    duration: 5000,
      //    isClosable: true,
      //    position: "bottom",
      //  });

      // Notify parent component to refresh prescription list
      if (onPrescriptionCreated) {
        onPrescriptionCreated();
      }

      // Reset form state and close modal
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
      });
      onClose();
    } catch (error) {
      console.error("Error submitting prescription:", error.response.data.details);
      // console.error("Error submitting prescription:", error);
      

      alert("Failed to submit prescription. Please try again.");
      //  toast({
      //    title: "Error occurred",
      //    description: error.response.data.message,
      //    status: "error",
      //    duration: 5000,
      //    isClosable: true,
      //    position: "bottom",
      //  });
    }
  };

  return (
    <Center bg="black" h="50vh" color="white">
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
                  type="text"
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
                <Input
                  type="text"
                  name="drug"
                  value={prescription.drug}
                  onChange={handleChange}
                  placeholder="Enter Drug Name"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Dosage</FormLabel>
                <Input
                  type="text"
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
                  type="text"
                  name="privateKey"
                  value={prescription.privateKey}
                  onChange={handleChange}
                  placeholder="Enter Private Key"
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
