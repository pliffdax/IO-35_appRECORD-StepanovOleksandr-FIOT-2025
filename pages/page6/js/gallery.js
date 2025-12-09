const images = [
  {
    preview:
      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Нічне місто"
  },
  {
    preview:
      "https://images.pexels.com/photos/3493771/pexels-photo-3493771.jpeg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/3493771/pexels-photo-3493771.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Гори на світанку"
  },
  {
    preview:
      "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Лісова стежка"
  },
  {
    preview:
      "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Міст через річку"
  },
  {
    preview:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Поле лаванди"
  },
  {
    preview:
      "https://images.pexels.com/photos/34087/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    original:
      "https://images.pexels.com/photos/34087/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
    description: "Морське узбережжя"
  }
];

const galleryEl = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    )
    .join("");
}

// Рендеримо розмітку галереї
galleryEl.innerHTML = createGalleryMarkup(images);

// Обробка кліку по елементу галереї
galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const img = event.target;
  if (img.nodeName !== "IMG") {
    return;
  }

  const largeImageURL = img.dataset.source;
  const description = img.alt ?? "";

  const instance = basicLightbox.create(
    `<img src="${largeImageURL}" alt="${description}" />`
  );

  instance.show();
}
