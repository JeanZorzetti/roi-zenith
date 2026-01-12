'use client';

import { useState } from 'react';
import { RevealOnScroll } from '@/components/animations';
import { Play, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VideoDemoProps {
  title?: string;
  description?: string;
  videoId?: string;
  provider?: 'youtube' | 'vimeo';
  thumbnailSrc?: string;
  duration?: string;
  category?: string;
}

export default function VideoDemo({
  title = 'Veja como funciona',
  description = 'Assista uma demonstração rápida de como nossa solução funciona na prática',
  videoId,
  provider = 'youtube',
  thumbnailSrc,
  duration = '3:45',
  category = 'Demo',
}: VideoDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = () => {
    if (!videoId) return '';
    if (provider === 'youtube') {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-24 md:py-32 px-8 bg-pure-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <RevealOnScroll>
            <Badge className="mb-4 bg-primary-500/10 border-primary-500/20 text-primary-400">
              {category}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-thin mb-4">{title}</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">{description}</p>
          </RevealOnScroll>
        </div>

        {/* Video Container */}
        <RevealOnScroll delay={0.2}>
          <div className="relative group">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/0 rounded-2xl overflow-hidden cursor-pointer">
                  {thumbnailSrc ? (
                    <img
                      src={thumbnailSrc}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-24 h-24 text-primary-400 mx-auto mb-4 opacity-50" />
                        <p className="text-text-muted">Video Demo</p>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                  {/* Play Button */}
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  {duration && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/80 text-white text-sm font-medium">
                      {duration}
                    </div>
                  )}
                </div>

                {/* Decorative glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary-500/20 to-transparent rounded-2xl blur-xl opacity-50 -z-10" />
              </>
            ) : (
              <>
                {/* Video Player */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                  {videoId ? (
                    <iframe
                      src={getEmbedUrl()}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-text-muted">Video ID not provided</p>
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 hover:bg-black/90 flex items-center justify-center transition-colors"
                    aria-label="Close video"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
