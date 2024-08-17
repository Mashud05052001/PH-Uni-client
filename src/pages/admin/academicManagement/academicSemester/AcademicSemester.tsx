import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../../types/academicManagement.type";
import { generateUpperCaseWords } from "../../../../utils/function";
import TableLoader from "../../../../components/loader/TableLoader";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Autumn",
        value: "autumn",
      },
      {
        text: "Summer",
        value: "summer",
      },
      {
        text: "Winter",
        value: "winter",
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
    ],
    // sorter: (a, b) => a.year.localeCompare(b.year),
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

const AcademicSemester = () => {
  const [query, setQuery] = useState<Record<string, unknown>>({});

  const {
    data: academicSemester,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(query);

  const data = academicSemester?.data.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name: generateUpperCaseWords(name),
      year,
      startMonth: generateUpperCaseWords(startMonth),
      endMonth: generateUpperCaseWords(endMonth),
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter" && Object.keys(filters).length) {
      const obj: Record<string, unknown> = {};
      for (const item in filters) {
        if (filters[item]) obj[item] = filters[item]?.join(",");
      }
      setQuery(obj);
    }
  };

  if (isLoading) {
    return <TableLoader />;
  }
  return (
    <Table
      columns={columns}
      dataSource={data as TTableData[]}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      loading={isFetching}
    />
  );
};

export default AcademicSemester;
