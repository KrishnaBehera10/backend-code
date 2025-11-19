import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { useState } from "react";

function SongList() {
  const [song, setsong] = useState([
    { title: "test_title", artist: "test_artist", url: "test_song" },
  ]);
  return (
    <div className="mt-5">
      <h1 className="text-3xl capitalize">recommended</h1>
      <div>
        {song.map((data, index) => {
          return (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl">{data.title}</h1>
                <p>{data.artist}</p>
              </div>

              <div>
                <FaPlay />
                <FaPause />
              </div>
              <audio src={data.url} controls className="hidden"></audio>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongList;
