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
    Header: 'Course',
    accessor: 'course'
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
    Header: 'Actions',
    accessor: 'actions'
  }
]
