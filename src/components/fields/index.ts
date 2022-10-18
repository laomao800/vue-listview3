import fieldCascader from './FieldCascader.vue'
import fieldDate from './FieldDate.vue'
import fieldDateRange from './FieldDateRange.vue'
import fieldDateTime from './FieldDateTime.vue'
import fieldDateTimeRange from './FieldDateTimeRange.vue'
import fieldLabel from './FieldLabel.vue'
import fieldNumber from './FieldNumber.vue'
import fieldSelect from './FieldSelect.vue'
import fieldText from './FieldText.vue'
import fieldTimePicker from './FieldTimePicker.vue'
import fieldTimePickerRange from './FieldTimePickerRange.vue'
import fieldTimeSelect from './FieldTimeSelect.vue'

const fieldComponentsMap = {
  cascader: fieldCascader,
  date: fieldDate,
  dateRange: fieldDateRange,
  dateTime: fieldDateTime,
  dateTimeRange: fieldDateTimeRange,
  label: fieldLabel,
  number: fieldNumber,
  select: fieldSelect,
  text: fieldText,
  timePicker: fieldTimePicker,
  timePickerRange: fieldTimePickerRange,
  timeSelect: fieldTimeSelect,

  /** @deprecated */
  multipleSelect: fieldSelect,
}

export function getFieldComponent(type: keyof typeof fieldComponentsMap) {
  return fieldComponentsMap[type] || null
}
