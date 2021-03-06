import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
   state = {
      track: {},
      lyrics: {},
   };

   componentDidMount() {
      fetch(
         `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            this.setState({ lyrics: data.message.body.lyrics });

            return fetch(
               `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
            )
               .then((res) => res.json())
               .then((data) => {
                  this.setState({ track: data.message.body.track });
               });
         });
   }

   render() {
      const { track, lyrics } = this.state;
      if (
         track === undefined ||
         lyrics === undefined ||
         Object.keys(track).length === 0 ||
         Object.keys(lyrics).length === 0
      ) {
         return <Spinner />;
      } else {
         return (
            <React.Fragment>
               <Link to='/' className='btn btn-dark btn-sm mb-4 back-btn'>
                  Go Back
               </Link>
               <div className='card-div'>
                  <h5 className='card-header'>
                     {track.track_name} by{' '}
                     <span className='text-secondary'>{track.artist_name}</span>
                  </h5>
                  <div className='card-body'>
                     <p className='card-text'>{lyrics.lyrics_body}</p>
                  </div>
               </div>
               <ul className='list-group mt-3'>
                  <li className='list-group-item'>
                     <strong>Album ID</strong>: {track.album_id}
                  </li>
                  <li className='list-group-item'>
                     <strong>Song Genre</strong>:{' '}
                     {
                        track.primary_genres.music_genre_list[0].music_genre
                           .music_genre_name
                     }
                  </li>
                  <li className='list-group-item'>
                     <strong>Explicit Words</strong>:
                     {track.explicit === 0 ? 'No' : 'Yes'}
                  </li>
                  <li className='list-group-item'>
                     <strong>Release Date</strong>:
                     <Moment format='MM/DD/YYYY'>
                        {track.first_release_date}
                     </Moment>
                  </li>
               </ul>
            </React.Fragment>
         );
      }
   }
}

export default Lyrics;
