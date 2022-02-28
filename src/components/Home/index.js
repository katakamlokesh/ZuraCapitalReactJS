import {Component} from 'react'
import debounce from 'lodash.debounce'

import './index.css'

import OffersCarousel from '../Offers'
import ProductCard from '../ProductCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productsData: [],
    searchInput: '',
    searchResults: [],
    showSearchResults: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://assignment-apis-nodejs.herokuapp.com/products'

    const response = await fetch(apiUrl)

    if (response.ok) {
      const jsonData = await response.json()
      const updatedData = jsonData.map(each => ({
        id: each.id,
        title: each.title,
        brand: each.brand,
        price: each.price,
        imageUrl: each.imageUrl,
        rating: each.rating,
        options: each.options.split(','),
      }))

      this.setState({
        productsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getSearchProducts = async value => {
    const apiUrl = `https://assignment-apis-nodejs.herokuapp.com/products?search_q=${value}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const jsonData = await response.json()
      const updatedData = jsonData.map(each => ({
        id: each.id,
        title: each.title,
        brand: each.brand,
        price: each.price,
        imageUrl: each.imageUrl,
        rating: each.rating,
        options: each.options.split(','),
      }))

      this.setState(prevState => ({
        showSearchResults: !prevState.showSearchResults,
        searchResults: updatedData,
      }))
    }
  }

  debouncedSearch = debounce(value => this.getSearchProducts(value), 1000)

  onChangeSearch = event => {
    const searchInput = event.target.value
    if (searchInput.length > 0) {
      this.setState({searchInput})
      this.debouncedSearch(searchInput)
    }

    this.setState({searchInput, showSearchResults: false})
  }

  renderSearchbar = () => {
    const {searchInput, searchResults, showSearchResults} = this.state
    console.log(showSearchResults)

    return (
      <>
        <div className="search-input-container">
          <input
            type="search"
            value={searchInput}
            placeholder="Search by name,email or role"
            onChange={this.onChangeSearch}
            className="input-container"
          />
          <button type="button" className="search-button">
            Enter
          </button>
        </div>
        {showSearchResults && (
          <ul className="search-output-con">
            {searchResults.length ? (
              searchResults.map(each => (
                <li key={each.id} className="result-item-container">
                  <img
                    className="result-image"
                    src={each.imageUrl}
                    alt={each.id}
                  />
                  <p className="result-title">{each.title}</p>
                </li>
              ))
            ) : (
              <p> No Search results found</p>
            )}
          </ul>
        )}
      </>
    )
  }
  render() {
    const {productsData} = this.state

    return (
      <>
        <div className="search-con">{this.renderSearchbar()}</div>
        <OffersCarousel />
        <ul className="products-container">
          {productsData.map(each => (
            <ProductCard key={each.id} productData={each} />
          ))}
        </ul>
      </>
    )
  }
}

export default Home
