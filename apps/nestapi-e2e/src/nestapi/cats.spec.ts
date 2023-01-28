import axios from 'axios';

describe('GET getTopFriendlyCatBreeds/', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/cats/getTopFriendlyCatBreeds`);

    expect(res.status).toBe(200);

    expect(res.data.length).toBeGreaterThan(0);
  });
});
