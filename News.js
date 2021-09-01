import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {


    constructor() {
        super();
        console.log("Hello World");
        this.state = {
            articles: [],
            loading: false,
            page:1,
        }

    }

    async componentDidMount() {
        console.log("cdm")
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=1"
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles })
    }
      handlePrevClick =async ()=>{
        console.log("Previous ")


        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=${this.state.page - 1}';
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ 
            page:this.state.page - 1,
            articles: parsedData.articles })


    }

     handleNextClick = async () =>{
        console.log("Next");
        
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=e3ed0e1401be4fb59c412367b9bde407&page=${this.state.page + 1 }';
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
       
        this.setState({
            page: this.state.page + 1,
            articles:parsedData.articles
        })

    }




    render() {
        console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center">News monkey.. Top headlines</h1>
                {/* <h1>News monkey.. Top headlines</h1> */}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice() : ""} description={element.description ? element.description.slice() : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick = {this.handlePrevClick}> &larr; Previous</button>
                <button type="button" class="btn btn-dark" onClick = {this.handleNextClick} >Next &rarr; </button>
                </div>
            </div>


        )
    }
}

export default News
