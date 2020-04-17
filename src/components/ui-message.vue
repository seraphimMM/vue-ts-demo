<template>
  <div class="ui-message" :class="type">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IComponent } from './interface'

@Component({ components: {} })
export default class UiMessage extends Vue implements IComponent {
  public name = 'ui-message'

  @Prop({
    default: '',
    required: false,
    type: String,
    validator: v => {
      return !v || ['success'].indexOf(v) > -1
    }
  })
  private type!: string
}
</script>

<style lang="less" scoped>
</style>
