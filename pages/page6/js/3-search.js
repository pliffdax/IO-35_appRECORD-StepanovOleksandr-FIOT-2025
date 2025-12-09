const API_KEY = "YOUR_PIXABAY_API_KEY";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;

const form = document.querySelector(".search-form");
const queryInput = form.elements.query;
const gallery = document.querySelector(".search-gallery");
const loader = document.querySelector(".loader");

let lightbox = null;

form.addEventListener("submit", onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();

  const query = queryInput.value.trim();

  if (query === "") {
    iziToast.warning({
      title: "Увага",
      message: "Введіть, будь ласка, ключове слово для пошуку",
      position: "topRight"
    });
    return;
  }

  clearGallery();

  showLoader();

  fetchImages(query)
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.info({
          title: "Результати",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight"
        });
        return;
      }

      const markup = createGalleryMarkup(data.hits);
      gallery.innerHTML = markup;

      if (!lightbox) {
        lightbox = new SimpleLightbox(".search-gallery a", {
          captionsData: "alt",
          captionDelay: 250
        });
      } else {
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.error("Помилка запиту:", error);
      iziToast.error({
        title: "Помилка",
        message: "Сталася помилка під час завантаження зображень",
        position: "topRight"
      });
    })
    .finally(() => {
      hideLoader();
    });
}

function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: PER_PAGE
  });

  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  });
}

function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      }) => `
      <li class="gallery__item">
        <a class="photo-card__thumb" href="${largeImageURL}">
          <img
            class="photo-card__image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          />
        </a>
        <div class="photo-card__info">
          <div class="photo-card__info-item">
            <span class="photo-card__label">Likes</span>
            <span class="photo-card__value">${likes}</span>
          </div>
          <div class="photo-card__info-item">
            <span class="photo-card__label">Views</span>
            <span class="photo-card__value">${views}</span>
          </div>
          <div class="photo-card__info-item">
            <span class="photo-card__label">Comments</span>
            <span class="photo-card__value">${comments}</span>
          </div>
          <div class="photo-card__info-item">
            <span class="photo-card__label">Downloads</span>
            <span class="photo-card__value">${downloads}</span>
          </div>
        </div>
      </li>
    `
    )
    .join("");
}

function clearGallery() {
  gallery.innerHTML = "";
}

function showLoader() {
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
}
