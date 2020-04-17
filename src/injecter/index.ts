import { environment } from './environment-injecter'
import { uiInjecter } from './ui-injecter'
import { componentInjecter } from '@/components/index'

const injecters = [environment, uiInjecter, componentInjecter]

for (const item of injecters) {
  item.execute()
}
