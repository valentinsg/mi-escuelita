import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import AIFeedback from '../components/AIFeedback';
import ActivityView from '../components/ActivityView';
import ChildDashboard from '../components/ChildDashboard';
import ParentDashboard from '../components/ParentDashboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TabLayout: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="AI Feedback" />
          <Tab label="Actividades" />
          <Tab label="Dashboard Niño" />
          <Tab label="Dashboard Padre" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AIFeedback />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActivityView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChildDashboard onSubjectSelect={() => {}} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ParentDashboard onSubjectSelect={() => {}} />
      </TabPanel>
    </Box>
  );
};

export default TabLayout; 