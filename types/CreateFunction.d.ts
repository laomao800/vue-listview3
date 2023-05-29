import { DefineComponent } from 'vue'

import { ListviewProps } from './Props'

type AllowPresetProps =
  | 'pressEnterSearch'
  | 'autoload'
  | 'requestMethod'
  | 'requestConfig'
  | 'transformRequestData'
  | 'transformResponseData'
  | 'contentDataMap'
  | 'contentMessage'
  | 'validateResponse'
  | 'resolveResponseErrorMessage'
  | 'usePage'
  | 'pageSize'
  | 'pageSizes'
  | 'pageAttrs'
  | 'pagePosition'
  | 'height'
  | 'fullHeight'
  | 'searchButton'
  | 'resetButton'

type CreateOptions = Partial<Pick<ListviewProps, AllowPresetProps>> & {
  replaceComponents?: Record<string, DefineComponent>
}

export type CreateFunction = (options?: CreateOptions) => DefineComponent
