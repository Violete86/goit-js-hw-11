import axios from 'axios';
// import Notiflix from 'notiflix';

export {searchParams, response}  ;

const searchParams = { BASE_URL: 'https://pixabay.com/api/',
API_KEY: '33056563-cc044f40a294fc1629405232d',
 parametres: 'image_type=photo&orientation=horizontal&safesearch=true',
 pageCount: 1,
 name: null,}

async function response(obj) {await axios.get(`${searchParams.BASE_URL}?key=${searchParams.API_KEY}&q=${searchParams.name}&${searchParams.parametres}&page=${searchParams.pageCount}&per_page=40`)
}console.log(response.data);


