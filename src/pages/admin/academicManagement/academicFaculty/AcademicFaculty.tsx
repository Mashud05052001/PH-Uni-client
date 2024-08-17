import { Table, TableColumnsType, TableProps } from "antd";
import TableLoader from "../../../../components/loader/TableLoader";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/admin/academicManagement.api";

type TAcademicFaculty = {
  name: string;
};

const columns: TableColumnsType<TAcademicFaculty> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    render: () => <a>action</a>,
  },
];

const AcademicFaculty = () => {
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery({});

  const data = academicFaculty?.data.map((faculty) => ({
    key: faculty._id,
    name: faculty.name,
  }));

  const onChange: TableProps<TAcademicFaculty>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  if (isLoading) {
    return <TableLoader />;
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      loading={isFetching}
    />
  );
};

export default AcademicFaculty;
