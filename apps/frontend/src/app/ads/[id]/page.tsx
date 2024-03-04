'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import { IAd } from '../../../api/index';
import useApi from '../../../hooks/useAds';
import Carousel from '../../../components/carousel';
import Loader from '../../../components/loader';

interface AdDetailsPtops {
  params: {
    id: string;
  };
}

const AdDetails: React.FC<AdDetailsPtops> = ({ params }) => {
  const { data, isLoading } = useApi<IAd>(`/api/ads/${params.id}`);

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Carousel images={data.images} />
      <Box marginTop={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2.5}
        >
          <Typography variant="h4">{data.title}</Typography>
          <Button variant="outlined" color="error">
            Like
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={2.5}>
          <Typography variant="h6">
            {data.city_name} , {data.district_name}
          </Typography>
          <Typography variant="h5" marginRight={1}>
            {data.price}
          </Typography>
        </Box>
        <Typography
          marginTop={2}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </Box>
    </Container>
  );
};

export default AdDetails;
