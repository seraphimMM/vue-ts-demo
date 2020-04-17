import Vue from 'vue'
import { IInjecter, IPopupService } from './interface'

import {
  Button,
  Select,
  Input,
  MessageBox,
  Notification,
  Loading,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'

const uiComponents = [
  Button,
  Select,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
]

const uiInjecter: IInjecter = {
  execute: () => {
    for (const item of uiComponents) {
      Vue.use(item)
    }

    // element ui 的loading注入稍有不同
    Vue.use(Loading.directive)

    const popup: IPopupService = {
      info: (message) => Notification.info(message),
      warn: (message) => Notification.warning(message),
      success: (message) => Notification.success(message),
      confirm: (message) => MessageBox.confirm(message),
    }

    Vue.prototype.popup = popup
  },
}

export { uiInjecter }
