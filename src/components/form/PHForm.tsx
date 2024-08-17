/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { changeResetFormState } from "../../redux/features/globalStateManage";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TPHFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const PHForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TPHFormProps) => {
  const state = useAppSelector(
    (state: RootState) => state.globalState.resetFormState
  );
  const dispatch = useAppDispatch();

  const formConfig: TFormConfig = {};
  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm(formConfig);

  // After successfully complete a form simply change the state & here reseting the form
  // useEffect(() => {
  //   if (state) {
  //     methods.reset();
  //     dispatch(changeResetFormState(false));
  //   }
  // }, [state, methods, dispatch]);

  return (
    <FormProvider {...methods}>
      <Form
        onFinish={methods.handleSubmit(onSubmit)}
        layout="vertical"
        style={{
          width: "100%",
          // padding: "2rem",
          // borderRadius: "8px",
          // boxShadow: "#d8d8d8e0 1px 1px 4px 0px",
        }}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
