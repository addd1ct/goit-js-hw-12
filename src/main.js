import { fetchImages } from './js/pixabay-api.js';
import { renderImages, toggleLoadMoreButton, showEndMessage } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const loadMoreButton = document.querySelector('.load-more');
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');

  loadMoreButton.classList.add('is-hidden');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    currentQuery = input.value.trim();

    if (currentQuery === '') return;

    loadMoreButton.classList.add('is-hidden');

    currentPage = 1;
    document.querySelector('.images-container').innerHTML = '';

    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    renderImages(data.hits);
    if (data.hits.length >= 15) {
      loadMoreButton.classList.remove('is-hidden');
    }

    if (data.hits.length < 15) {
      loadMoreButton.classList.add('is-hidden');
      showEndMessage();
    }

    scrollPage();
  });

  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    const data = await fetchImages(currentQuery, currentPage);

    renderImages(data.hits);
    if (data.hits.length >= 15) {
      loadMoreButton.classList.remove('is-hidden');
    }

    if (data.hits.length < 15 || data.hits.length === totalHits) {
      loadMoreButton.classList.add('is-hidden');
      showEndMessage();
    }

    scrollPage();
  });
});

function scrollPage() {
  const imgCard = document.querySelector('.images-container img');
  if (imgCard) {
    const cardHeight = imgCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
