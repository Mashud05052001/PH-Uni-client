import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../../schemas/academicManagement";
import { Button, Col, Flex, Form } from "antd";
import PHInput from "../../../../components/form/PHInput";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TError, TSuccess } from "../../../../types";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeResetFormState } from "../../../../redux/features/globalStateManage";

const CreateAcademicFaculty = () => {
  // const [addTodo, { isLoading, isSuccess, isError, data, ... }] = useAddTodoMutation();
  const [addAcademicFaculty] = useCreateAcademicFacultyMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const academicFacultyData = {
      name: data.name,
    };
    const loadingId = toast.loading("Creating new academic faculty");
    // dispatch(changeResetFormState(true));
    try {
      const result = (await addAcademicFaculty(
        academicFacultyData
      ).unwrap()) as TSuccess;
      if (result.success) {
        toast.success("New academic faculty created successfully", {
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

  return (
    <Flex justify="center">
      <Col span={16}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <div>
            <PHInput
              name="name"
              label="Name"
              type="text"
              placeholder="Academic Faculty name"
            />
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "1rem" }}
            >
              Create Academic Faculty
            </Button>
          </Form.Item>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
