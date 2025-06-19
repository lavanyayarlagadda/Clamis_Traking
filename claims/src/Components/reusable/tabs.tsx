import { Tabs, Tab, Box } from "@mui/material";

interface TabItem {
  label: string;
  value: string;
}

export function DynamicTabs({
  tabs,
  currentValue,
  onChange,
}: {
  tabs: TabItem[];
  currentValue: string;
  onChange: (val: string) => void;
}) {
  return (
    // <Tabs value={currentValue} onChange={(_, val) => onChange(val)}>
    //   {tabs.map((tab) => (
    //     <Tab key={tab.value} label={tab.label} value={tab.value} />
    //   ))}
    // </Tabs>
     <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        px: 2,
        py: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginBottom:"20px"
      }}
    >
      <Tabs
        value={currentValue}
        onChange={(_, val) => onChange(val)}
        textColor="primary"
        indicatorColor="primary"
        TabIndicatorProps={{
          sx: {
            height: '4px',
            borderRadius: '4px',
          },
        }}
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            px: 2,
            py: 1,
            color: '#374151',
            '&.Mui-selected': {
              color: '#1d4ed8',
            },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </Box>
  );
}