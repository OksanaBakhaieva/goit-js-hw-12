export async function getImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';
    
  const res = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
    return res.data;
}


