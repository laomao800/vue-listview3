<template>
  <StoreProvider
    ref="storeProvider"
    v-bind="mergedAttrs"
    @root-emit="(...args) => $emit.bind(this)(...args)"
  >
    <ListviewLayout
      ref="layout"
      v-bind="mergedAttrs"
      @update-layout="_handleUpdateLayout"
    >
      <template #header>
        <component :is="_header" v-bind="mergedAttrs" />
      </template>
      <template #filterbar>
        <component
          :is="_filterbar"
          ref="filterbar"
          v-bind="mergedAttrs"
          @fold-change="_handleFilterFold"
        >
          <slot slot="filterbar-top" name="filterbar-top" />
          <slot slot="filterbar-bottom" name="filterbar-bottom" />
          <slot slot="filterbar-left" name="filterbar-left" />
          <slot slot="filterbar-right" name="filterbar-right" />
          <slot slot="prepend-more" name="prepend-more" />
          <slot slot="append-more" name="append-more" />
          <slot slot="prepend-submit" name="prepend-submit" />
          <slot slot="append-submit" name="append-submit" />
        </component>
      </template>
      <template #content="props">
        <slot v-bind="props">
          <component :is="_content" v-bind="mergedAttrs" />
        </slot>
      </template>
      <template #footer>
        <component :is="_footer" v-bind="mergedAttrs">
          <!-- <template #footer-left>
            <slot name="footer-left" />
          </template> -->
          <slot slot="footer-left" name="footer-left" />
          <slot slot="footer-center" name="footer-center" />
          <slot slot="footer-right" name="footer-right" />
        </component>
      </template>
    </ListviewLayout>
  </StoreProvider>
</template>

<!-- <script setup lang="tsx">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const selection = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script> -->

<script lang="tsx">
import { defineComponent, DefineComponent } from 'vue'
import { debounce, isPlainObject } from 'lodash-es'
import StoreProvider from '@/components/StoreProvider.vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import Filterbar from '@/components/Filterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'
import { get } from '@/utils'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Listview',

  components: {
    StoreProvider,
    ListviewLayout,
  },

  inheritAttrs: false,

  computed: {
    mergedAttrs(): Record<string, any> {
      const preset = (this as any).presetProps__
      return isPlainObject(preset) ? { ...preset, ...this.$attrs } : this.$attrs
    },
    _header() {
      return this._getReplaceComponent('header', ListviewHeader)
    },
    _filterbar() {
      return this._getReplaceComponent('filterbar', Filterbar)
    },
    _content() {
      return this._getReplaceComponent('content', ListviewContent)
    },
    _footer() {
      return this._getReplaceComponent('footer', ListviewContentFooter)
    },
  },

  mounted() {
    this.$nextTick(() => this.updateLayout())
  },

  methods: {
    search(keepInPage: boolean) {
      return (this.$refs.storeProvider as any).search(keepInPage)
    },
    resetFilter() {
      ;(this.$refs.filterbar as any).handleFilterReset()
    },
    setContentMessage(text: string, type: string, cleanData = false) {
      ;(this.$refs.storeProvider as any).setContentMessage(
        text,
        type,
        cleanData
      )
    },
    updateLayout: debounce(
      function () {
        // @ts-ignore
        this._updateWrapperLayout()
      },
      0,
      { leading: true }
    ),
    _updateWrapperLayout() {
      try {
        ;(this.$refs.layout as any).updateLayout()
      } catch (e) {}
    },
    _updateFilterLayout() {
      try {
        ;(this.$refs.filterbar as any).updateLayout()
      } catch (e) {}
    },
    _handleUpdateLayout() {
      this.$nextTick().then(() => this._updateFilterLayout())
    },
    _handleFilterFold() {
      this.$nextTick().then(() => this._updateWrapperLayout())
    },
    _getReplaceComponent(name: string, defaultComp: DefineComponent) {
      return get((this as any).replaceComponents__, name, defaultComp)
    },
  },
})
</script>
