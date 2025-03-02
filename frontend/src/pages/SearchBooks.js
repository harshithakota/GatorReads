import React, { useState, useEffect } from "react";
import { 
  Container, Typography, TextField, Grid, Card, CardContent, Button, Snackbar, Alert 
} from "@mui/material";
import axios from "axios";

export default function SearchBooks({ ufid }) {  
  console.log('ufid', ufid);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  // ✅ Fetch books from API when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8083/getAllBooks");
        setBooks(response.data.books || []); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Handle Book Loan
  const handleLoan = async (bookId) => {
    console.log('bookid', bookId);
    if (!ufid) {
      setNotification({ open: true, message: "User not logged in!", severity: "error" });
      return;
    }

    try {
      const payload = {
        ufid: ufid,    // ✅ Pass UFID from logged-in user
        bookid: bookId, // ✅ Include book ID in the payload
        issueDate: new Date().toISOString() 
      };
      
      console.log("Issuing book with payload:", payload);
      const response = await axios.post("http://localhost:8083/issueBook", payload, {
        headers: { "Content-Type": "application/json" }
      });

      // Update book copies count locally after a successful loan
      const updatedBooks = books.map((book) =>
        book.bookId === bookId && book.bookCount > 0
          ? { ...book, bookCount: book.bookCount - 1 }
          : book
      );
      setBooks(updatedBooks);

      // ✅ Show success notification
      setNotification({
        open: true,
        message: response.data.message || "Book successfully loaned! You have 14 days to return it.",
        severity: "success"
      });
    } catch (error) {
      console.error("Error loaning book:", error);
      setNotification({
        open: true,
        message: "Failed to loan book. Please try again.",
        severity: "error"
      });
    }
  };

  // ✅ Filter Books Based on Search
  const filteredBooks = books.filter((book) =>
    book.bookFullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ marginTop: "120px" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
        Search & Loan Books
      </Typography>

      {/* ✅ Notification */}
      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => setNotification({ open: false, message: "", severity: "success" })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%", textAlign: "center", fontSize: "1rem" }}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* ✅ Search Bar */}
      <TextField
        label="Search by Book Name"
        fullWidth
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* ✅ Book List */}
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.bookId}>
            {console.log(book)}
            <Card sx={{ transition: "0.3s", "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" } }}>
              <img 
                src={book.imageData || "https://via.placeholder.com/200"} 
                alt={book.bookFullName} 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{book.bookFullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  by {book.authorName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", color: book.bookCount > 0 ? "green" : "red" }}>
                  Copies Available: {book.bookCount}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, fontWeight: "bold" }}
                  disabled={book.bookCount === 0}
                  onClick={() => handleLoan(book.bookId)}
                >
                  {book.bookCount > 0 ? "Loan Book" : "Not Available"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
