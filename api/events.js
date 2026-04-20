export default async function handler(req, res) {
  const { category } = req.query
  const key = process.env.EVENTBRITE_KEY

  let url = `https://www.eventbriteapi.com/v3/events/search/?location.address=Brooklyn%2C%20NY&location.within=10mi&sort_by=date&expand=venue%2Ccategory&token=${key}&page_size=24`
  if (category && category !== 'all') url += `&categories=${category}`

  const response = await fetch(url)
  const data = await response.json()

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json(data)
}
