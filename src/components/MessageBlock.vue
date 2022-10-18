<template>
  <span class="lv-message" :class="{ [`lv-message--${type}`]: type }">
    <span class="lv-message__icon">
      <ElIcon>
        <Icon />
      </ElIcon>
    </span>
    <span class="lv-message__text">{{ text || '' }}</span>
  </span>
</template>

<script lang="tsx" setup>
import {
  WarningFilled,
  InfoFilled,
  CircleCloseFilled,
} from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

const iconMap = {
  warning: WarningFilled,
  info: InfoFilled,
  error: CircleCloseFilled,
}

const props = defineProps({
  type: {
    type: String,
    default: 'warning',
  },
  text: {
    type: String,
    default: '',
  },
})

const Icon = iconMap[props.type as keyof typeof iconMap] || iconMap['warning']
</script>

<style lang="less">
.lv-message {
  display: flex;
  padding: 15px 20px;
  line-height: 30px;
  border-radius: 5px;
  box-shadow: 0 0 15px #ddd;

  &__icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
    font-size: 24px;
  }

  &__icon {
    color: #459ffc;
  }

  &__text {
    font-size: 14px;
    text-align: left;
  }

  &--warning &__icon {
    color: #f90;
  }

  &--error &__icon {
    color: #f56c6c;
  }
}
</style>
