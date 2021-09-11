const pokemons = [
  {
    username: 'Ash',
    title: 'Pikachu'
  },
  {
    username: 'Red',
    title: 'Blastoise'
  }
]

export default {

  async listPokemon(req, res)  {
    res.json(pokemons.filter(post => post.username === req.user.name))
  }

}