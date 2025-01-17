import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left:"50%", zIndex:"1"}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
            
        <img src={imageUrl}/>
        
        <div className="card-body">
            
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {!author ? "unknown":  author} on {new Date(date).toGMTString()} </small></p>

            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
        
      </div>
    )
  }
}

export default NewsItem
