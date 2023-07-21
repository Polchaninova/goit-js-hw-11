import { fetchImages } from './js/fetchAPI';
import { DEFAULT_PAGE } from './js/fetchAPI';
import { page } from './js/fetchAPI';
import { createMarkup } from './js/renderCard';
import Notiflix from 'notiflix';
import { photo__card } from './js/renderCard';


const formBoxes = document.querySelector('.search-form');
const containerCard = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let imagesName = ''

const resetPage = () => {
  page = DEFAULT_PAGE;
};

formBoxes.addEventListener('submit', onSubmitForm)

//
function onSubmitForm(e) {
  e.preventDefault()
  imagesName = e.currentTarget.elements.searchQuery.value;

  resetPage()
  btnLoadMore.classList.remove('is-visible')
  fetchImages(imagesName)
    .then(({ imagesWay, isLastPage, totalHits }) => {
      //  if request with data is Empty
      const dataEmpty = totalHits === 0;
      if (dataEmpty) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
      }
      // success accept
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      containerCard.innerHTML = createMarkup(imagesWay);
      btnLoadMore.classList.add('is-visible')
      photo__card.refresh()

      // if is Last Page
      // if (isLastPage) {
      //   btnLoadMore.classList.remove('is-visible')
      //   Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      // }
    })
    .catch(error => (console.log(error)))
    .finally()
}
// more image
  btnLoadMore.addEventListener('click', () =>
    fetchImages(imagesName).then(({ imagesWay, isLastPage }) => {
      page += 1
      containerCard.insertAdjacentHTML('beforeend', createMarkup(imagesWay))

      if (isLastPage) {
        btnLoadMore.classList.remove('is-visible')
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
      photo__card.refresh()
    })
  )















// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api',
//   params: {
//     key: '38349487-797b5deb970457741df4d2220',
//     q: { imagesName },
//     type_image: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   }
// });
