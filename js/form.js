const form = document.querySelector("form");
const successMessage = document.querySelector(".form-success")

form.addEventListener('submit', (event) => {
    event.preventDefault()

    successMessage.textContent = "Thank you! Your commission request has been sent."

    const formData = new FormData(form)

    const artworks = []

    for(let [key, value] of formData.entries()){
        if(key === "artwork[]"){
            artworks.push(value)
        }
    }

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        artworks
    }
    
    console.log(data)
    form.reset()
})