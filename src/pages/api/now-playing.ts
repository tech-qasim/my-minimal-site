import type { APIRoute } from 'astro'

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${import.meta.env.SPOTIFY_CLIENT_ID}:${import.meta.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: import.meta.env.SPOTIFY_REFRESH_TOKEN,
    }),
  })

  if (!res.ok) throw new Error('Failed to refresh Spotify token')
  const data = await res.json()
  return data.access_token
}

export const GET: APIRoute = async () => {
  try {
    const token = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.status === 204 || res.status === 403) {
      // Nothing playing or rate limited — fetch recently played instead
      const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!recentRes.ok) {
        return new Response(JSON.stringify({ is_playing: false, item: null }), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' },
        })
      }
      const recent = await recentRes.json()
      const track = recent.items?.[0]?.track
      if (!track) {
        return new Response(JSON.stringify({ is_playing: false, item: null }), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' },
        })
      }
      return new Response(
        JSON.stringify({
          is_playing: false,
          item: {
            name: track.name,
            artists: track.artists,
            album: track.album,
            external_urls: track.external_urls,
          },
          recently_played: true,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()
    if (!data || !data.item) {
      return new Response(JSON.stringify({ is_playing: false, item: null }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' },
      })
    }

    return new Response(
      JSON.stringify({
        is_playing: data.is_playing,
        item: {
          name: data.item.name,
          artists: data.item.artists,
          album: data.item.album,
          external_urls: data.item.external_urls,
          progress_ms: data.progress_ms,
          duration_ms: data.item.duration_ms,
        },
        recently_played: false,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Spotify API error:', err)
    return new Response(JSON.stringify({ is_playing: false, item: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' },
    })
  }
}
