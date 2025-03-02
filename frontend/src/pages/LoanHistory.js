import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button
} from "@mui/material";
import axios from "axios";

export default function LoanHistory({ufid}) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchLoans = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/getLoans/${ufid}`);
        setLoans(response.data.allotments || []);
      } catch (err) {
        setError("Failed to fetch loan history");
      }
      setLoading(false);
    };

    fetchLoans();
  }, [ufid]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "120px" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
        Loan History
      </Typography>

      {/* Show Loading Message */}
      {loading && <Typography textAlign="center">Loading...</Typography>}

      {/* Show Error Message */}
      {error && <Typography color="error" textAlign="center">{error}</Typography>}

      {/* Loan Table */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Book ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Loan Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Due Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Return Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loans.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell>{loan.bookid}</TableCell>
                  <TableCell>{new Date(loan.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {loan.returnDate === "0001-01-01T00:00:00Z" 
                      ? "Not Returned" 
                      : new Date(loan.returnDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={loan.status.charAt(0).toUpperCase() + loan.status.slice(1)} // Capitalize status
                      color={
                        loan.status === "active" ? "primary"
                        : loan.status === "returned" ? "success"
                        : "error"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Back to Dashboard Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="contained" href="/student-dashboard" sx={{ fontWeight: "bold" }}>
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
}