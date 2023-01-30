export default function adventureLink(adventure) {
  let parts = [
    'adventures',
    adventure.year,
    adventure.month,
    adventure.day,
    adventure.slug
  ]

  return `/${parts.join('/')}`
}
