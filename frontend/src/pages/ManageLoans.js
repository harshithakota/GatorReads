import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, Chip 
} from "@mui/material";

export default function ManageLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8083/getAllLoans")
      .then(response => response.json())
      .then(data => {
        const formattedLoans = data.Loans.map(loan => ({
          id: loan.bookid,
          borrower: loan.ufid,
          loanDate: loan.issueDate.split("T")[0],
          dueDate: loan.dueDate.split("T")[0],
          status: capitalizeFirstLetter(loan.status)
        }));
        setLoans(formattedLoans);
      })
      .catch(error => console.error('Error fetching loans:', error));
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleReturnBook = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    const reqBody = {
      UFID: loan.borrower,
      BookID: loanId,
      ReturnDate: new Date().toISOString() // Adjust based on actual requirements
    };

    fetch("http://localhost:8083/returnBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Book returned successfully") {
        const updatedLoans = loans.map(loan => 
          loan.id === loanId ? { ...loan, status: "Returned" } : loan
        );
        setLoans(updatedLoans);
      } else {
        console.error('Failed to return book:', data.message);
      }
    })
    .catch(error => console.error('Error returning book:', error));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "150px", marginBottom: "50px" }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        Manage Book Loans
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: "center", color: "gray" }}>
        View and manage all active loans
      </Typography>

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
                <TableCell>{loan.title || 'Unknown Title'}</TableCell>
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
