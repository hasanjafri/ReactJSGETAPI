import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images'

const get_movies_general = 'https://api.themoviedb.org/3/discover/movie?api_key=3d0b764688397d3892a7334e8996' +
        'c16d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=fa' +
        'lse&page=1';

const get_movies_by_genre = movies_genre => 'https://api.themoviedb.org/3/discover/movie?api_key=3d0b764688397d3892a7334e8996' +
        'c16d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=fa' +
        'lse&page=1&with_genres=' + movies_genre;

class MoviesGallery extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentImage: 0,
            movies_genre: null
        };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({movies_genre: nextProps.movies_genre})
        if (this.props.movies_genre){
            fetch(get_movies_by_genre(this.props.movies_genre))
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies_list: res
                })
            })
            this.forceUpdate()
        }
        else {
            fetch(get_movies_general)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies_list: res
                })
            })
            this.forceUpdate()
        }
    }

    openLightbox(event, obj) {
        this.setState({
          currentImage: obj.index,
          lightboxIsOpen: true,
        });
      }
      closeLightbox() {
        this.setState({
          currentImage: 0,
          lightboxIsOpen: false,
        });
      }
      gotoPrevious() {
        this.setState({
          currentImage: this.state.currentImage - 1,
        });
      }
      gotoNext() {
        this.setState({
          currentImage: this.state.currentImage + 1,
        });
      }

    componentDidMount() {
        fetch(get_movies_general)
        .then(res => res.json())
        .then(res => {
            this.setState({
                movies_list: res
            })
        })    
    }

    render() {
        if (!this.state.movies_list) return <p>Loading...</p>
        var poster_list = []
        for (var i=0; i<this.state.movies_list.results.length; i++) {
            poster_list.push("https://image.tmdb.org/t/p/w500"+this.state.movies_list.results[i].poster_path);
        }
        var desc_list = []
        for (i=0; i<this.state.movies_list.results.length; i++) {
            desc_list.push(this.state.movies_list.results[i].overview)
        }
        var output_data = {
            links: []
        };
        for (var poster in poster_list) {
            var output = {}
            output.src = poster_list[poster];
            output.width = 2
            output.height = 2
            output.caption = desc_list[poster];
            output_data.links.push(output)
        }
        console.log(output_data)
        return (
            <div>
                <Gallery photos={output_data.links} columns={5} margin={2} onClick={this.openLightbox}/>
                <Lightbox images={output_data.links}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    showImageCount={false}
                />
            </div>
        );
    }
}

export default MoviesGallery;
