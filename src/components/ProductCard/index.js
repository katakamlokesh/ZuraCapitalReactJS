import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

class ProductCard extends Component {
  state = {
    activeOptionId: '',
  }

  componentDidMount() {
    const {productData} = this.props
    const {options} = productData
    this.setState({activeOptionId: options[0]})
  }

  onChangeOptionId = event => {
    this.setState({activeOptionId: event.target.value})
  }

  render() {
    const {activeOptionId} = this.state
    const {productData} = this.props

    return (
      <li className="card-container">
        <img
          src={productData.imageUrl}
          className="card-image"
          alt={productData.title}
        />
        <div>
          <select
            value={activeOptionId}
            className="options-container"
            onChange={this.onChangeOptionId}
          >
            {productData.options.map(each => (
              <option value={each}>{each}</option>
            ))}
          </select>
          <p className="card-name">{productData.title}</p>
          <p className="">{productData.brand}</p>
          <p className="">Rs {productData.price} /-</p>
          <p className="rating-container">
            <span>
              <AiFillStar fill="yellow" />
            </span>{' '}
            {productData.rating}
          </p>
        </div>
      </li>
    )
  }
}

export default ProductCard
