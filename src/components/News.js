import React, { Component } from 'react'
import NewsItem from './NewsItem'
import "./News.css"
import Spinner from './Spinner';
import propTypes from "prop-types"

export default class News extends Component {
    static defaultProps={
        country :'us',
        pageSize: 20,
        category: "general"
    }
    static propTypes={
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }
    
 
    constructor(){
        super();
        console.log("this is constructor from news ")
        this.state={
            articles :[],
            loading: false,
            page:1

        }
    }
    async componentDidMount(){
        console.log("cmd");
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9bb4dc9388c4ff9bc6e881e517f4d0b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
             totalResults: parsedData.totalResults,
             loading:false
            })
    }
    handalPrevclick= async()=>{
        console.log("this is prv");
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9bb4dc9388c4ff9bc6e881e517f4d0b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading:false

    })

    }
    handalnextclick= async()=>{
        // below code is logic of next button that should not be click when u are on last page 
        if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)))
            {
        console.log("this is next");
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9bb4dc9388c4ff9bc6e881e517f4d0b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading:false
        })}
    }
  render() {
    return (
      <div className='container my-4'>
        {/* this belows syntax says that if this.state.loading is true only that time show spinner */}  
        {this.state.loading && <Spinner/>}
        <h2 className="newshead" style={{margin: "10px 0px"}}>NewsMonkey Top {this.props.category} Headlines </h2>
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{ 
            
            return <div className='col-md-4' key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,69):""} description={element.description?element.description.slice(0,99):""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.ndtv.com/common/images/ogndtv.png"}
                    newsUrl={element.url} author={ element.author} date={element.publishedAt} source={element.source.name} />
                </div>
            })}
        </div>
        <div className='container my-4'>
        {/* disabled={this.state.page <=1} this is the logic of Previous button that should not be clicked when you are on page first  */}
        <button disabled={this.state.page <=1} type="button"  className="btn btn-dark m-0" onClick={this.handalPrevclick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark m-5" onClick={this.handalnextclick}>Next &raquo;</button>

        </div>
      </div>
    )
  }
}
