import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DropdownComponent, DropdownOption } from "../../Components/reusable/Dropdown";
import { ButtonComponent } from "../../Components/reusable/Button";
import TextFieldComponent from "../../Components/reusable/TextField"; // Assuming this is the correct default export

const roleOptions: DropdownOption[] = [
  { label: "User", value: "User" },
  { label: "Admin", value: "Admin" },
];

interface FormState {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  role: DropdownOption | null;
}

interface ValidationErrors {
  [key: string]: string;
}

const CreateUserForm = () => {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "+91",
    role: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (
    field: keyof FormState,
    value: string | DropdownOption | null
  ) => {
    setFormData({ ...formData, [field]: value as any });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+91\d{10}$/;

    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    }

    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid Indian phone number (e.g., +911234567890)";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submitted", formData);
      // Send data to API here
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={500}>
        Create New User
      </Typography>

      <Grid container spacing={2}>
        {/* First Name */}
        <Grid size={{xs:12,sm:6,md:4}}>
          <TextFieldComponent
            label="First Name"
            value={formData.firstName}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("firstName", val.target.value)
            }
            error={!!errors.firstName}
            helperText={errors.firstName}
            required={true}
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{xs:12,sm:6,md:4}}>
          <TextFieldComponent
            label="Last Name"
            value={formData.lastName}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("lastName", val.target.value)
            }
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Grid>

        {/* Display Name */}
        <Grid size={{xs:12,sm:6,md:4}}>

          <TextFieldComponent
            label="Display Name"
            value={formData.displayName}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("displayName", val.target.value)
            }
            error={!!errors.displayName}
            helperText={errors.displayName}
            required
          />
        </Grid>

        {/* Email */}
        <Grid size={{xs:12,sm:6,md:4}}>
          <TextFieldComponent
            label=" Email"
            value={formData.email}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("email", val.target.value)
            }
            error={!!errors.email}
            helperText={errors.email}
            type="email"
            required
          />
        </Grid>

        {/* Phone */}
        <Grid size={{xs:12,sm:6,md:4}}>
          <TextFieldComponent
            label="Phone Number"
            value={formData.phone}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("phone", val.target.value)
            }
            error={!!errors.phone}
            helperText={errors.phone}
            type="tel"
            required
          />
        </Grid>
        <Grid size={{xs:12,sm:6,md:4}}>
          <DropdownComponent
            label="Role"
            options={roleOptions}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            required={true}
              error={!!errors.role}
            helperText={errors.role}
          />
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <ButtonComponent
          label="Create User"
          variant="contained"
          loading={false}
          onClick={handleSubmit}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1,
            width: { xs: "100%", sm: "auto" },
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateUserForm;
