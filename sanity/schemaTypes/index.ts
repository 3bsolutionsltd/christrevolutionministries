import { type SchemaTypeDefinition } from 'sanity'

import { ministryType } from './ministryType'
import { sermonType } from './sermonType'
import { eventType } from './eventType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ministryType, sermonType, eventType],
}
