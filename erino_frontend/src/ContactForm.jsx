import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    TextField,
    Typography,
    Card as MuiCard,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Delete, Edit } from "@mui/icons-material";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "400px",
    },
}));

const RegisterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
}));

export default function Register() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [jobtitle, setJobtitle] = useState("");
    const [users, setUsers] = useState([]);
    const [editinguserID, setEditinguserID] = useState(null);

    // Fetch users from the backend
    const fetchUsers = () => {
        axios
            .get("http://localhost:3000/contacts")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setJobtitle("");
        setEditinguserID(null);
    };

    const handleRegister = () => {
        if (editinguserID) {
            // Update user
            axios
                .put(`http://localhost:3000/contacts/${editinguserID}`, {
                    firstname,
                    lastname,
                    email,
                    phone,
                    company,
                    jobtitle,
                })
                .then(() => {
                    alert("User updated successfully!");
                    fetchUsers(); // Refresh the user list
                    resetForm();
                })
                .catch((error) => console.error("Error updating user:", error));
        } else {
            // Add new user
            axios
                .post("http://localhost:3000/contacts", {
                    firstname,
                    lastname,
                    email,
                    phone,
                    company,
                    jobtitle,
                })
                .then((response) => {
                    alert("User registered successfully!");
                    setUsers([...users, response.data]); // Add new user to the list
                    resetForm();
                })
                .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        alert("This user already exists!");
                    } else {
                        console.error("Error adding user:", error);
                    }
                });
        }
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/contacts/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user._id !== id));
                alert("User deleted successfully!");
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    const handleEdit = (user) => {
        setEditinguserID(user._id);
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
        setPhone(user.phone);
        setCompany(user.company);
        setJobtitle(user.jobtitle);
    };

    return (
        <RegisterContainer>
            {/* User Form */}
            <Card variant="outlined">
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    User Form
                </Typography>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    label="Company"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    label="Job Title"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={jobtitle}
                    onChange={(e) => setJobtitle(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    sx={{ mt: 2, backgroundColor: "#4CAF50" }}
                >
                    {editinguserID ? "Update" : "Register"}
                </Button>
            </Card>

            {/* Users Table */}
            <TableContainer component={Paper} sx={{ flex: 1, maxWidth: "800px", overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.firstname}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.company}</TableCell>
                                    <TableCell>{user.jobtitle}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(user)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(user._id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RegisterContainer>
    );
}
