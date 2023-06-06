interface IColumnHeader {
  Header: string
  accessor: string
}

type Columns = IColumnHeader[]

export const columns: Columns = [
  {
    Header: 'Usuario',
    accessor: 'username'
  },
  {
    Header: 'Nombre',
    accessor: 'name'
  },
  {
    Header: 'Correo',
    accessor: 'email'
  },
  {
    Header: 'Rol',
    accessor: 'role'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Acciones',
    accessor: 'actions'
  }
]
