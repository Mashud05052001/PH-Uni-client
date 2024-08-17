import { Button, Col, Flex, Form } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { academicSemesters } from "../../../../constant";
import {
  academicSemestersOptions,
  allMonthsOptions,
  allYearsOptions,
} from "../../../../constant/academicManagement/academicSemesters";
import { useCreateAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagement.api";
import { changeResetFormState } from "../../../../redux/features/globalStateManage";
import { useAppDispatch } from "../../../../redux/hooks";
import { TError, TSuccess } from "../../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schemas/academicManagement";

const options1 = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];

const CreateAcademicSemester = () => {
  const dispatch = useAppDispatch();
  const [addAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const semesterName = data.name as keyof typeof academicSemesters;
    const semesterData = {
      name: data.name,
      code: academicSemesters[semesterName],
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    const loadingId = toast.loading("Creating new academic semester");

    try {
      const result = (await addAcademicSemester(
        semesterData
      ).unwrap()) as TSuccess;
      if (result.success) {
        toast.success("New academic semester created successfully", {
          id: loadingId,
        });
        // reseting form
        dispatch(changeResetFormState(true));
      }

      // method 2
      // const result = (await addAcademicSemester(semesterData)) as TResponse;
      // console.log(result);
      // if (result.data?.success) {
      //   toast.success("New academic semester created successfully", {
      //     id: loadingId,
      //   });
      // } else if (result.error) {
      //   toast.error(Failed to create. ${result.error?.data?.message}, {
      //     id: loadingId,
      //   });
      // }
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <div className="grid md:grid-cols-2 md:gap-x-6">
            <PHSelect
              label="Name"
              name="name"
              placeholder="Select semester"
              options={academicSemestersOptions}
            />
            <PHSelect
              label="Year"
              name="year"
              placeholder="Select year"
              options={allYearsOptions}
            />
            <PHSelect
              label="Start Month"
              name="startMonth"
              placeholder="Select starting month"
              options={options1}
            />
            <PHSelect
              label="End Month"
              name="endMonth"
              placeholder="Select ending month"
              options={[
                { label: "January", value: "january" },
                { label: "February", value: "february" },
                { label: "March", value: "march" },
                { label: "April", value: "april" },
                { label: "May", value: "may" },
                { label: "June", value: "june" },
                { label: "July", value: "july" },
                { label: "August", value: "august" },
                { label: "September", value: "september" },
                { label: "October", value: "october" },
                { label: "November", value: "november" },
                { label: "December", value: "december" },
                { label: "January", value: "january" },
                { label: "February", value: "february" },
                { label: "March", value: "march" },
                { label: "April", value: "april" },
                { label: "May", value: "may" },
                { label: "June", value: "june" },
                { label: "July", value: "july" },
                { label: "August", value: "august" },
                { label: "September", value: "september" },
                { label: "October", value: "october" },
                { label: "November", value: "november" },
                { label: "December", value: "december" },
              ]}
            />
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "1rem" }}
            >
              Create Academic Semester
            </Button>
          </Form.Item>
        </PHForm>
        {/* </Form> */}
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
