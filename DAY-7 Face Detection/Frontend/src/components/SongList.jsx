import { FaPlay, FaPause } from "react-icons/fa";
import { useState, useRef } from "react";

function SongList() {
  const [song] = useState([
    { title: "test_title", artist: "test_artist", url: "test_song.mp3" },
  ]);

  const audioRef = useRef(null); // target audio element
  const [isPlaying, setIsPlaying] = useState(false); // play pause

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className="mt-5">
      <h1 className="text-3xl capitalize">recommended</h1>

      {song.map((data, index) => (
        <div key={index} className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl">{data.title}</h1>
            <p>{data.artist}</p>
          </div>

          <div className="cursor-pointer">
            {!isPlaying ? (
              <FaPlay onClick={handlePlay} />
            ) : (
              <FaPause onClick={handlePause} />
            )}
          </div>

          {/* Audio tag is hidden; not visible in UI */}
          <audio ref={audioRef} src={data.url} className="hidden" />
        </div>
      ))}
    </div>
  );
}

export default SongList;
