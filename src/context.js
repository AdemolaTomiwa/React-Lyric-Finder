import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
   state = {
      track_list: [],
      heading: 'Top Ten Tracks',
   };

   componentDidMount() {
      fetch(
         `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&us=it&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
         .then((res) => res.json())
         .then((data) => {
            // console.log(data)
            this.setState({ track_list: data.message.body.track_list });
         });
   }

   render() {
      return (
         <Context.Provider value={this.state}>
            {this.props.children}
         </Context.Provider>
      );
   }
}

export const Consumer = Context.Consumer;
