import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../Components/reusable/TextField";



const ForgotPassword = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "" });
    const [errors, setErrors] = useState({ email: "" });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };


    const validate = () => {
        let isValid = true;
        const newErrors = { email: "" };

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        alert("Email sent successful!");
        navigate("/login");
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
                    Forgot Password
                </Typography>
                <Typography variant="subtitle2" gutterBottom textAlign="center" >
                    Enter your email to receive reset instructions.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextFieldComponent
                            label="Email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange("email")}
                            error={!!errors.email}
                            helperText={errors.email}
                            icon={<EmailIcon fontSize="small" />}
                            required
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 3 }}>
                            Send Email
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
