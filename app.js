let page = 1

const fetchPokemons = async (page = 1) => {
  const limit = 9
  const offset = (page - 1) * limit
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
  const data = await response.json()
  // console.log(data);
  const dataResults = data.results.map((pokemon) => {
    // 'url': 'https://pokeapi.co/api/v2/pokemon/1/'
    // const id = pokemon.url.split('/')[6]
    const id = pokemon.url.split('/').at(6)
    // console.log(id);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

    // console.log(image);
    return {
      ...pokemon, //name, url
      id,
      image
    }
  })
  // console.log(dataResults);
  return dataResults
}

// fetchPokemons()

const renderPokemons = (pokemons) => {
  // document.body.innerHTML = '<h1>Hola DOM</h1>'
  const pokemonsList = document.getElementById('pokemonsList')

  // pokemonsList.innerHTML = 'Hola Div'

  let elements = ''

  pokemons.forEach((pokemon) => {
    // elements = elements + `<h2>${pokemon.name}</h2>`
    elements += `
      <article class='pokemons-item'>
        <img src="${pokemon.image}" width='80' height='80'/>
        <h2> #${pokemon.id} ${pokemon.name}</h2>
      </article>
    `
    // console.log(elements);

  })

  pokemonsList.innerHTML = elements

}

const documentReady = async () => {
  const nextPage = document.getElementById('nextPage')
  const prevPage = document.getElementById('prevPage')
  const currentPage = document.getElementById('currentPage')

  nextPage.addEventListener('click', async () => {
    // page = page + 1
    const pokemons = await fetchPokemons(++page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })

  prevPage.addEventListener('click', async () => {
    const pokemons = await fetchPokemons(--page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })


  const pokemons = await fetchPokemons()
  console.log(pokemons);

  renderPokemons(pokemons)

}
document.addEventListener('DOMContentLoaded', documentReady)



