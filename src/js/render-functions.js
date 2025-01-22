import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox = null;

export function renderImages(images) {
  const container = document.querySelector('.images-container');
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    container.appendChild(imgElement);
  });
}

export function toggleLoadMoreButton(isVisible) {
  const loadMoreButton = document.querySelector('.load-more');
  if (isVisible) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
}

export function showEndMessage() {
  const container = document.querySelector('.container');
  const endMessage = document.createElement('p');
  endMessage.textContent = "We're sorry, but you've reached the end of search results.";
  container.appendChild(endMessage);
}
