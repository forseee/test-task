/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IAd } from '../../api';

import s from './style.module.scss';

interface AdCardPtops {
  card: IAd;
  onClickLike: (id: string) => void;
  likedItems: Array<string>;
}

export default function AdCard({ card, onClickLike, likedItems }: AdCardPtops) {
  const router = useRouter();
  const handleLike = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    onClickLike(id);
  };

  const handleOnClick = (id: string) => {
    router.push(`/ads/${id}`);
  };

  const liked = likedItems.some((item) => item === card.id);

  return (
    <Box className={s.box} key={card.id} onClick={() => handleOnClick(card.id)}>
      <img className={s.img} src={card.images[0].thumbnail} alt="" />
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2.5}
          mb={2.5}
        >
          <Typography noWrap overflow="hidden" textOverflow="ellipsis">
            {card.title}
          </Typography>
          <Button
            variant={liked ? 'contained' : 'outlined'}
            color={liked ? 'error' : 'primary'}
            onClick={(e) => handleLike(e, card.id)}
          >
            {liked ? 'Unlike' : 'Like'}
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={2.5}>
          <Typography noWrap overflow="hidden" textOverflow="ellipsis">
            {card.city_name}
          </Typography>
          <Typography>{card.price}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
