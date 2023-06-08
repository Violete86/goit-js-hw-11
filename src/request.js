import axios from 'axios';
// import Notiflix from 'notiflix';

export {searchParams, response}  ;

const searchParams = { BASE_URL: 'https://pixabay.com/api/',
API_KEY: '33056563-cc044f40a294fc1629405232d',
 parametres: 'image_type=photo&orientation=horizontal&safesearch=true',
 pageCount: 1,
 name: null,}

async function response(obj) { const resp = await axios.get(`${obj.BASE_URL}?key=${obj.API_KEY}&q=${obj.name}&${obj.parametres}&page=${obj.pageCount}&per_page=40`)
console.log(resp.data.hits);

return resp;}



