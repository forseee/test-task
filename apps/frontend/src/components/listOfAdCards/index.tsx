import React from 'react';
import { Box } from '@mui/material';
import AdCard from '../adCard';
import { IAd } from '../../api';
import Loader from '../loader';

import s from './style.module.scss';

import 'react-toastify/dist/ReactToastify.css';

interface ListOfAdCardsProps {
  listOfAds: Array<IAd> | null;
  isLoading: boolean;
  isError: boolean;
  likedItems: Array<string>;
  onClickLike: (id: string) => void;
}

export default function ListOfAdCards({
  listOfAds,
  likedItems,
  isLoading,
  isError,
  onClickLike,
}: ListOfAdCardsProps) {
  if (!listOfAds || isLoading) {
    return <Loader />;
  }

  return (
    <Box m="auto">
      <Box className={s.container}>
        {listOfAds.map((card) => (
          <AdCard
            card={card}
            onClickLike={onClickLike}
            likedItems={likedItems}
          />
        ))}
      </Box>
    </Box>
  );
}
