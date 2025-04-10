import React, { useState, useEffect } from "react";
import {
  Container, Typography, Grid, Card, CardContent, Divider, CircularProgress,
  Alert, Button, CardActions, Dialog, DialogTitle, DialogContent, Snackbar
} from "@mui/material";
import axios from "axios";
import BookForm from "../components/BookForm"; // adjust if path is different

export default function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get("http://localhost:8083/getAllBooks")
      .then(response => {
        setBooks(response.data.books || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      });
  };

  const deleteBook = (bookId) => {
    axios.delete(`http://localhost:8083/deleteBook/${bookId}`)
      .then(response => {
        if (response.status === 200) {
          setBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookId));
          alert('Book deleted successfully');
        }
      })
      .catch(error => {
        console.error("Error deleting book:", error);
        alert('Failed to delete book');
      });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditDialogOpen(true);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(prev =>
      prev.map(book => book.bookId === updatedBook.bookId ? { ...book, ...updatedBook } : book)
    );
    setEditDialogOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "120px", marginBottom: "50px" }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        Library Book Collection
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, textAlign: "center", color: "gray" }}>
        Explore the available books in the library
      </Typography>

      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>Loading books...</Typography>
        </div>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, textAlign: "center" }}>
          {error}
        </Alert>
      )}

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
                  <Divider sx={{ my: 2 }} />
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
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => deleteBook(book.bookId)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Book Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {editingBook && (
            <BookForm
              initialData={editingBook}
              onSubmit={handleUpdateBook}
              onClose={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Book updated successfully"
      />
    </Container>
  );
}
