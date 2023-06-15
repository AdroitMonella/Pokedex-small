import './App.css';
import React from 'react';
import pokemonArray from './PokemonArray.js'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pokemon: pokemonArray,
      pokemonTypes: ['grass', 'fire', 'water', 'bug', 'flying', 'normal'],
      filterValue: "all",
      sortValue: "id",
      textValue: '',
      textSearch: '',
    };
  }

  handleSortValue(event) {
    this.setState({ sortValue: event.target.value })
  }

  handleFilterValue(event) {
    this.setState({ filterValue: event.target.value })
  }

  handleClickSubmit(event) {
    const searchText = this.state.textValue;
    this.setState({
      textSearch: searchText,
      textValue: ''
    })
  }

  handleClickRestart() {
    this.setState({
      textSearch: '',
      textValue: ''
    })
  }

  handleInputChange(event) {
    let textSearch = event.target.value;
    let textValue = event.target.value

    this.setState({
      textSearch: textSearch,
      textValue: textValue
    });
  }

  render() {
    var sortBy = require('sort-by');


    const sortStyle = {
      margin: '10px'
    }

    const filterValue = this.state.filterValue
    let filteredPokemonListMenuChoice = filterValue === 'all' ? this.state.pokemon : this.state.pokemon.filter
      (pokemon => { return pokemon.type === filterValue })

    const searchText = this.state.textSearch;
    let filteredPokemonListTextChoice = filteredPokemonListMenuChoice.filter(pokemon => pokemon.name.startsWith(searchText));


    let pokemonList = filteredPokemonListTextChoice
      .sort(sortBy(this.state.sortValue))
      .map((pokemon, index) => {
        return (<div key={index} className='pokemon-items'>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>
            (#{pokemon.id}) {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </p>
          <p>
            Type: {pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}
          </p>
        </div>
        )
      })

    let typelist = this.state.pokemonTypes.map((type, index) => {
      return (<option
        value={type}
        key={index}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </option>)
    })

    return (
      <div className='content-container'>
        <h1>Pokémon!</h1>
        <div className='userChoice-section'>
          <div className='sort-section'>
            <label style={{ marginLeft: '10px' }}>
              Sort by:
              <select onChange={this.handleSortValue.bind(this)} style={sortStyle}>
                <option value='id'>Id</option>
                <option value='name'>Name</option>
              </select>
            </label>
          </div>
          <div className='filter-section'>
            <label>
              Filter by type:
              <select onChange={this.handleFilterValue.bind(this)} style={sortStyle}>
                <option value='all'> All</option>
                {typelist}
              </select>
            </label>
          </div>
          <div className='text-section'>
            <input type='text' value={this.state.textValue} onChange={this.handleInputChange.bind(this)} style={sortStyle}></input>
            <button onClick={this.handleClickSubmit.bind(this)}>Search</button>
            <button onClick={this.handleClickRestart.bind(this)} style={{ marginRight: '10px' }}>Restart</button>
          </div>
        </div>
        <div className='pokemon clearfix'>
          {pokemonList}
        </div>
      </div>
    );
  }
};

export default App;
