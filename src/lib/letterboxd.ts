export interface LetterboxdItem {
  title: string
  link: string
  description: string
  pubDate: string
  rating: number // 0-5 (User's rating)
  posterUrl: string
  movieTitle: string
  year: string
  review: string
  rewatch: boolean
  // New fields
  director: string
  runtime: string
  genres: string[]
  averageRating: string // Letterboxd community rating (or TMDB)
  imdbLink: string
  backdropUrl: string
  overview: string
}

export async function getLatestMovie(username: string): Promise<LetterboxdItem | null> {
  try {
    const response = await fetch(`https://letterboxd.com/${username}/rss/`)
    if (!response.ok) {
      console.error(`Failed to fetch Letterboxd RSS for ${username}: ${response.statusText}`)
      return null
    }

    const xmlText = await response.text()

    // Regex parsing for the first item
    const firstItemMatch = xmlText.match(/<item>([\s\S]*?)<\/item>/)
    if (!firstItemMatch) return null

    const itemContent = firstItemMatch[1]

    // Extract basic fields
    const titleMatch = itemContent.match(/<title>(.*?)<\/title>/)
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/)
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/)
    const descriptionMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/)
    const ratingMatch = itemContent.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/)
    const filmTitleMatch = itemContent.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/)
    const filmYearMatch = itemContent.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/)
    const rewatchMatch = itemContent.match(/<letterboxd:rewatch>(.*?)<\/letterboxd:rewatch>/)

    const link = linkMatch ? linkMatch[1] : ''
    const movieTitle = filmTitleMatch ? filmTitleMatch[1] : ''
    const year = filmYearMatch ? filmYearMatch[1] : ''

    // Parse Description for Poster and Review
    let posterUrl = ''
    let review = ''

    if (descriptionMatch) {
      let desc = descriptionMatch[1]

      // Strip CDATA wrapper if present
      if (desc.startsWith('<![CDATA[')) {
        desc = desc.replace(/^<!\[CDATA\[|\]\]>$/g, '')
      }

      // Poster
      const imgMatch = desc.match(/src="(.*?)"/)
      if (imgMatch) posterUrl = imgMatch[1]

      // Review cleanup
      let cleanDesc = desc.replace(/<img[^>]*>/g, '')
      cleanDesc = cleanDesc.replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
      cleanDesc = cleanDesc.replace(/<p>|<br\s*\/?>/gi, '\n')
      cleanDesc = cleanDesc.replace(/<\/?[^>]+(>|$)/g, '')
      review = cleanDesc.trim()
    }

    // Fetch additional details from TMDB
    let director = ''
    let runtime = ''
    let genres: string[] = []
    let averageRating = ''
    let imdbLink = ''
    let backdropUrl = ''
    let overview = ''

    const tmdbToken = import.meta.env.TMDB_READ_ACCESS_TOKEN
    console.log('TMDB Token exists:', !!tmdbToken)
    console.log('Fetching TMDB data for:', movieTitle, year)

    if (tmdbToken && movieTitle) {
      try {
        // 1. Search for the movie
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&year=${year}&include_adult=false&language=en-US&page=1`
        const searchRes = await fetch(searchUrl, {
          headers: {
            Authorization: `Bearer ${tmdbToken}`,
            accept: 'application/json',
          },
        })

        if (searchRes.ok) {
          const searchData = await searchRes.json()
          console.log('TMDB Search Results:', searchData.results?.length)
          if (searchData.results && searchData.results.length > 0) {
            const movieId = searchData.results[0].id

            // 2. Get Movie Details (Runtime, Genres, Credits for Director, External IDs for IMDb)
            const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,external_ids&language=en-US`
            const detailsRes = await fetch(detailsUrl, {
              headers: {
                Authorization: `Bearer ${tmdbToken}`,
                accept: 'application/json',
              },
            })

            if (detailsRes.ok) {
              const details = await detailsRes.json()
              console.log('TMDB Details Fetched for ID:', movieId)

              // Runtime
              if (details.runtime) {
                runtime = `${details.runtime} mins`
              }

              // Genres
              if (details.genres) {
                genres = details.genres.map((g: any) => g.name).slice(0, 3)
              }

              // Director
              if (details.credits && details.credits.crew) {
                const directorObj = details.credits.crew.find((c: any) => c.job === 'Director')
                if (directorObj) {
                  director = directorObj.name
                }
              }

              // Average Rating (TMDB rating usually out of 10)
              if (details.vote_average) {
                averageRating = details.vote_average.toFixed(1)
              }

              // IMDb Link
              if (details.external_ids && details.external_ids.imdb_id) {
                imdbLink = `https://www.imdb.com/title/${details.external_ids.imdb_id}`
              }

              // Backdrop Image
              if (details.backdrop_path) {
                backdropUrl = `https://image.tmdb.org/t/p/w500${details.backdrop_path}`
              }

              // Overview
              if (details.overview) {
                overview = details.overview
              }

              console.log('Extracted Metadata:', { director, runtime, genres, averageRating, imdbLink, backdropUrl, overview })
            } else {
              console.error('TMDB Details failed:', detailsRes.status, detailsRes.statusText)
            }
          } else {
            console.log('No results found for:', movieTitle)
          }
        } else {
          console.error('TMDB Search failed:', searchRes.status, searchRes.statusText)
        }
      } catch (err) {
        console.error('Failed to fetch TMDB data:', err)
      }
    } else {
      console.log('Skipping TMDB fetch. Token or Title missing.', { hasToken: !!tmdbToken, movieTitle })
    }

    return {
      title: titleMatch ? titleMatch[1] : '',
      link,
      description: descriptionMatch ? descriptionMatch[1] : '',
      pubDate: pubDateMatch ? pubDateMatch[1] : '',
      rating: ratingMatch ? parseFloat(ratingMatch[1]) : 0,
      posterUrl,
      movieTitle,
      year,
      review,
      rewatch: rewatchMatch ? rewatchMatch[1] === 'Yes' : false,
      director,
      runtime,
      genres,
      averageRating,
      imdbLink,
      backdropUrl,
      overview,
    }
  } catch (error) {
    console.error('Error fetching Letterboxd data:', error)
    return null
  }
}
