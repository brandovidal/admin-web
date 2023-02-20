import { Select } from "@chakra-ui/react";

import { PageSizeFilterProps } from "views/admin/default/variables/columnsData";

export const PageSizeFilter = ({
  pageSize = 10,
  pageSizes = [10, 25, 50, 100, 250, 500],
  setPageSize,
}: PageSizeFilterProps) => {
  return (
    <Select
      fontSize="sm"
      minWidth="150px"
      maxWidth="200px"
      mr={4}
      color="gray.500"
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
    >
      {pageSizes.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize} registros
        </option>
      ))}
    </Select>
  );
};
