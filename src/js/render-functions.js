export function renderImages(images) {
  const container = document.querySelector('.images-container');
  
  images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.classList.add('image-card');
    
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    
    const imageInfo = document.createElement('div');
    imageInfo.classList.add('image-info');
    
    imageInfo.innerHTML = `
      <p><span>Likes:</span> ${image.likes}</p>
      <p><span>Views:</span> ${image.views}</p>
      <p><span>Comments:</span> ${image.comments}</p>
      <p><span>Downloads:</span> ${image.downloads}</p>
    `;
    
    imageCard.appendChild(imgElement);
    imageCard.appendChild(imageInfo);
    
    container.appendChild(imageCard);
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

export function showNoResultsMessage() {
  const container = document.querySelector('.container');
  const existingMessage = document.querySelector('.container p');

  if (existingMessage) {
    existingMessage.textContent = "Sorry, there are no images matching your search query. Please try again.";
  } else {
    const newMessage = document.createElement('p');
    newMessage.classList.add('no-results-message');
    newMessage.textContent = "Sorry, there are no images matching your search query. Please try again.";
    container.appendChild(newMessage);
  }
}

export function showEndOfResultsMessage() {
  const container = document.querySelector('.container');
  const existingMessage = document.querySelector('.container p');

  if (existingMessage) {
    existingMessage.textContent = "We're sorry, but you've reached the end of search results.";
  } else {
    const newMessage = document.createElement('p');
    newMessage.classList.add('end-of-results-message');
    newMessage.textContent = "We're sorry, but you've reached the end of search results.";
    container.appendChild(newMessage);
  }
}

export function clearMessages() {
  const messages = document.querySelectorAll('.container p');
  messages.forEach(message => message.remove());
}