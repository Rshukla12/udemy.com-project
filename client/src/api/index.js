import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/course/${id}`);
export const fetchPosts = (page) => API.get(`/course?page=${page}`);
export const fetchPostsByTag = (tag) => API.get(`/course/tag/${tag}`);
export const fetchPostsByCreator = (name) => API.get(`/course/instructor?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/search?searchQuery=${searchQuery.search || 'none'}`);
export const createPost = (newPost) => API.post('/course', newPost);
export const fetchWishlist = (id) => API.get('/wishlist');
export const addToWishlist = (id) => API.patch(`/wishlist/add`, {course_id: id});
export const removeFromWishlist = (id) => API.patch(`/wishlist/remove`, {course_id: id});
export const emptyWishlist = (id) => API.delete(`/wishlist`);
export const fetchCart = (id) => API.get('/cart');
export const addToCart = (id) => API.patch(`/cart/add`, {course_id: id});
export const removeFromCart = (id) => API.patch(`/cart/remove`, {course_id: id});
export const emptyCart = (id) => API.delete(`/cart`);
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// &tags=${searchQuery.tags} || none`