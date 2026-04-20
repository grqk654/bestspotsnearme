export default async function handler(req, res) {
  const { category } = req.query
  const key = process.env.EVENTBRITE_KEY

  if (!key) {
    res.status(500).json({ error: 'Missing API key' })
    return
  }

  let url = `https://www.eventbriteapi.com/events/search/?location.address=Brooklyn%2C%20NY&location.within=10mi&sort_by=date&expand=venue%2Ccategory&page_size=24`
  if (category && category !== 'all') url += `&categories=${category}`

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}
