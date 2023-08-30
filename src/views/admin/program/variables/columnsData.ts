interface IColumnHeader {
  Header: string
  accessor: string
}

type Columns = IColumnHeader[]

export const columns: Columns = [
  {
    Header: 'Nombres',
    accessor: 'fullName'
  },
  {
    Header: 'Teléfono',
    accessor: 'phone'
  },
  {
    Header: 'Documento',
    accessor: 'numberDocument'
  },
  {
    Header: 'Correo',
    accessor: 'email'
  },
  {
    Header: 'Fecha Creación',
    accessor: 'createdAt'
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
