import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Button, TextField, Typography, Card as MuiCard, Box } from "@mui/material";
import { styled } from "@mui/system";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const RegisterContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
        backgroundImage:
            "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
}));

export default function Register() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [jobtitle, setJobtitle] = useState("");

    return (
        <RegisterContainer>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ textAlign: "center", fontSize: "clamp(1.8rem, 8vw, 2.15rem)" }}
                >
                    Complete the User Form
                </Typography>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    label="Company"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    label="Job Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobtitle}
                    onChange={(e) => setJobtitle(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    // onClick={()=>{
                    //     axios.post("http://localhost:3000/ngo/register", {
                    //         name:name,
                    //         email:email,
                    //         address:address,
                    //         location:location,
                    //         phone:phone,
                    //         password:password
                    //     }).then((response)=>{
                    //         console.log(response.data);
                    //         if(response.status == 205){
                    //             alert("this ngo exists already!!")
                    //         }
                    //         else{
                    //             alert('registered ngo successfully!!!');
                    //         }
                    //     }).then(handleregister);
                    // }}
                    style={{ marginTop: 20, backgroundColor: "#4CAF50" }}
                >
                    Register
                </Button>
            </Card>
        </RegisterContainer>
    )
}
