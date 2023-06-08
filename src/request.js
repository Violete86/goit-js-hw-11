import axios from 'axios';
import Notiflix from 'notiflix';

export {fetchPhotos, onLoadMoreClick};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33056563-cc044f40a294fc1629405232d';
const parametres = 'image_type=photo&orientation=horizontal&safesearch=true';
let pageCount = 1
let name = null;

const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${name}&${parametres}&page=${pageCount}&per_page=40`)
console.log(response.data);


