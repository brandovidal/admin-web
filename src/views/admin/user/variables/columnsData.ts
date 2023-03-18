interface IColumnHeader {
  Header: string
  accessor: string
}

type Columns = IColumnHeader[]

export const columns: Columns = [
  {
    Header: 'Nombre',
    accessor: 'name'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Rol',
    accessor: 'role'
  },
  {
    Header: 'Acciones',
    accessor: 'actions'
  }
]
