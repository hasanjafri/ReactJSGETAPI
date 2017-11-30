import React, { Component } from 'react';

const get_movies_by_genre = movies_genre => `https://api.themoviedb.org/3/discover/movie?api_key=3d0b764688397d3892a7334e8996c16d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=` + movies_genre;

class MoviesGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        fetch(get_movies_by_genre(this.props.movies_genre))
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies_list: res
                })
            })
    }

    render() {
        if (!this.state.movies_list) return <p>Please speak to get recommended movies by speaker ID</p>
        return (
            <div>
                <h2>{this.state.movies_list}</h2>
            </div>
        )
    }
}

export default MoviesGallery;
