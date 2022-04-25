export default {
  inject: {
    lvStore: {
      default: () => ({}),
    },
  },

  methods: {
    $rootEmitProxy(event: string, ...args: any[]) {
      // @ts-ignore
      this.lvStore.$rootEmitProxy(event, ...args)
    },
  },
}
