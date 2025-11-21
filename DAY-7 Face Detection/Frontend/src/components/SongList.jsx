import { FaPlay, FaPause } from "react-icons/fa";
import { useState, useRef } from "react";

function SongList({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Fixed header */}
      <h1 className="text-3xl capitalize bg-amber-50 p-2 sticky top-0 z-10">
        recommended
      </h1>

      {/* Scrollable list area */}
      <div className="overflow-y-auto mt-3 space-y-3 pb-5">
        {song.map((data, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200/40 py-3 px-2 rounded"
          >
            <div>
              <h1 className="text-md capitalize">{data?.title}</h1>
            </div>

            <div className="cursor-pointer">
              {!isPlaying ? (
                <FaPlay onClick={handlePlay} />
              ) : (
                <FaPause onClick={handlePause} />
              )}
            </div>

            <audio ref={audioRef} src={data?.url} className="hidden" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
