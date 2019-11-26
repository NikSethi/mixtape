import React from "react";
import "./PlaylistViewer.css";

const PlaylistViewer = (props) => {
    return (
        <div>
            {/* iterate through playlists */}
            {/* make a card for each */}
            {props.playlists.map((p, i) => (
                <div className="playlist-card">
                    <img src={p.images[0].url} />
                    <p>{p.name}</p>
                </div>
            ))}
        </div>
    )
}

export default PlaylistViewer;