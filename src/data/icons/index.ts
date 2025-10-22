/**
 * Icon data barrel export
 * PRIMARY ICONS: Black & White only (#000000)
 */

// Black & White Icon System (NEW STANDARD - USE THIS)
export { blackWhiteIcons } from './blackWhiteIcons'
export {
  etiquetteIcons,
  positionsIcons,
  movementsIcons as bwMovementsIcons,
  ukemiIcons as bwUkemiIcons,
  techniquesIcons as bwTechniquesIcons,
  gripsIcons as bwGripsIcons,
  weaponsIcons,
  principlesIcons,
} from './blackWhiteIcons'

// Legacy colored icons (DEPRECATED - for backward compatibility only)
export { stancesIcons } from './stancesIcons'
export { movementsIcons } from './movementsIcons'
export { techniquesIcons } from './techniquesIcons'
export { gripsIcons } from './gripsIcons'
export { ukemiIcons } from './ukemiIcons'

// Modern colored icons (used in some existing units)
export { modernIcons } from './modernIcons'

// Default export: Black and White icons
export const allIcons = require('./blackWhiteIcons').blackWhiteIcons
