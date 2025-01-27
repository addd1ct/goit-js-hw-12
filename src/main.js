import { fetchImages } from './js/pixabay-api.js';
import { renderImages, toggleLoadMoreButton } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let lightbox;
function initializeLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.images-container a');
  } else {
    lightbox.refresh();
  }
}

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const loader = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', () => {
  const loadMoreButton = document.querySelector('.load-more');
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');

  loadMoreButton.classList.add('is-hidden');
  loader.classList.add('is-hidden');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    currentQuery = input.value.trim();

    if (currentQuery === '') return;

    loadMoreButton.classList.add('is-hidden');
    loader.classList.remove('is-hidden');

    currentPage = 1;
    document.querySelector('.images-container').innerHTML = '';

    await fetchAndRenderImages(loader, loadMoreButton);

    loader.classList.add('is-hidden');
  });

  loadMoreButton.addEventListener('click', async function () {
    currentPage++;

    loader.classList.remove('is-hidden');

    await fetchAndRenderImages();

    loader.classList.add('is-hidden');
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
      initializeLightbox();
      if (currentPage * 15 >= data.totalHits) {
        toggleLoadMoreButton(false);
        showEndOfResultsMessage();
      } else {
        toggleLoadMoreButton(true);
      }
    }
  } catch (err) {
    console.error(err);
    showEndOfResultsMessage();
  } finally {
    loader.classList.add('is-hidden');
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

function showNoResultsMessage() {
      iziToast.show({
        title: 'Notice',
        message: "Sorry, there are no images matching your search query. Please try again.",
    });
}

function showEndOfResultsMessage() {
    iziToast.show({
        title: 'Notice',
        message: "We're sorry, but you've reached the end of search results.",
    });
}