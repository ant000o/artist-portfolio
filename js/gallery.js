let allArtworks = [];

const gallery = document.querySelector(".gallery-grid");

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