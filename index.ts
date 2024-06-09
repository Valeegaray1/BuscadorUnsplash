const accessKey = 't7Uvob5mz3cqkK0aBIRWTWhOoTT6Racwr9O5l2k-L7E'; // Your Unsplash access key here

interface UnsplashResponse {
  results: UnsplashImage[];
}

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
}

document.getElementById('searchButton')!.addEventListener('click', () => {
  const query = (document.getElementById('searchInput') as HTMLInputElement).value;
  if (query.trim() !== '') {
    searchImages(query);
  }
});


/*async function searchImages(query: string) {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
      const data: UnsplashResponse = await response.json();
      const limitedResults = data.results.slice(0, 5); 
      console.log(limitedResults.length); 
      displayImages(limitedResults);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }*/
  

async function searchImages(query: string) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
    const data: UnsplashResponse = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images: UnsplashImage[]) {
  const imageContainer = document.getElementById('imageContainer')!;
  imageContainer.innerHTML = '';
  
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.regular;
    imgElement.alt = image.id;
    imgElement.classList.add('image');
    imageContainer.appendChild(imgElement);
  });
}
