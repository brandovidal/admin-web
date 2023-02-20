interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const columns: Columns = [
  {
    Header: "Passenger name",
    accessor: "name",
  },
  {
    Header: "Total trips",
    accessor: "trips",
  },
];
