import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function createMarkup(images) {
  return images.map(({ webformatURL, largeImageURL, likes, tags, views, comments, downloads }) => `
  <div class="photo__card">
  <a class="photo__link"
  href="${largeImageURL}">
  <img loading="lazy"
  src="${webformatURL}"
  alt="${tags}" class="img" />
 </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <b>${likes}👍</b>
        </p>
        <p class="info-item">
          <b>Views</b>
          <b>${views}👀</b>
        </p>
        <p class="info-item">
        <b>Comments</b>
          <b>${comments}💬</b>
        </p>
        <p class="info-item">
          <b>Download</b>
          <b>${downloads}</b>
        </p>
      </div>

    </div>`
  ).join('')
}
const photo__card = new SimpleLightbox('.photo__card a', { captionsData: "alt", captionDelay: 250, captionPosition: 'bottom' });


export { createMarkup, photo__card }