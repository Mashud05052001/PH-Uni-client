import { Button, Col, Flex, Form } from "antd";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../../schemas/academicManagement";
import PHSelect from "../../../../components/form/PHSelect";
import { TError, TSelect, TSuccess } from "../../../../types";
import TableLoader from "../../../../components/loader/TableLoader";
import PHInput from "../../../../components/form/PHInput";
import { toast } from "sonner";
import { changeResetFormState } from "../../../../redux/features/globalStateManage";
import { useAppDispatch } from "../../../../redux/hooks";

const CreateAcademicDepartment = () => {
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery({});
  // const [addTodo, { isLoading, isSuccess, isError, data, ... }] = useAddTodoMutation();
  const [addAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const dispatch = useAppDispatch();

  const academicFacultyOptions: TSelect =
    academicFaculty?.data.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (
    academicDepartmentData
  ) => {
    const loadingId = toast.loading("Creating new academic department");
    // dispatch(changeResetFormState(true));
    try {
      const result = (await addAcademicDepartment(
        academicDepartmentData
      ).unwrap()) as TSuccess;
      if (result.success) {
        toast.success("New academic department created successfully", {
          id: loadingId,
        });
        // reseting form
        // TODO : Resetting text input remaining
        dispatch(changeResetFormState(true));
      }
    } catch (error) {
      toast.error(`Failed to create. ${(error as TError)?.data?.message}`, {
        id: loadingId,
      });
    }
  };

  if (isLoading || isFetching) {
    return <TableLoader />;
  }
  return (
    <Flex justify="center">
      <Col span={16}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <div className="grid md:grid-cols-2 md:gap-x-6">
            <PHInput
              name="name"
              label="Name"
              type="text"
              placeholder="Academic Department"
            />
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              placeholder="Select academic faculty"
              options={academicFacultyOptions}
            />
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "1rem" }}
            >
              Create Academic Department
            </Button>
          </Form.Item>
        </PHForm>
        {/* </Form> */}
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
