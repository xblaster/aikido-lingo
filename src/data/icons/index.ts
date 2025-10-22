/**
 * Icon data barrel export
 */

export { stancesIcons } from './stancesIcons'
export { movementsIcons } from './movementsIcons'
export { techniquesIcons } from './techniquesIcons'
export { gripsIcons } from './gripsIcons'
export { ukemiIcons } from './ukemiIcons'

// Combined export for easy access
export const allIcons = {
  ...require('./stancesIcons').stancesIcons,
  ...require('./movementsIcons').movementsIcons,
  ...require('./techniquesIcons').techniquesIcons,
  ...require('./gripsIcons').gripsIcons,
  ...require('./ukemiIcons').ukemiIcons
}
