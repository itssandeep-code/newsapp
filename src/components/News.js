import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 10,
    category: 'general'
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
   capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  async componentDidMount() {
    this.GetNews();
  }

  // hanldeNextClick = async () => {
  //   if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //     this.setState({
  //       page: this.state.page + 1
  //     })
  //     this.GetNews();
  //   }
  // }

  // hanldePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.GetNews();
  // }

  async GetNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };
  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}
                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>

          })}

        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.hanldePrevClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.hanldeNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}
