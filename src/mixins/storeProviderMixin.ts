import Vue from 'vue'

export default {
  inject: {
    lvStore: {
      default: () => ({}),
    },
  },

  methods: {
    $rootEmitProxy(event: string, ...args: any[]) {
      this.lvStore.$rootEmitProxy(event, ...args)
    },
  },
}
