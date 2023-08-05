interface IColumnHeader {
  Header: string
  accessor: string
}

type Columns = IColumnHeader[]

export const columns: Columns = [
  {
    Header: 'User',
    accessor: 'username'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Role',
    accessor: 'role'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Acctions',
    accessor: 'actions'
  }
]
