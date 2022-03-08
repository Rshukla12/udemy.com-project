/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { getPosts } from '../redux/actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ul:classes.ul}}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="secondary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
