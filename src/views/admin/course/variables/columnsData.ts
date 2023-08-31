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
    Header: 'Code',
    accessor: 'code'
  },
  {
    Header: 'Unique Program',
    accessor: 'uniqueProgram'
  },
  {
    Header: 'Fecha creación',
    accessor: 'date'
  },
  {
    Header: 'Actions',
    accessor: 'actions'
  }
]
