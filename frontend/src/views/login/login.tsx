import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, LockOpen, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/views/login/schemas/login-schema";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758]">
      <main className="flex h-[80%] w-[80%] bg-[#030303]">
        {/* 表单录入 */}
        <section className="flex h-full flex-35 flex-col items-center justify-around bg-[#030303] text-white">
          <div className="w-2/3">测试</div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-2/3 flex-col gap-6"
          >
            <p className="text-3xl">Sign In</p>
            {/* 账号 */}
            <div className="flex flex-col gap-1">
              <InputGroupText className="text-stone-300">
                User Username
              </InputGroupText>
              <InputGroup className="h-12">
                <InputGroupInput
                  placeholder="Enter Username"
                  {...register("username")}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* 密码 */}
            <div className="flex flex-col gap-1">
              <InputGroupText className="text-stone-300">
                Password
              </InputGroupText>
              <InputGroup className="h-12">
                <InputGroupInput
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password")}
                />
                <InputGroupAddon
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="cursor-pointer"
                >
                  {isShowPassword ? <LockKeyhole /> : <LockOpen />}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 登录按钮 */}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="w-2/3 text-sm text-stone-300">
            Dot't have an account? Sign up
          </div>
        </section>

        {/* 图片展示 */}
        <section className="h-full flex-65 bg-[#463737]"></section>
      </main>
    </div>
  );
};

export default Login;
