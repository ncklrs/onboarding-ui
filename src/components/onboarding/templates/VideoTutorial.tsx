import { useState, type ReactNode } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export interface VideoTutorialProps {
  title: string
  description?: ReactNode
  videoUrl: string
  poster?: string
  transcript?: string
  duration?: string
  onComplete?: () => void
  onSkip?: () => void
  autoPlay?: boolean
  requireWatch?: boolean
  className?: string
}

export function VideoTutorial({
  title,
  description,
  videoUrl,
  poster,
  transcript,
  duration,
  onComplete,
  onSkip,
  autoPlay = false,
  requireWatch = false,
  className,
}: VideoTutorialProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [hasWatched, setHasWatched] = useState(!requireWatch)
  const [showTranscript, setShowTranscript] = useState(false)

  const handleVideoEnd = () => {
    setHasWatched(true)
    setIsPlaying(false)
  }

  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {duration && (
          <p className="mt-2 text-sm text-muted-foreground">
            Duration: {duration}
          </p>
        )}
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-lg">
        <video
          className="h-full w-full"
          src={videoUrl}
          poster={poster}
          controls
          autoPlay={autoPlay}
          muted={isMuted}
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {transcript && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </Button>
          {showTranscript && (
            <div className="mt-2 rounded-lg bg-secondary p-4 text-sm">
              {transcript}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {onComplete && (
          <Button
            onClick={onComplete}
            disabled={!hasWatched}
            className="flex-1"
          >
            {hasWatched ? 'Continue' : 'Watch to Continue'}
          </Button>
        )}
        {onSkip && !requireWatch && (
          <Button onClick={onSkip} variant="outline">
            Skip
          </Button>
        )}
      </div>

      {requireWatch && !hasWatched && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Please watch the entire video to continue
        </p>
      )}
    </div>
  )
}
