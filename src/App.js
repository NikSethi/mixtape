import React from 'react';

import * as $ from "jquery";
import PlaylistViewer from './components/PlaylistViewer/PlaylistViewer'

// endpoint for user authorization
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// app data
const clientID = "75866d496692487bad2a4d1c7eeb8bca";
const redirectUri = "http://localhost:3000";
const scopes = [
  "playlist-read-private",
];

// hash url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  window.location.hash = "";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      playlists: [],
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          playlists: data.items,
        });
      }
    });
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          <PlaylistViewer
            playlists={this.state.playlists}
          />
        )}
        </header>
      </div>
    );
  }
}

export default App;
