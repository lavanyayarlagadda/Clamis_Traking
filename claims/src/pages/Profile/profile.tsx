import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Skeleton } from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../Components/reusable/TextField";
import { ButtonComponent } from "../../Components/reusable/Button";

const Profile = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "";
  const email = localStorage.getItem("email");





  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    displayName: "",
    phone: "",
  });

  const handlePersonalChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPersonalDetails({ ...personalDetails, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handlePasswordChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordDetails({ ...passwordDetails, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validatePersonalForm = () => {
    const newErrors: any = {};
    let isValid = true;

    // Regex patterns
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!personalDetails.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    } else if (!nameRegex.test(personalDetails.firstName)) {
      newErrors.firstName = "First Name must contain only letters";
      isValid = false;
    }

    if (!personalDetails.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    } else if (!nameRegex.test(personalDetails.lastName)) {
      newErrors.lastName = "Last Name must contain only letters";
      isValid = false;
    }

    if (!personalDetails.displayName.trim()) {
      newErrors.displayName = "Display Name is required";
      isValid = false;
    } else if (!phoneRegex.test(personalDetails.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
      isValid = false;
    }

    if (!personalDetails.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(personalDetails.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSavePersonal = async () => {
    if (validatePersonalForm()) {
      try {
        const response =({
          userId: Number(userId),

          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          displayName: personalDetails.displayName,
          phoneNumber: personalDetails.phone,
        });
        toast.success('Saved');
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  const handleSavePassword = async () => {
    if (validatePersonalForm()) {
      try {
        await ({
          userId: Number(userId),
          newPassword: passwordDetails.newPassword,
          oldPassword: passwordDetails.oldPassword,
        });

        toast.success(
          "Password reset successfully. You will be redirected to login. Please login with your new password."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Box>
      {/* Personal Details Card */}
      <Paper elevation={3} sx={{ borderRadius: "12px", p: 3, mb: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Person sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight={600}>
            Personal Details
          </Typography>
        </Box>
        <Grid container spacing={3}>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="First Name"
                  value={personalDetails.firstName}
                  onChange={handlePersonalChange("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Last Name"
                  value={personalDetails.lastName}
                  onChange={handlePersonalChange("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Display Name"
                  value={personalDetails.displayName}
                  onChange={handlePersonalChange("displayName")}
                  error={!!errors.displayName}
                  helperText={errors.displayName}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Email"
                  value={personalDetails.email}
                  onChange={() => {}}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Phone Number"
                  value={personalDetails.phone}
                  onChange={handlePersonalChange("phone")}
                  placeholder="+91 1234567891"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  icon={"+91"}
                />
              </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <ButtonComponent
            label="Save Changes"
            onClick={handleSavePersonal}
            loading={false}
            variant="contained"
            size="small"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          />
        </Box>
      </Paper>

      {/* Update Password Card */}
      <Paper elevation={3} sx={{ borderRadius: "12px", p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Lock sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight={600}>
            Update Password
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextFieldComponent
              label="Old Password"
              type="password"
              value={passwordDetails.oldPassword}
              onChange={handlePasswordChange("oldPassword")}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextFieldComponent
              label="New Password"
              type="password"
              value={passwordDetails.newPassword}
              onChange={handlePasswordChange("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextFieldComponent
              label="Confirm New Password"
              type="password"
              value={passwordDetails.confirmNewPassword}
              onChange={handlePasswordChange("confirmNewPassword")}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword}
              required
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end">
           <ButtonComponent
                  label="Save Changes"
                  onClick={handleSavePassword}
                  loading={false}
                  variant="contained"
                  size="small"
              sx={{
                width: { xs: "100%", sm: "auto" },
              }}
                />
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
