import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [ethereumWalletAddress, setEthereumWalletAddress] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [medicalLicenseId, setMedicalLicenseId] = useState("");
  const [medicalLicenseCertificateUrl, setMedicalLicenseCertificateUrl] =
    useState("");
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
      !confirmPassword ||
      !specialization ||
      !medicalLicenseId ||
      !ethereumWalletAddress
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
        position: "bottom",
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
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/register/doctor`,
        {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          contactNumber,
          email,
          password,
          specialization,
          ethereumWalletAddress,
          profileUrl,
          medicalLicenseId,
          medicalLicenseCertificateUrl
        },
        config
      );

      toast({
        title: "Signup Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // localStorage.setItem("doctorInfo", JSON.stringify(data));
      setLoading(false);
      // navigate("/doctor/dashboard");
      console.log(data)
      console.log("doctor signed up")
    } catch (error) {
      toast({
        title: "Error occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="firstName" isRequired>
        <FormLabel fontSize={"lg"}>First Name</FormLabel>
        <Input
          placeholder="Enter Your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="lastName" isRequired>
        <FormLabel fontSize={"lg"}>Last Name</FormLabel>
        <Input
          placeholder="Enter Your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="dateOfBirth" isRequired>
        <FormLabel fontSize={"lg"}>Date of Birth</FormLabel>
        <Input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel fontSize={"lg"}>Gender</FormLabel>
        <Select
          placeholder="Select Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl id="contactNumber" isRequired>
        <FormLabel fontSize={"lg"}>Contact Number</FormLabel>
        <Input
          type="tel"
          placeholder="Enter Your Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel fontSize={"lg"}>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontSize={"lg"}>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel fontSize={"lg"}>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="specialization" isRequired>
        <FormLabel fontSize={"lg"}>Specialization</FormLabel>
        <Input
          placeholder="Enter Your Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="ethereumWalletAddress" isRequired>
        <FormLabel fontSize={"lg"}>Ethereum Wallet Address</FormLabel>
        <Input
          placeholder="Enter Ethereum Wallet Address"
          value={ethereumWalletAddress}
          onChange={(e) => setEthereumWalletAddress(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="profileUrl" isRequired>
        <FormLabel fontSize={"lg"}>Profile URL</FormLabel>
        <Input
          type="url"
          placeholder="Enter Profile URL"
          value={profileUrl}
          fontSize={"lg"}
          size={"lg"}
          onChange={(e) => setProfileUrl(e.target.value)}
        />
      </FormControl>

      <FormControl id="medicalLicenseId" isRequired>
        <FormLabel fontSize={"lg"}>Medical License ID</FormLabel>
        <Input
          placeholder="Enter Medical License ID"
          value={medicalLicenseId}
          onChange={(e) => setMedicalLicenseId(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <FormControl id="medicalLicenseCertificateUrl" isRequired>
        <FormLabel fontSize={"lg"}>Medical License Certificate URL</FormLabel>
        <Input
          type="url"
          placeholder="Enter Medical License Certificate URL"
          value={medicalLicenseCertificateUrl}
          onChange={(e) => setMedicalLicenseCertificateUrl(e.target.value)}
          fontSize={"lg"}
          size={"lg"}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        fontSize={"lg"}
        size={"lg"}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default DoctorSignup;
