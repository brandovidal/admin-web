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
    Header: 'start date',
    accessor: 'startDate'
  },
  {
    Header: 'end date',
    accessor: 'endDate'
  },
  {
    Header: 'Total',
    accessor: 'total'
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
