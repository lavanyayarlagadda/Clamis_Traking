import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
  Link
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../Components/reusable/TextField";



const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, username: e.target.value }));
    setErrors((prev) => ({ ...prev, username: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validate = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const { username, password } = form;

    // ✅ Check hardcoded credentials
    if (username === "admin" && password === "admin") {
      const mockUser = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      };
      login(mockUser, "mock-token-123");
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
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
        <Typography variant="h5" gutterBottom textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextFieldComponent
              label="Email"
              placeholder="Enter your email"
              value={form.username}
              onChange={handleEmailChange}
              error={!!errors.username}
              helperText={errors.username}
              icon={<EmailIcon fontSize="small" />}
              required
            />
            <TextFieldComponent
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              icon={<LockIcon fontSize="small" />}
              required
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="/forgotPassword" fontSize="14px">
                Forgot Password?
              </Link>
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 3 }}>
              Sign In
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
