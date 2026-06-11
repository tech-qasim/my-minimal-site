'use client'

import { useEffect, useState } from 'react'

interface SongTrack {
  name: string
  artist: {
    '#text': string
  }
  album: {
    '#text': string
  }
  image: Array<{
    '#text': string
    size: string
  }>
  url: string
  '@attr'?: {
    nowplaying?: string
  }
}

interface LetterboxdMovie {
  title: string
  link: string
  description: string
  pubDate: string
}

interface LastfmArtist {
  name: string
  playcount: string
}

export default function InterestsSection() {
  const [song, setSong] = useState<SongTrack | null>(null)
  const [movie, setMovie] = useState<LetterboxdMovie | null>(null)
  const [topArtist, setTopArtist] = useState<LastfmArtist | null>(null)
  const [topGenre, setTopGenre] = useState<string>('Hip Hop')
  const [artistImg, setArtistImg] = useState<string>('')
  
  const [loadingSong, setLoadingSong] = useState(true)
  const [loadingMovie, setLoadingMovie] = useState(true)
  const [loadingArtist, setLoadingArtist] = useState(true)

  useEffect(() => {
    // Fetch Last.fm Now Playing / Recent Song
    fetch('https://lastfm-last-played.biancarosa.com.br/qasimdx/latest-song')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.track) {
          setSong(data.track)
        }
        setLoadingSong(false)
      })
      .catch((err) => {
        console.error('Error fetching song:', err)
        setLoadingSong(false)
      })

    // Fetch Letterboxd Recent Movie
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

    // Fetch Top Artist & Genre (Recent 1 Month)
    const apiKey = import.meta.env.PUBLIC_LASTFM_API_KEY
    if (apiKey) {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=qasimdx&api_key=${apiKey}&format=json&limit=1&period=1month`
      )
        .then((res) => res.json())
        .then((data) => {
          const artist = data.topartists?.artist?.[0]
          if (artist) {
            setTopArtist(artist)
            
            // Fetch Top Tags for this artist to get genre
            fetch(
              `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(
                artist.name
              )}&api_key=${apiKey}&format=json&limit=1`
            )
              .then((res) => res.json())
              .then((tagData) => {
                const tag = tagData.toptags?.tag?.[0]?.name
                if (tag) {
                  setTopGenre(tag)
                }
              })
              .catch(console.error)

            // Fetch Deezer for high quality artist image
            fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artist.name)}`)
              .then((res) => res.json())
              .then((deezerData) => {
                const img = deezerData.data?.[0]?.picture_xl || deezerData.data?.[0]?.picture_big
                if (img) {
                  setArtistImg(img)
                }
                setLoadingArtist(false)
              })
              .catch(() => setLoadingArtist(false))
          } else {
            setLoadingArtist(false)
          }
        })
        .catch((err) => {
          console.error('Error fetching top artist:', err)
          setLoadingArtist(false)
        })
    } else {
      setLoadingArtist(false)
    }
  }, [])

  const isNowPlaying = song?.['@attr']?.nowplaying === 'true'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Last.fm Music Block */}
      <div 
        className="fade-up h-full flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden relative group md:col-span-2 min-h-[110px] sm:min-h-[140px]"
        style={{ animationDelay: '100ms' }}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-4 z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="icon-[ri--music-2-fill] size-3.5 sm:size-4 text-emerald-500 animate-[pulse_2s_infinite]" />
            <h3 className="font-semibold text-[10px] sm:text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400">
              {isNowPlaying ? 'Now Playing' : 'Recent Track'}
            </h3>
          </div>
          {isNowPlaying && (
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
        ) : song ? (
          <div className="flex gap-3 sm:gap-4 items-center z-10">
            <img
              src={song.image[2]?.['#text'] || song.image[1]?.['#text'] || '/music-placeholder.png'}
              alt="Album Art"
              className="size-12 sm:size-16 rounded-lg shadow-sm object-cover border border-slate-100 dark:border-slate-800/50"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm sm:text-base text-slate-800 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 hover:underline transition-colors truncate"
              >
                {song.name}
              </a>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate mt-0.5">
                {song.artist?.['#text']}
              </p>
              {isNowPlaying ? (
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-[pulse_1.5s_infinite]" style={{ width: '45%' }} />
                </div>
              ) : (
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5 italic">
                  {song.album?.['#text']}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 z-10">Unable to load track</p>
        )}

        {/* Blurred ambient background */}
        {song?.image?.[2]?.['#text'] && (
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-opacity duration-500 z-0 pointer-events-none bg-cover bg-center blur-xl scale-110"
            style={{ backgroundImage: `url(${song.image[2]['#text']})` }}
          />
        )}
      </div>

      {/* 2. Top Artist / Genre Block - Hidden on Mobile */}
      <div 
        className="fade-up hidden md:flex h-full flex-col justify-between bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/40 dark:to-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden relative group md:col-span-1 min-h-[140px]"
        style={{ animationDelay: '200ms' }}
      >
        {artistImg && (
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-20 group-hover:opacity-15 dark:group-hover:opacity-25 transition-opacity duration-500 z-0 pointer-events-none bg-cover bg-center blur-[1px] scale-105"
            style={{ backgroundImage: `url(${artistImg})` }}
          />
        )}
        <div className="z-10 relative flex flex-col justify-between h-full w-full">
          <div className="flex justify-between items-start">
            <span className="icon-[ri--heart-3-fill] size-4.5 text-rose-500 animate-[pulse_3s_infinite]" />
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              My Favorites
            </h3>
          </div>
          
          <div className="mt-4">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Top Artist
            </span>
            {loadingArtist ? (
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse mt-0.5" />
            ) : (
              <p className="text-base font-extrabold text-slate-800 dark:text-white truncate mt-0.5">
                {topArtist ? topArtist.name : 'The Weeknd'}
              </p>
            )}

            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-3">
              Fav Genre
            </span>
            {loadingArtist ? (
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse mt-0.5" />
            ) : (
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize truncate mt-0.5">
                {topGenre}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Letterboxd Movie Block */}
      <div 
        className="fade-up h-full flex flex-col justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden relative group md:col-span-3 min-h-[100px] sm:min-h-[120px]"
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
