import * as React from 'react';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const RatingComponent = ({rating, noOfRatings}) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
    >
      <Typography variant="body2" sx={{color: "#BB690E", fontWeight: 600}}>
        {rating}
      </Typography>
      <Rating
        name="read-only"
        value={rating}
        readOnly
        precision={0.1}
        size="small"
      />
      <Typography variant="body2" color="text.secondary">
        ({noOfRatings})
      </Typography>

    </Stack>
  );
};

export default RatingComponent;