import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Grid, Card, CardContent, Divider, CircularProgress, Alert
} from "@mui/material";
import axios from "axios";

export default function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null); // ✅ Error state

  // 📌 Fetch Books from API on component mount
  useEffect(() => {
    axios.get("http://localhost:8083/getAllBooks")
      .then(response => {
        setBooks(response.data.books || []); // ✅ Ensure books are in the correct format
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: "120px", marginBottom: "50px" }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 1, textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        Library Book Collection
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: "center", color: "gray" }}>
        Explore the available books in the library
      </Typography>

      {/* ✅ Show Loading Spinner */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>Loading books...</Typography>
        </div>
      )}

      {/* ❌ Show Error Message if API Fails */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {/* 📚 Display Books if Fetched */}
      {!loading && !error && (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.bookId}>
              <Card sx={{ 
                transition: "0.3s", 
                "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }, 
                borderRadius: "10px",
                overflow: "hidden"
              }}>
                {/* Book Image */}
                <img 
                  src={book.imageData} 
                  alt={book.bookFullName} 
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    {book.bookFullName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    by <span style={{ fontWeight: "bold" }}>{book.authorName}</span>
                  </Typography>

                  {/* Divider for better spacing */}
                  <Divider sx={{ my: 2 }} />

                  {/* Book Details */}
                  <Typography variant="body2" sx={{ color: "#333", fontSize: "14px" }}>
                    <strong>ISBN:</strong> {book.bookId}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    mt: 1, 
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: book.bookCount > 0 ? "green" : "red" 
                  }}>
                    {book.bookCount > 0 ? `${book.bookCount} Copies Available` : "Out of Stock"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
