const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';

export function getImages({ query, page = 1, per_page }) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  
  return axios.get(url, {
    params: {
      page,
      per_page,
    }
  })
    .then(({data})=>data);
}
      


