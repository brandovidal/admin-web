import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Table from "common/Table";

import { TableProps } from "views/admin/default/variables/columnsData";

const CustomTable = ({
  columnsData,
  tableData,
  totalRows,
  isLoading,
  manualPagination = false,
  rowsPerPage,
  currentPage,
  pageChangeHandler,
  pageSize,
  pageSizeChangeHandler,
}: TableProps) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Custom Table{" "}
          <small>({`${totalRows} registros` || "Loading..."})</small>
        </Text>
      </Flex>
      <Table
        columnsData={columnsData}
        tableData={tableData}
        isLoading={isLoading}
        totalRows={totalRows}
        currentPage={currentPage}
        manualPagination={manualPagination}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={pageChangeHandler}
        pageSize={pageSize}
        pageSizeChangeHandler={pageSizeChangeHandler}
        emptyDataMessage="No hay datos disponibles"
      />
    </>
  );
};

export default CustomTable;
