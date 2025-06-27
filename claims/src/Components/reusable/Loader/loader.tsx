// components/common/HealthcareLoader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; // Pulse icon
import '../../../index.css'; // or './App.css'
import { MedicalInformation } from '@mui/icons-material';


interface HealthcareLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'cross' | 'heart' | 'pulse';
  text?: string;
}

const sizeMap: Record<NonNullable<HealthcareLoaderProps['size']>, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const Loader = ({
  size = 'md',
  variant = 'cross',
  text = 'Loading...',
}: HealthcareLoaderProps) => {
  const iconSize = sizeMap[size];

  const textSize = size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem';

  if (variant === 'cross') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box position="relative" width={iconSize} height={iconSize}>
          {/* Spinner ring */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              border: '4px solid',
              borderColor: 'primary.light transparent primary.main transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          {/* Center Cross */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1.5s infinite',
            }}
          >
            <LocalHospitalIcon color="primary" sx={{ fontSize: iconSize * 0.6 }} />
          </Box>
        </Box>
        {text && (
          <Typography
            color="primary"
            fontWeight={500}
            fontSize={textSize}
            sx={{ animation: 'pulse 2s infinite' }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'heart') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box position="relative" display="flex" justifyContent="center">
          <MonitorHeartIcon
            sx={{
              fontSize: iconSize,
              color: 'blue',
              animation: 'pulse 1.2s infinite',
            }}
          />
        </Box>
        {text && (
          <Typography
            color="blue"
            fontWeight={500}
            fontSize={textSize}
            sx={{ animation: 'pulse 2s infinite' }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'pulse') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box position="relative" width={iconSize} height={iconSize}>
          <MonitorHeartIcon
            sx={{
              fontSize: iconSize,
              color: 'success.main',
              animation: 'pulse 1.2s infinite',
            }}
          />
          {/* Pulse waves */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'success.light',
              animation: 'ping 2s infinite',
              opacity: 0.3,
            }}
          />
        </Box>
        {text && (
          <Typography
            color="success.main"
            fontWeight={500}
            fontSize={textSize}
            sx={{ animation: 'pulse 2s infinite' }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  return null;
};

export default Loader;
