<template>
  <span class="lv__message" :class="{ [`lv__message--${type}`]: type }">
    <span class="lv__message-icon">
      <ElIcon>
        <Icon />
      </ElIcon>
    </span>
    <span class="lv__message-text">{{ text || '' }}</span>
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
.lv__message {
  display: flex;
  padding: 15px 20px;
  line-height: 30px;
  border-radius: 5px;
  box-shadow: 0 0 15px #ddd;

  &-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
    font-size: 24px;
  }

  &-icon {
    color: #459ffc;
  }

  &-text {
    font-size: 14px;
    text-align: left;
  }

  &--warning &-icon {
    color: #f90;
  }

  &--error &-icon {
    color: #f56c6c;
  }
}
</style>
