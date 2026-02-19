let allArtworks = [];

const gallery = document.querySelector(".gallery-grid");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content")
const modalImage = document.querySelector(".modal-image");
const modalInfo = document.querySelector(".modal-info");

gallery.innerHTML = '';


function renderArtworks(artworksArray){
  
  artworksArray.forEach((artwork) => {
    const article = document.createElement('article')
    article.className = 'artwork'
    
    const drawing = document.createElement('img')
    
    
    drawing.dataset.id = artwork.id;
    drawing.dataset.title = artwork.title
    drawing.dataset.description = artwork.description
    drawing.dataset.date = artwork.date
    drawing.dataset.image = artwork.image
    
    drawing.src = `${artwork.image}`
    drawing.alt = artwork.description


    article.appendChild(drawing)
    gallery.appendChild(article)

  })
}

fetch('./data/artworks.json') // obtenemos el archivo data.json
  .then((response) => {
    // convertimos la respuesta a JSON
    return response.json()
  })
  .then((artworks) => {
    // guardamos los datos originales
    allArtworks = artworks;

    // pintamos todo por primera vez
    renderArtworks(allArtworks);
  })


  
gallery.addEventListener('click', (event) => {
  const img = event.target.closest('.artwork img');
  
  if (!img) return;
  
  // console.log(img)
  
  requestAnimationFrame(() => {
    modal.classList.add('modal-open')
  })

  
  const imgElement = document.createElement('img');
  imgElement.src = `${img.dataset.image}`


  imgElement.addEventListener('load', () => {
    if(imgElement.naturalWidth > imgElement.naturalHeight){
      modalContent.classList.add('horizontal')
    }else{
      modalContent.classList.remove('horizontal')
    }
  })
  
  const title = document.createElement('h2')
  title.textContent = `${img.dataset.title}`
  
  const description = document.createElement('p')
  description.textContent = `${img.dataset.description}`
  description.classList.add('description')
  
  const date = document.createElement('small')
  date.textContent = `${img.dataset.date}`
  date.classList.add('date')
  
  // console.log(imgElement)

  modalImage.innerHTML = '';
  modalInfo.innerHTML = '';

  document.body.style.overflow = "hidden"

  modalImage.appendChild(imgElement)
  modalInfo.append(title, description, date)
})


modal.addEventListener('click', (event) => {
  const modalContent = event.target.closest('.modal-content')
  const modalClose = event.target.closest('.modal-close')

  if (!modalContent || modalClose){
    modal.classList.remove('modal-open')
    document.body.style.overflow = ""
  } else {
    return
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === "Escape"){
    modal.classList.remove('modal-open')
    document.body.style.overflow = ""
  } else {
    return
  }
})