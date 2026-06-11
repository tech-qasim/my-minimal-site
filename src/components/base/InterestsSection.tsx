'use client'

import { useEffect, useState } from 'react'

interface SpotifyAlbumImage {
  url: string
  height: number | null
  width: number | null
}

interface SpotifyArtist {
  name: string
  external_urls: { spotify: string }
}

interface SpotifyAlbum {
  name: string
  images: SpotifyAlbumImage[]
}

interface SpotifyTrack {
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  external_urls: { spotify: string }
}

interface SpotifyNowPlaying {
  is_playing: boolean
  item: SpotifyTrack | null
  recently_played?: boolean
}

interface LetterboxdMovie {
  title: string
  link: string
  description: string
  pubDate: string
}

export default function InterestsSection() {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlaying | null>(null)
  const [movie, setMovie] = useState<LetterboxdMovie | null>(null)

  const [loadingSong, setLoadingSong] = useState(true)
  const [loadingMovie, setLoadingMovie] = useState(true)

  useEffect(() => {
    fetch('/api/now-playing', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: SpotifyNowPlaying) => {
        setNowPlaying(data)
        setLoadingSong(false)
      })
      .catch((err) => {
        console.error('Error fetching now playing:', err)
        setLoadingSong(false)
      })

    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/qasimdx/rss/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          setMovie(data.items[0])
        }
        setLoadingMovie(false)
      })
      .catch((err) => {
        console.error('Error fetching movie:', err)
        setLoadingMovie(false)
      })

  }, [])

  const isPlaying = nowPlaying?.is_playing === true
  const track = nowPlaying?.item
  const albumImg = track?.album.images[0]?.url || track?.album.images[1]?.url

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Spotify Music Block */}
      <div
        className="fade-up h-full flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden relative group min-h-[110px] sm:min-h-[140px]"
        style={{ animationDelay: '100ms' }}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-4 z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="icon-[mdi--spotify] size-3.5 sm:size-4 text-emerald-500 animate-[pulse_2s_infinite]" />
            <h3 className="font-semibold text-[10px] sm:text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400">
              {isPlaying ? 'Now Playing' : 'Recent Track'}
            </h3>
          </div>
          {isPlaying && (
            <div className="flex gap-[2px] sm:gap-[3px] items-end h-2.5 sm:h-3">
              <span className="w-[2px] sm:w-[3px] bg-emerald-500 rounded-full animate-[bounce_1.2s_infinite_100ms] h-full" />
              <span className="w-[2px] sm:w-[3px] bg-emerald-500 rounded-full animate-[bounce_1.2s_infinite_300ms] h-2/3" />
              <span className="w-[2px] sm:w-[3px] bg-emerald-500 rounded-full animate-[bounce_1.2s_infinite_500ms] h-5/6" />
            </div>
          )}
        </div>

        {loadingSong ? (
          <div className="animate-pulse flex gap-3 sm:gap-4 items-center">
            <div className="size-12 sm:size-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          </div>
        ) : track ? (
          <div className="flex gap-3 sm:gap-4 items-center z-10">
            <img
              src={albumImg || '/music-placeholder.png'}
              alt="Album Art"
              className="size-12 sm:size-16 rounded-lg shadow-sm object-cover border border-slate-100 dark:border-slate-800/50"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm sm:text-base text-slate-800 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 hover:underline transition-colors truncate"
              >
                {track.name}
              </a>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate mt-0.5">
                {track.artists.map((a) => a.name).join(', ')}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5 italic">
                {track.album.name}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 z-10">Unable to load track</p>
        )}

        {/* Blurred ambient background */}
        {albumImg && (
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-500 z-0 pointer-events-none bg-cover bg-center blur-xl scale-110"
            style={{ backgroundImage: `url(${albumImg})` }}
          />
        )}
      </div>

      {/* Letterboxd Movie Block */}
      <div
        className="fade-up h-full flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden relative group min-h-[110px] sm:min-h-[140px]"
        style={{ animationDelay: '300ms' }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-4 z-10">
          <span className="icon-[ri--film-fill] size-3.5 sm:size-4 text-orange-500 animate-[pulse_2.5s_infinite]" />
          <h3 className="font-semibold text-[10px] sm:text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Recently Watched Movie
          </h3>
        </div>

        {loadingMovie ? (
          <div className="animate-pulse flex gap-3 sm:gap-4 items-center">
            <div className="w-10 sm:w-12 h-14 sm:h-18 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            </div>
          </div>
        ) : movie ? (() => {
          const imgMatch = movie.description.match(/src="([^"]+)"/)
          const imgUrl = imgMatch ? imgMatch[1] : null
          const titleParts = movie.title.split(' - ')
          const cleanTitle = titleParts[0]
          const rating = titleParts[1] || ''

          return (
            <div className="flex gap-3 sm:gap-4 items-center z-10">
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="Movie Poster"
                  className="w-10 sm:w-12 h-14 sm:h-16 rounded shadow-sm object-cover border border-slate-100 dark:border-slate-800/50 group-hover:scale-102 transition-transform duration-300"
                />
              )}
              <div className="flex flex-col min-w-0">
                <a
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm sm:text-base text-slate-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 hover:underline transition-colors line-clamp-1"
                >
                  {cleanTitle}
                </a>
                {rating && (
                  <p className="text-xs sm:text-sm text-amber-500 tracking-wider mt-0.5 font-sans font-medium">
                    {rating}
                  </p>
                )}
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                  <span>Logged on Letterboxd</span>
                  <span className="icon-[ri--arrow-right-up-line] size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </div>
          )
        })() : (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Unable to load movie</p>
        )}

        {/* Blurred ambient background */}
        {movie && (() => {
          const imgMatch = movie.description.match(/src="([^"]+)"/)
          const imgUrl = imgMatch ? imgMatch[1] : null
          return imgUrl ? (
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] group-hover:opacity-[0.04] dark:group-hover:opacity-[0.06] transition-opacity duration-500 z-0 pointer-events-none bg-cover bg-center blur-xl scale-110"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ) : null
        })()}
      </div>
    </div>
  )
}
