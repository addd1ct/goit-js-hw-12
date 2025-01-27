import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function renderImages(images) {
  const imagesList = document.querySelector('.images-container');
  
  const markup = images.map(
    ({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => `
    <li class="image-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
        <div class="image-info">
            <p><span>Likes:</span> ${likes}</p>
            <p><span>Views:</span> ${views}</p>
            <p><span>Comments:</span> ${comments}</p>
            <p><span>Downloads:</span> ${downloads}</p>
        </div>
      </a>
    </li>
    `
  ).join('');

  imagesList.insertAdjacentHTML('beforeend', markup)
}



export function toggleLoadMoreButton(isVisible) {
  const loadMoreButton = document.querySelector('.load-more');
  if (isVisible) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
}

export function showNoResultsMessage() {
      iziToast.show({
        title: 'Notice',
        message: "Sorry, there are no images matching your search query. Please try again.",
    });
}

export function showEndOfResultsMessage() {
    iziToast.show({
        title: 'Notice',
        message: "We're sorry, but you've reached the end of search results.",
    });
}