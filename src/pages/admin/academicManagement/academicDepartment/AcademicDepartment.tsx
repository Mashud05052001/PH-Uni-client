import { Table, TableColumnsType, TableProps } from "antd";
import TableLoader from "../../../../components/loader/TableLoader";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagement.api";
import { EditTwoTone } from "@ant-design/icons";

type TAcademicDepartment = {
  academicDepartment: string;
  academicFaculty: string;
};

const columns: TableColumnsType<TAcademicDepartment> = [
  {
    title: "Academic Department",
    dataIndex: "academicDepartment",
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
  {
    title: "Action",
    render: () => <EditTwoTone />,
  },
];

const AcademicDepartment = () => {
  const {
    data: academicDepartment,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentQuery({});
  const data = academicDepartment?.data.map((item) => ({
    key: item._id,
    academicDepartment: item.name,
    academicFaculty: item.academicFaculty.name,
  }));

  const onChange: TableProps<TAcademicDepartment>["onChange"] = (
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

export default AcademicDepartment;
