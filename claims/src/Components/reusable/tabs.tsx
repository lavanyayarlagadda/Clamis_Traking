import { Tabs, Tab, Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animation for fluid click effect
const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
`;

interface TabItem {
  label: string;
  value: string;
}

interface DynamicTabsProps {
  tabs: TabItem[];
  currentValue: string;
  onChange: (val: string) => void;
  width?: string | number;
}

export function DynamicTabs({
  tabs,
  currentValue,
  onChange,
  width = 'auto',
}: DynamicTabsProps) {
  return (
    <Box
      sx={{
        width,
        maxWidth: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        px: 0.5, // Increased container padding
        py: 0.5,   // Increased container padding
        backgroundColor: '#F8FAFC', // Light gray background for better contrast
        borderRadius: 2,
        overflowX: 'auto',
        mb: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' // Subtle shadow for depth
      }}
    >
      <Tabs
        value={currentValue}
        onChange={(_, val) => onChange(val)}
        TabIndicatorProps={{ sx: { display: 'none' } }}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 'unset',
          '& .MuiTabs-flexContainer': {
            display: 'flex',
            gap: '6px', // Increased gap between tabs
          },
          '& .MuiTab-root': {
            minHeight: 'unset',
            minWidth: 'unset',
            textTransform: 'none',
            fontSize: '14px', // Slightly larger font
            fontWeight: 600,
            padding: '8px 12px', // Increased padding (40px min touch target)
            borderRadius: '8px', // Slightly less rounded than pill shape
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition
            color: '#334155', // slate-700 - higher contrast
            backgroundColor: 'transparent',
            position: 'relative', // For ripple effect
            overflow: 'hidden', // For ripple effect
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '5px',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.6)',
              opacity: 0,
              borderRadius: '100%',
              transform: 'translate(-50%, -50%)',
            },
            '&:active::after': {
              animation: `${ripple} 0.6s ease-out`,
            },
            '&.Mui-selected': {
              backgroundColor: '#1D4ED8', // blue-700 - AAA contrast with white
              color: '#FFFFFF', // Pure white for max contrast
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(29, 78, 216, 0.3)',
            },
            '&:hover': {
              backgroundColor: '#EFF6FF', // blue-50
              color: '#1D4ED8', // blue-700 on hover
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#1E40AF', // blue-800 - even darker for selected hover
            }
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab 
            key={tab.value} 
            label={tab.label} 
            value={tab.value} 
            disableRipple // We're implementing our own ripple
          />
        ))}
      </Tabs>
    </Box>
  );
}
