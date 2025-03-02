import React, { useState } from "react";
import { 
  Container, Typography, TextField, Button, Grid, Card, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBook() {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({
    bookId: "", // Unique Book ID
    bookFullName: "", // Corrected field for title
    authorName: "", // Corrected field for author
    bookCount: "", // Corrected field for copies
    bookType: "", // Corrected field for genre
    imageData: null // File instead of URL
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const genres = ["Computer Science", "Programming", "Fiction", "Non-Fiction", "Science", "Mathematics", "History"];

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Convert Image to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewBook(prevBook => ({ ...prevBook, imageData: reader.result }));
        console.log("Image Converted:", reader.result);
      };
    }
  };

  // Generate a unique Book ID (if not provided)
  const generateBookId = () => {
    return `B${Math.floor(1000 + Math.random() * 9000)}`; // Example: B1372
  };

  // Send Data to API
  const handleAddBook = async () => {
    console.log("New Book Data:", newBook);

    const bookCountNumber = parseInt(newBook.bookCount, 10);

    if (
      !newBook.bookFullName.trim() || 
      !newBook.authorName.trim() || 
      !newBook.bookType || 
      !newBook.imageData || 
      isNaN(bookCountNumber) || bookCountNumber <= 0
    ) {
      console.log("Validation Failed!");
      setNotification({ open: true, message: "Please enter valid book details!", severity: "error" });
      return;
    }

    const bookData = {
      bookId: newBook.bookId.trim() || generateBookId(), // Ensure Book ID
      bookFullName: newBook.bookFullName.trim(),
      authorName: newBook.authorName.trim(),
      bookCount: bookCountNumber,
      bookType: newBook.bookType,
      imageData: newBook.imageData // Base64 Image
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8083/addBook", bookData, {
        headers: { "Content-Type": "application/json" }
      });

      setNotification({ open: true, message: "Book added successfully! Redirecting...", severity: "success" });
      console.log("API Response:", response.data);

      // Wait for 2 seconds and redirect to /admin/view-books
      setTimeout(() => {
        navigate("/admin/view-books");
      }, 2000);

      // Reset form
      setNewBook({ bookId: "", bookFullName: "", authorName: "", bookCount: "", bookType: "", imageData: null });
      setLoading(false);
    } catch (error) {
      console.error("Error adding book:", error);
      setNotification({ open: true, message: "Failed to add book. Please try again.", severity: "error" });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
        Admin - Add Books
      </Typography>

      {/* ✅ Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() => setNotification({ open: false, message: "", severity: "success" })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Book Form */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Add a New Book</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Book ID (Auto-Generated if Empty)"
              fullWidth
              name="bookId"
              value={newBook.bookId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Book Title"
              fullWidth
              name="bookFullName"
              value={newBook.bookFullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Author"
              fullWidth
              name="authorName"
              value={newBook.authorName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Copies"
              fullWidth
              type="number"
              name="bookCount"
              value={newBook.bookCount}
              onChange={(e) => setNewBook({ ...newBook, bookCount: e.target.value.replace(/\D/g, "") })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Book Type</InputLabel>
              <Select
                name="bookType"
                value={newBook.bookType}
                onChange={handleChange}
              >
                {genres.map((genre, index) => (
                  <MenuItem key={index} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              Upload Cover Image
              <input 
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {newBook.imageData && (
              <img src={newBook.imageData} alt="Preview" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleAddBook}
              sx={{ fontWeight: "bold" }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Book"}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
