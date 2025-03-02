import React, { useState } from "react";
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, Chip 
} from "@mui/material";

// Dummy Loan Data (Replace with API later)
const dummyLoans = [
  {
    id: 1,
    borrower: "John Doe",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    loanDate: "2024-02-10",
    dueDate: "2024-02-24",
    status: "Active"
  },
  {
    id: 2,
    borrower: "Alice Smith",
    title: "Clean Code",
    author: "Robert C. Martin",
    loanDate: "2024-01-20",
    dueDate: "2024-02-03",
    status: "Overdue"
  },
  {
    id: 3,
    borrower: "Bob Johnson",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    loanDate: "2024-02-01",
    dueDate: "2024-02-15",
    status: "Active"
  }
];

export default function ManageLoans() {
  const [loans, setLoans] = useState(dummyLoans);

  // Function to simulate returning a book
  const handleReturnBook = (id) => {
    const updatedLoans = loans.map((loan) =>
      loan.id === id ? { ...loan, status: "Returned" } : loan
    );
    setLoans(updatedLoans);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px", marginBottom: "50px" }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 1, textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        Manage Book Loans
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: "center", color: "gray" }}>
        View and manage all active loans
      </Typography>

      {/* Loan Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976D2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Borrower</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Loan Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Due Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.borrower}</TableCell>
                <TableCell>{loan.title}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.dueDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={loan.status} 
                    color={
                      loan.status === "Active" ? "primary" 
                      : loan.status === "Overdue" ? "error" 
                      : "success"
                    } 
                  />
                </TableCell>
                <TableCell>
                  {loan.status === "Active" || loan.status === "Overdue" ? (
                    <Button 
                      variant="contained" 
                      color="success"
                      size="small"
                      onClick={() => handleReturnBook(loan.id)}
                    >
                      Mark as Returned
                    </Button>
                  ) : (
                    <Chip label="Returned" color="success" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
