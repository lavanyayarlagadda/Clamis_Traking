import { Tabs, Tab } from "@mui/material";

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
    <Tabs value={currentValue} onChange={(_, val) => onChange(val)}>
      {tabs.map((tab) => (
        <Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </Tabs>
  );
}