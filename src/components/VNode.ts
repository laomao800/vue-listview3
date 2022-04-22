import Vue from 'vue'

export default {
  // @ts-ignore
  abstract: true,
  name: 'VNode',
  props: ['node'],
  render() {
    /* istanbul ignore next */
    return this.node
  },
}
