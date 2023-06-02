export interface ActionsProps {
  label: string
  icon: JSX.Element
  onClick: () => void
}

export interface MenuActionsProps {
  actions: ActionsProps[]
}
