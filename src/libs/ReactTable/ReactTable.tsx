import { useMemo } from "react";

import { useSortBy, useTable } from "react-table";

import {
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import { ReactTableProps } from "views/admin/default/variables/columnsData";

const ReactTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  rows,
  isLoading,
  emptyDataMessage = "No hay datos disponibles",
}: ReactTableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" py="10">
          <Text color="gray.500">Loading...</Text>
        </Flex>
      ) : (
        <>
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            my="24px"
          >
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe="10px"
                      key={index}
                      borderColor={borderColor}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        fontSize={{ sm: "xs", lg: "sm" }}
                        color="gray.500"
                      >
                        {column.render("Header")}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                          color={textColor}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Center
            display={{ base: rows.length > 0 ? "none" : "flex" }}
            my={[4, 4, 6, 8]}
            color="gray.400"
          >
            {emptyDataMessage}
          </Center>
        </>
      )}
    </>
  );
};

export default ReactTable;
