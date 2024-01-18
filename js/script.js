// Replace YOUR_API_KEY with your actual API key
const apiKey = '8f10fc39d64520079c710288989c0643'
const baseUrl = 'https://ws.audioscrobbler.com/2.0/'
const method = 'user.getrecenttracks'
const user = 'chris' // Replace with the desired Last.FM username
const format = 'json'
const limit = 12 // Number of tracks to fetch

const cardContainer = document.getElementById('card-container')

function createCard(track) {
  const card = document.createElement('div')
  card.classList.add('card')

  const image = document.createElement('img')
  image.classList.add('card-img')
  image.src = track.image[2]['#text'] // Use the larger image
  card.appendChild(image)

  const title = document.createElement('h3')
  title.classList.add('card-title')
  title.textContent = track.name
  card.appendChild(title)

  const artist = document.createElement('p')
  artist.classList.add('card-artist')
  artist.textContent = track.artist['#text']
  card.appendChild(artist)

  // Add a description property to the track object
  track.description = `${track.album['#text']} - ${track.date['#text']}`
  // Add click event listener to the card
card.addEventListener('click', () => {
  const box = document.getElementById('box')
  if (box.classList.contains('hidden')) {
    // Display more information about the track in the modal dialog
    box.classList.remove('hidden')

    const image = document.createElement('img')
    image.setAttribute('class', 'popupImage')
    image.src = track.image[3]['#text']

    const title = document.createElement('h2')
    title.textContent = track.name

    const artist = document.createElement('p')
    artist.textContent = track.artist['#text']

    const description = document.createElement('p')
    description.textContent = track.description

    const close = document.createElement('a')
    close.classList.add('close')
    close.textContent = "x"
    close.setAttribute("id", "idclose")

    box.innerHTML = ''
    box.appendChild(close)
    box.appendChild(image)
    box.append(title)
    box.append(artist)
    box.append(description)

    const closeButton = document.getElementById('idclose')
    closeButton.addEventListener('click', function() {
      box.classList.add('hidden')
    })
  } else {
    box.classList.add('hidden')
  }
  })

  return card
}

async function fetchData() {
  const url = `${baseUrl}?method=${method}&user=${user}&api_key=${apiKey}&format=${format}&limit=${limit}`
  const response = await fetch(url)
  const data = await response.json()

  const tracks = data.recenttracks.track
  tracks.forEach(track => {
    console.log(track)
    const card = createCard(track)
    cardContainer.appendChild(card)
  })
}

fetchData()

const close = document.getElementById('x');
close.addEventListener("click", ()=>{
	const box = document.getElementById('box')
	box.classList.add('hidden')
})