// interfaces
import type { NextRouter } from 'next/router'
import type { AlertProps } from '../common/Alert'
import type { TableProps } from '../common/Table'

export interface ViewListProps extends TableProps {
  handleAdd: () => void
  handleRefresh: () => void
}

export interface ViewProps {
  router?: NextRouter
  alert?: AlertProps
  isSubmitting: boolean
  isDisabled: boolean
  control: unknown
  watch?: any
  setValue?: any
  onSubmit: React.FormEventHandler
  onCancel: () => void
}
export interface ViewAddProps extends ViewProps { }

export interface ViewEditProps extends ViewProps { }
