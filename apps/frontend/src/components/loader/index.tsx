import React, { Box, CircularProgress } from '@mui/material';

const Loader = () => (
  <Box display="flex" sx={{ height: '100%' }}>
    <Box m="auto">
      <CircularProgress />
    </Box>
  </Box>
);

export default Loader;
