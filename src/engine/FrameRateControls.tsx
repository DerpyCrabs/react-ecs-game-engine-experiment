import React from 'react'

export default function FrameRateControls({
  paused,
  setPaused,
  currentFrameRate,
  setCurrentFrameRate,
  step,
}: {
  paused: boolean
  setPaused: (p: boolean) => void
  currentFrameRate: number
  setCurrentFrameRate: (f: number) => void
  step: () => void
}) {
  return (
    <div style={{ paddingBottom: 20 }}>
      <button onClick={() => setPaused(!paused)}>
        {paused ? 'Unpause' : 'Pause'}
      </button>
      <button onClick={() => step()}>Step</button>
      <span style={{ marginLeft: 20 }}>
        Framerate:{' '}
        <input
          type='range'
          step='5'
          value={currentFrameRate}
          min={5}
          max={60}
          onChange={(e) => setCurrentFrameRate(Number(e.target.value))}
        />
        {currentFrameRate}
      </span>
    </div>
  )
}
