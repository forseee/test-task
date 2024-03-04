import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

import s from './style.module.scss';

const FormFieldNames = {
  search: 'search',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  city: 'city',
  district: 'district',
};

export interface DialogWithFiltersProps {
  open: boolean;
  onClose: () => void;
  setFilters: (filters: Record<string, FormDataEntryValue | null>) => void;
}

const DialogWithFilters: React.FC<DialogWithFiltersProps> = ({
  open,
  onClose,
  setFilters,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const search = data.get(FormFieldNames.search);
    const minPrice = data.get(FormFieldNames.minPrice);
    const maxPrice = data.get(FormFieldNames.maxPrice);
    const city = data.get(FormFieldNames.city);
    const districe = data.get(FormFieldNames.district);

    setFilters({
      search: search || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      city: city || null,
      districe: districe || null,
    });
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <form className={s.form} onSubmit={handleSubmit}>
          <TextField
            type="string"
            label="Search"
            name={FormFieldNames.search}
          />
          <TextField
            type="number"
            label="Min Price"
            name={FormFieldNames.minPrice}
          />
          <TextField
            type="number"
            label="Max Price"
            name={FormFieldNames.maxPrice}
          />
          <TextField type="string" label="City" name={FormFieldNames.city} />
          <TextField
            type="string"
            label="District"
            name={FormFieldNames.district}
          />
          <Button variant="outlined" type="submit">
            Use filters
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithFilters;
