import axios from 'axios';
const DEFAULT_PAGE = 1
let page = DEFAULT_PAGE;


function fetchImages(imagesName) {
  return axios.get(`https://pixabay.com/api/?key=38349487-797b5deb970457741df4d2220&q=${imagesName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then(response => {
      return response.data
    })
    .then(data => {
      page += 1;
      return {
        imagesWay: data.hits,
        isLastPage: page >= data.totalHits,
        totalHits: data.totalHits
      }
    })
}

export { fetchImages, DEFAULT_PAGE, page }