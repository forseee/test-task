'use client';

import React, { useLayoutEffect, useState } from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
import useApi from '../../hooks/useAds';
import { IAd, IResponce } from '../../api';
import ListOfAdCards from '../../components/listOfAdCards';
import DialogWithFilters from '../../components/dialodWithFilters';

const ListWithFilter = () => {
  const [params, setParams] = useState<Record<
    string,
    FormDataEntryValue | null
  > | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useApi<IResponce<IAd>>('/api/ads', {
    params,
  });
  const [likedItems, setLikedItems] = useState<Array<string>>([]);

  useLayoutEffect(() => {
    const likes = localStorage.getItem('likes');
    if (likes) {
      setLikedItems([...JSON.parse(likes)]);
    }
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSetOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnClickLike = (id: string) => {
    const likes = localStorage.getItem('likes');
    if (likes) {
      const parseLikes = JSON.parse(likes);
      const changedSet = new Set([...parseLikes]).add(id);
      localStorage.setItem('likes', JSON.stringify([...changedSet]));
      setLikedItems((items) => {
        const newLikes = [...items];
        newLikes.push(id);
        return newLikes;
      });
    } else {
      const set = new Set([id]);
      localStorage.setItem('likes', JSON.stringify([...set]));
      setLikedItems(() => {
        const newLikes = [id];
        return newLikes;
      });
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2.5}
          py={2.5}
        >
          <Typography variant="h5">List of ads</Typography>
          <Button variant="outlined" onClick={handleSetOpenDialog}>
            Filters
          </Button>
        </Box>
        <ListOfAdCards
          listOfAds={data && data.results}
          likedItems={likedItems}
          isLoading={isLoading}
          onClickLike={handleOnClickLike}
        />
        <DialogWithFilters
          open={openDialog}
          onClose={handleClose}
          setFilters={setParams}
        />
      </Box>
    </Container>
  );
};

export default ListWithFilter;
