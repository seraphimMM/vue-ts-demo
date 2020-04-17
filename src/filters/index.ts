import { filterInjecter } from './filter'

const injecters = [filterInjecter]

for (const item of injecters) {
  item.execute()
}
