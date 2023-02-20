import { useMemo } from "react";

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { TableProps } from "views/admin/default/variables/columnsData";

import ReactTable from "libs/ReactTable/ReactTable";
import Pagination from "libs/ReactTable/Pagination";
import { PageSizeFilter } from "libs/ReactTable/PageSizeFilter";
import { GlobalFilter } from "libs/ReactTable/GlobalFilter";

import { useGlobalFilter, useSortBy, useTable } from "react-table";

const Table = ({
  columnsData,
  tableData,
  totalRows,
  isLoading,
  manualPagination = false,
  emptyDataMessage,
  rowsPerPage,
  currentPage,
  pageChangeHandler,
  pageSize,
  pageSizeChangeHandler,
}: TableProps) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
      manualPagination,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" py="10">
          <Text color={textColor}>Loading...</Text>
        </Flex>
      ) : (
        <>
          <Flex
            flexDirection={["column", "column", "row", "row"]}
            justifyContent="space-between"
            alignItems="center"
            mx={4}
          >
            <PageSizeFilter
              pageSize={pageSize}
              setPageSize={pageSizeChangeHandler}
            />
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              placeholder={"Buscar por nombre"}
            />
          </Flex>
          <Flex flexDir="column" overflow="auto">
            <ReactTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              rows={rows}
              isLoading={isLoading}
              emptyDataMessage={emptyDataMessage}
            />
          </Flex>
          <Pagination
            totalRows={totalRows}
            isLoading={isLoading}
            currentPage={currentPage}
            pageChangeHandler={pageChangeHandler}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
    </>
  );
};

export default Table;
