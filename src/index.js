//import axios from 'axios';
import Notiflix from 'notiflix';
import { response, searchParams } from './request';

const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('input')

const galleryEl = document.querySelector('.gallery')
const loadMoreEl = document.querySelector('.load-more')

loadMoreEl.style.display = 'none'
formEl.addEventListener('submit', fetchPhotos)

async function fetchPhotos(e) {
    e.preventDefault()
    pageCount = 1
    searchParams.name = inputEl.value.trim()


    try {
  const respData =  await response(searchParams)
        const arr = respData.data.hits
        // console.log(arr);
        // console.log(createMarkup(arr));
        const markup = createMarkup(arr)
        // console.log(markup);
        // console.log(respData.data.totalHits );
        if (respData.data.totalHits === 0) {
            throw new Error()
        } else if(searchParams.name.length === 0){
            Notiflix.Notify.info('oops');
        }
        else if (respData.data.totalHits <= pageCount * 40) {
            galleryEl.innerHTML = markup
            loadMoreEl.style.display = 'none'
            inputEl.value = ''
        }
        else {
            Notiflix.Notify.success(`Hooray! We found ${respData.data.total} images.`);
            galleryEl.innerHTML = markup
            loadMoreEl.style.display = 'block'
            inputEl.value = ''
        }
    } catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        console.log(error);
        galleryEl.innerHTML = ''
        loadMoreEl.style.display = 'none'
    }
};

function createMarkup(arr) {
    const galleryItemMarkup = arr.map(
        ({ webformatURL, tags, likes, views, comments, downloads, }) => {
        return `
        <div class="photo-card">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width=300/>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b>${likes}
            </p>
            <p class="info-item">
            <b>Views: </b>${views}
            </p>
            <p class="info-item">
            <b>Comments: </b>${comments}
            </p>
            <p class="info-item">
            <b>Downloads: </b>${downloads}
            </p>
        </div>
        </div>`
        }).join('')
    
    return galleryItemMarkup
}


async function onLoadMoreClick() {
    pageCount += 1

    try {
        const respData =  await response(searchParams)
        const arr = respData.data.hits
        // console.log(arr);
        // console.log(createMarkup(arr));
        const markup = createMarkup(arr)
    galleryEl.insertAdjacentHTML('beforeend',markup)
    if (respData.data.totalHits <= pageCount * 40) {
        loadMoreEl.style.display = 'none'
        Notiflix.Notify.failure('Sorry, there are no more images.')
    }

    }
    catch (error) {
        Notiflix.Notify.failure('Sorry, there are no more images.')

    }
}

loadMoreEl.addEventListener('click', onLoadMoreClick)

