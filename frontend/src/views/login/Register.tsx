import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/views/login/schemas/register.schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758] text-stone-300">
      <main className="flex h-[76%] w-[80%] items-center justify-center bg-[#030303]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit((data) => {
              console.log(data);
            })();
          }}
          className="flex flex-col gap-4"
        >
          {/* 账号 */}
          <div>
            <InputGroupText className="text-stone-300">
              User Username
            </InputGroupText>
            <InputGroup>
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput
                {...register("username")}
                placeholder="Enter Username"
              />
            </InputGroup>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* 密码 */}
          <div>
            <InputGroupText className="text-stone-300">Password</InputGroupText>
            <InputGroup>
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <InputGroupInput
                {...register("password")}
                placeholder="Enter Password"
              />
            </InputGroup>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 确认密码 */}
          <div>
            <InputGroupText className="text-stone-300">
              Confirm Password
            </InputGroupText>
            <InputGroup>
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <InputGroupInput
                {...register("confirmPassword")}
                placeholder="Enter Confirm Password"
              />
            </InputGroup>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* 提交 */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Login;
