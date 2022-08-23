const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const apiKey = ''; //Input API key from Unsplash(can't share my private key)
const counter = 30;
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${counter}`

// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper Function to Set Attributes
function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and Photos
function displayPhotos(){
    // reset imagesLoaded to 0 every time we run this function so the if statement above can be true
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a> then inside imageContainer div
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catch Error
    }
}

// Check to see if scrolling near bottom of page,Load more Photos
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
   }
});


//On Load
getPhotos(); 