import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../Components/reusable/TextField";



const ResetPassword = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", });
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };



    const validate = () => {
        let isValid = true;
        const newErrors = { email: "", password: "", confirmPassword: "", };

        if (!form.email.trim()) {
            newErrors.email = "Username is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        if (!form.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        alert("Password reset successful!");
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
                    Reset Password
                </Typography>
                <Typography variant="subtitle2" gutterBottom textAlign="center" >
                    Enter your eamil and set a new password
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
                        <TextFieldComponent
                            label="New Password"
                            placeholder="Enter a new password"
                            type="password"
                            value={form.password}
                            onChange={handleChange("password")}
                            error={!!errors.password}
                            helperText={errors.password}
                            icon={<LockIcon fontSize="small" />}
                            required
                        />
                        <TextFieldComponent
                            label="Confirm Password"
                            placeholder="Enter a Confirm password"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            icon={<LockIcon fontSize="small" />}
                            required
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 3 }}>
                            Reset Password
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default ResetPassword;
