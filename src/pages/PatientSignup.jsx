import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !contactNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/register/patient`,
        {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          contactNumber,
          email,
          password,
        },
        config
      );

      toast({
        title: "Signup Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occurred",
        description: error.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px" width="100%">
      <FormControl id="firstname" isRequired>
        <FormLabel fontSize="lg">First Name</FormLabel>
        <Input
          placeholder="Enter Your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="lastname" isRequired>
        <FormLabel fontSize="lg">Last Name</FormLabel>
        <Input
          placeholder="Enter Your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="dob" isRequired>
        <FormLabel fontSize="lg">Date of Birth</FormLabel>
        <Input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel fontSize="lg">Gender</FormLabel>
        <Select
          placeholder="Select Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          size="lg"
          fontSize="lg"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl id="contactnumber" isRequired>
        <FormLabel fontSize="lg">Contact Number</FormLabel>
        <Input
          type="tel"
          placeholder="Enter Your Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel fontSize="lg">Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel fontSize="lg">Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="lg"
          fontSize="lg"
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        size="lg"
        fontSize="lg"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default PatientSignup;
