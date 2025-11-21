import { useState } from "react";
import FaceDetector from "./components/Face_Detection";
import SongList from "./components/SongList";

function App() {
  const [song, setsong] = useState([]);
  const [initalval, setinitalval] = useState(false);

  console.log(song);

  return (
    <div
      className={`${
        initalval ? "w-1/2 m-auto" : "w-full"
      } h-screen border border-gray-300 p-5 overflow-hidden`}
    >
      <FaceDetector setsong={setsong} setinitalval={setinitalval} />

      <div className="overflow-auto h-[50vh] w-full mt-5">
        {initalval && <SongList song={song} />}
      </div>
    </div>
  );
}

export default App;
