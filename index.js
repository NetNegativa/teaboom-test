document.addEventListener('DOMContentLoaded', () => {
  const packagingOptions = document.querySelectorAll('.packaging-option');
  const articleEl = document.getElementById('article');
  const currentPriceEl = document.getElementById('current-price');
  const oldPriceEl = document.getElementById('old-price');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(price);
  };
  packagingOptions.forEach(option => {
    option.addEventListener('click', () => {
      packagingOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      const article = option.getAttribute('data-article');
      const price = parseFloat(option.getAttribute('data-price'));
      const oldPrice = parseFloat(option.getAttribute('data-old-price'));
      const weight = option.getAttribute('data-weight');
      articleEl.textContent = article;
      currentPriceEl.textContent = formatPrice(price);
      oldPriceEl.textContent = formatPrice(oldPrice);
      document.querySelector('.product-card__image').alt = `Ананасовый улун, ${weight} г`;
    });
  });
  addToCartBtn.addEventListener('click', () => {
    const originalText = addToCartBtn.textContent;
    
    addToCartBtn.textContent = 'ДОБАВЛЕНО ✓';
    addToCartBtn.style.backgroundColor = 'var(--color-primary-hover)';
    
    setTimeout(() => {
      addToCartBtn.textContent = originalText;
      addToCartBtn.style.backgroundColor = '';
    }, 1500);
  });
});


const productImage = document.querySelector('.product-card__image');
const modal = document.getElementById('image-modal');
const modalImg = document.querySelector('.image-modal__img');
const closeModalBtn = document.querySelector('.image-modal__close');
const backdrop = document.querySelector('.image-modal__backdrop');

const openModal = () => {
  modalImg.src = productImage.src;
  modalImg.alt = productImage.alt;
  
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open'); 
};

const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open'); 
  
  setTimeout(() => {
    modalImg.src = ''; 
  }, 300);
};

productImage.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});



const favoriteBtn = document.getElementById('favorite-btn');
const PRODUCT_ID = 'ananasoviy-ulun'; 
const STORAGE_KEY = 'teaboom_favorites';

const getFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('localStorage недоступен');
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Не удалось сохранить в localStorage');
  }
};


const updateFavoriteUI = (isFavorite) => {
  if (isFavorite) {
    favoriteBtn.classList.add('is-active');
    favoriteBtn.setAttribute('aria-label', 'Удалить из избранного');
  } else {
    favoriteBtn.classList.remove('is-active');
    favoriteBtn.setAttribute('aria-label', 'Добавить в избранное');
  }
};


const initialFavorites = getFavorites();
const isInitiallyFavorite = initialFavorites.includes(PRODUCT_ID);
updateFavoriteUI(isInitiallyFavorite);


favoriteBtn.addEventListener('click', () => {
  let currentFavorites = getFavorites();
  const index = currentFavorites.indexOf(PRODUCT_ID);

  if (index === -1) {
    currentFavorites.push(PRODUCT_ID);
    favoriteBtn.classList.add('pop');
    setTimeout(() => favoriteBtn.classList.remove('pop'), 350);
  } else {
    currentFavorites.splice(index, 1);
  }
  saveFavorites(currentFavorites);
  updateFavoriteUI(index === -1); 
});