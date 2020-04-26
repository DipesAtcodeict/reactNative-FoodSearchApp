import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 1bwP7bggM8GIk7O2qI2U3RBZJyGPm0vpu3MoFLdbvLSXQz6-7rsdUw6d0M5prplcdxhe-FsxntojsFX9ODghbws1jn_GhJEbu6DC25QnFYX1PcMMfkafcGsnVQmjXnYx',
  },
});
