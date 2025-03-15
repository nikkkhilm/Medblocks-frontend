import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";

const API_BASE_URL = import.meta.env.VITE_ANALYTICS;

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    prescriptionVolume: {},
    emergencyAnalysis: [],
    drugDemand: [],
    flaggedPrescriptions: {},
    diagnosisComparison: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prescriptions, emergency, drugs, flagged, diagnosis] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/analytics/prescription-volume`),
            axios.get(`${API_BASE_URL}/analytics/emergency-analysis`),
            axios.get(`${API_BASE_URL}/analytics/drug-demand`),
            axios.get(`${API_BASE_URL}/analytics/flagged-prescriptions`),
            axios.get(`${API_BASE_URL}/analytics/diagnosis-comparison`),
          ]);

        setData({
          prescriptionVolume: prescriptions.data || {},
          emergencyAnalysis: emergency.data.emergency || [],
          drugDemand: drugs.data.drug_comparison || [],
          flaggedPrescriptions: flagged.data || {},
          diagnosisComparison: diagnosis.data.diagnosis_comparison || [],
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Spinner size="xl" />
      </Box>
    );

  if (error)
    return (
      <Alert status="error" mt={6}>
        <AlertIcon />
        Error fetching data: {error.message}
      </Alert>
    );

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading as="h1" size="2xl" textAlign="center" mb={8} color="teal.600">
        Analytics Dashboard
      </Heading>

      {/* Daily Prescription Volume */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="blue.600">
          Daily Prescription Volume
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.prescriptionVolume.daily || []}>
            <XAxis dataKey="_id.date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Weekly Prescription Volume */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="blue.600">
          Weekly Prescription Volume
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.prescriptionVolume.weekly || []}>
            <XAxis dataKey="_id.week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Monthly Prescription Volume */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="blue.600">
          Monthly Prescription Volume
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.prescriptionVolume.monthly || []}>
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ff7300" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Emergency Analysis */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="red.600">
          Emergency vs Non-Emergency
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.emergencyAnalysis}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#e74c3c" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Drug Demand */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="blue.500">
          Drug Demand
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.drugDemand}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3498db" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Flagged Prescriptions */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="yellow.600">
          Flagged Prescriptions
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={[data.flaggedPrescriptions]}>
            <XAxis dataKey="flagged" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="flagged" fill="#f1c40f" barSize={40} />
            <Bar dataKey="non_flagged" fill="#9b59b6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Diagnosis Comparison */}
      <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="green.600">
          Diagnosis Comparison
        </Heading>
        <Divider mb={4} />
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data.diagnosisComparison}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#16a085" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;
