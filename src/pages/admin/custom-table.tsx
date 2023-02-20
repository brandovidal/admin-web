import React, { useState, useEffect } from "react";

import { Box, SimpleGrid } from "@chakra-ui/react";

import Card from "components/card/Card";

import {
  getData,
  formatRowData,
} from "../../views/admin/customTables/variables/data";

import AdminLayout from "layouts/admin";

import Table from "../../views/admin/customTables/components/Table";
import { columns } from "views/admin/customTables/variables/columnsData";

export default function CustomTable() {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    getData(currentPage, pageSize)
      .then((info) => {
        const { totalPages, totalPassengers = 0, data } = info;

        setPageData({
          isLoading: false,
          rowData: formatRowData(data),
          totalPages,
          totalRows: 100,
        });
      })
      .catch((error) => {
        setPageData({
          isLoading: false,
          rowData: [],
          totalPages: 0,
          totalRows: 0,
        });
      });
  }, [currentPage, pageSize]);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <Card
            flexDirection="column"
            w="100%"
            px="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <Table
              columnsData={columns}
              tableData={pageData.rowData}
              isLoading={pageData.isLoading}
              totalRows={pageData.totalRows}
              currentPage={currentPage}
              pageChangeHandler={setCurrentPage}
              pageSize={pageSize}
              pageSizeChangeHandler={setPageSize}
              rowsPerPage={10}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
