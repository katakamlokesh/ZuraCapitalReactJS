// Write your code here
import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class OffersCarousel extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeReviewIndex: 0,
    offersData: [],
  }

  componentDidMount = () => {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://assignment-apis-nodejs.herokuapp.com/offers'

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
      }))

      this.setState({
        offersData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onClickRightArrow = () => {
    const {activeReviewIndex, offersData} = this.state

    if (activeReviewIndex < offersData.length - 1) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex + 1,
      }))
    }
  }

  onClickLeftArrow = () => {
    const {activeReviewIndex} = this.state

    if (activeReviewIndex > 0) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex - 1,
      }))
    }
  }

  renderActiveReview = () => {
    const {activeReviewIndex, offersData} = this.state
    const currentReviewData = offersData[activeReviewIndex]
    const {title, brand, price, rating, imageUrl} = currentReviewData
    return (
      <div className="carousel-container">
        <button
          type="button"
          className="arrow-button"
          testid="leftArrow"
          onClick={this.onClickLeftArrow}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
            alt="left arrow"
          />
        </button>

        <div className="review-container">
          <img
            className="user-profile"
            src={imageUrl}
            alt={`${brand}-avatar`}
          />
          <div className="flex-container">
            <div>
              <p className="user-name" id="userName">
                {title}
              </p>
              <p className="company-name">{brand}</p>
              <p className="company-name">{rating}</p>
            </div>
            <p className="description">Rs {price} /-</p>
          </div>
        </div>
        <button
          type="button"
          className="arrow-button"
          testid="rightArrow"
          onClick={this.onClickRightArrow}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
            alt="right arrow"
          />
        </button>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <h1 className="heading">Loading...</h1>
      case apiStatusConstants.success:
        return this.renderActiveReview()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="reviews-app-bg-container">{this.renderApiStatus()}</div>
    )
  }
}

export default OffersCarousel
