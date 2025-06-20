import { Tabs, Tab, Box } from "@mui/material";

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
        px: 1,
        py: 0.5,
        backgroundColor: 'white', // light blue container
        borderRadius: 2,
        overflowX: 'auto',
        mb:1
      }}
    >
      <Tabs
        value={currentValue}
        onChange={(_, val) => onChange(val)}
        TabIndicatorProps={{ sx: { display: 'none' } }} // remove underline
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 'unset',
          '& .MuiTabs-flexContainer': {
            display: 'flex',
            gap: '8px',
          },
          '& .MuiTab-root': {
            minHeight: 'unset',
            textTransform: 'none',
            fontSize: '13px',
            fontWeight: 500,
            padding: '4px 12px',
            borderRadius: '999px',
            transition: '0.2s',
            color: '#64748B', // Tailwind gray-500
            backgroundColor: 'transparent',
            '&.Mui-selected': {
              backgroundColor: '#48D56B',
              color: '#ffffff',
              fontWeight: 600,
            },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} disableRipple />
        ))}
      </Tabs>
    </Box>
  );
}
