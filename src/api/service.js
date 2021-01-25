const getGalleryData = (searchQuery, page) => {
  const apiKey = '18800826-dac8e8a4f07b5aa1d9a1979b8';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => response.json());
};

const apiRes = {
  getGalleryData,
};

export default apiRes;
