import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaBackward,
  FaForward,
} from "react-icons/fa";

export default function PlayerComponent({ secureUrl, thumbnailUrl, duration }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(duration || 0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    setVideoDuration(duration || 0);
  }, [duration]);

  if (!secureUrl) {
    return <div className="text-gray-400 text-sm">No video available.</div>;
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = ("0" + date.getUTCSeconds()).slice(-2);
    return `${mm}:${ss}`;
  };

  const handleSeek = (value) => {
    const nextTime = Number(value);
    setCurrentTime(nextTime);

    if (playerRef.current) {
      playerRef.current.currentTime = nextTime;
    }
  };

  const skipTime = (seconds) => {
    const nextTime = currentTime + seconds;
    handleSeek(Math.max(0, Math.min(nextTime, videoDuration || 0)));
  };

  const togglePlay = () => {
    setHasStarted(true);
    setIsPlaying((currentPlaying) => !currentPlaying);
  };

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0">
          <ReactPlayer
            ref={playerRef}
            src={secureUrl}
            playing={isPlaying}
            volume={isMuted ? 0 : volume}
            playbackRate={playbackRate}
            muted={isMuted}
            onClickPreview={() => {
              setHasStarted(true);
              setIsPlaying(true);
            }}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onDurationChange={(event) => setVideoDuration(event.currentTarget.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(error) => console.error("ReactPlayer error:", error)}
            width="100%"
            height="100%"
            controls={false}
            light={!hasStarted && thumbnailUrl ? thumbnailUrl : false}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 px-4 pt-2">
        <input
          type="range"
          min="0"
          max={videoDuration || 0}
          step="1"
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-red-500"
        />
      </div>

      {/* Controls */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="btn btn-sm btn-ghost text-white hover:bg-gray-700"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>

          {/* Back 10s */}
          <button
            onClick={() => skipTime(-10)}
            className="btn btn-sm btn-ghost text-white hover:bg-gray-700"
            title="Back 10s"
          >
            <FaBackward size={14} />
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skipTime(10)}
            className="btn btn-sm btn-ghost text-white hover:bg-gray-700"
            title="Forward 10s"
          >
            <FaForward size={14} />
          </button>

          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn btn-sm btn-ghost text-white hover:bg-gray-700"
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (parseFloat(e.target.value) > 0) setIsMuted(false);
            }}
            className="w-20 h-1 bg-gray-700 rounded-lg cursor-pointer accent-red-500"
          />

          {/* Time Display */}
          <span className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(videoDuration)}
          </span>
        </div>

        {/* Right Controls - Speed */}
        <div className="flex items-center gap-2">
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="select select-sm select-bordered bg-gray-800 text-white border-gray-600 focus:outline-none"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
}
