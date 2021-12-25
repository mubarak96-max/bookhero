import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Home from './Home';
import SearchBook from './SearchBook';
import { Link } from '@mui/material';
import Upload from './CheckSimmilarities/CheckSimmillar';
import CheckTags from './CheckSimmilarities/CheckTags';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DisplayTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab label='Upload a BOOK' {...a11yProps(0)} />
          <Tab label='Search for books' {...a11yProps(1)} />
          <Tab label='Check Simmilars' {...a11yProps(2)} />
          <Tab label='Check Tags' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchBook />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Link to='/checksimillars' passHref>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: '100px',
              height: '40vh',
            }}>
            <Upload />
          </div>
        </Link>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CheckTags />
      </TabPanel>
    </Box>
  );
};

export default DisplayTabs;
