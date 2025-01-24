import { fetchImages } from './js/pixabay-api.js';
import { renderImages, toggleLoadMoreButton, showNoResultsMessage, showEndOfResultsMessage, clearMessages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const loadMoreButton = document.querySelector('.load-more');
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');
  const loader = document.querySelector('.loader');

  loadMoreButton.classList.add('is-hidden');
  loader.style.display = 'none';

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    currentQuery = input.value.trim();

    if (currentQuery === '') return;

    loadMoreButton.classList.add('is-hidden');
    loader.style.display = 'block';

    currentPage = 1;
    document.querySelector('.images-container').innerHTML = '';

    clearMessages();

    await fetchAndRenderImages();

    loader.style.display = 'none';
  });

  loadMoreButton.addEventListener('click', async function () {
    currentPage++;

    loader.style.display = 'block';

    await fetchAndRenderImages();

    loader.style.display = 'none';

    scrollPage();
  });
});

async function fetchAndRenderImages() {
  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      showNoResultsMessage();
      toggleLoadMoreButton(false);
    } else {
      renderImages(data.hits);

      if (currentPage * 15 >= data.totalHits) {
        toggleLoadMoreButton(false);
        showEndOfResultsMessage();
      } else {
        toggleLoadMoreButton(true);
      }
    }
  } catch (error) {
    showEndOfResultsMessage();
  }
}

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