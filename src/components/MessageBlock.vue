<script lang="tsx">
import type { PropType } from 'vue'
import Vue from 'vue'
import {
  WarningFilled,
  InfoFilled,
  CircleCloseFilled,
} from '@element-plus/icons-vue'

const iconMap = {
  warning: WarningFilled,
  info: InfoFilled,
  error: CircleCloseFilled,
}

type IconType = keyof typeof iconMap

export default {
  name: 'MessageBlock',

  props: {
    type: {
      type: String as PropType<IconType>,
    },
    text: {},
  },

  render() {
    const className = {
      lv__message: true,
      [`lv__message--${this.type}`]: this.type,
    }
    const Icon = iconMap[this.type] || iconMap['warning']
    return (
      <span class={className}>
        <span class="lv__message-icon">
          <el-icon>
            <Icon />
          </el-icon>
        </span>
        <span class="lv__message-text">{this.text}</span>
      </span>
    )
  },
}
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
