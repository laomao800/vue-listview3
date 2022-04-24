export default {
  // @ts-ignore
  abstract: true,
  name: 'VNode',
  props: ['node'],
  render() {
    return this.node
  },
}
