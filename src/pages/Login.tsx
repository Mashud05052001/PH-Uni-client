import { Button, Form, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./login.css";
import { FormProvider, useForm } from "react-hook-form";
import PHInput from "../components/form/PHInput";

type TFieldType = {
  Id?: string;
  Password?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data: TFieldType) => {
    const toastId = toast.loading("Logging In...");
    try {
      const userInfo = { id: data.Id, password: data.Password };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Successfully logged in", { id: toastId, duration: 2000 });
      navigate(from);
    } catch (error) {
      const err = error as { status?: number };
      if (err?.status === 404) {
        toast.error(`The user is not found!`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(`Failed to logged in`, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };
  type TFormConfig = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues?: Record<string, any>;
  };

  const formConfig: TFormConfig = {};
  formConfig.defaultValues = { Id: "A-0001", Password: "admin123" };
  // const methods = useForm(formConfig);
  const methods = useForm({
    defaultValues: { Id: "A-0001", Password: "admin123" },
  });

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "25rem" }}
        >
          <PHInput name="Id" type="text" placeholder="Enter your ID" />
          <PHInput
            name="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Form.Item className="login-form-forgot">
            <a href="#">Forgot password</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </form>
      </FormProvider>
    </Row>
  );
};

export default Login;
