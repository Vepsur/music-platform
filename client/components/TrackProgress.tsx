import React from 'react'

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left, right, onChange
}) => {
  const timePipe = (time: string): string => {
    return time.length < 2 ? time = 0 + time : time;
  }

  const durationMinutes = timePipe(`${Math.trunc(right / 60)}`);
  const durationSeconds = timePipe(`${right % 60}`);
  const currentMinutes = timePipe(`${Math.trunc(left / 60)}`);
  const currentSeconds = timePipe(`${left % 60}`);
  

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {`${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`}
      </div>
    </div>
  )
}

export default TrackProgress