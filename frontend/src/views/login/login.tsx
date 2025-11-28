import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Library, LockKeyhole, LockOpen, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const [vanish, setVanish] = useState(false);
  const [hidden, setHidden] = useState(false);

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
    setVanish(true);
    // navigate("/book-manage");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758]">
      <main className="flex h-[76%] w-[80%] bg-[#030303]">
        {/* 表单录入 */}
        <section
          className={clsx(
            "flex h-full flex-col items-center justify-around bg-[#030303] text-white transition-all duration-700",
            vanish ? "w-full" : "w-[380px]",
          )}
        >
          {!hidden && (
            <div className="flex w-2/3 items-end justify-start">
              <Library className="mr-1 h-8 w-8" />
              <p>图书馆</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <p className="text-3xl">Sign In</p>
            {!hidden && (
              <div
                className={clsx(
                  "flex flex-col gap-6 transition-all duration-500",
                  vanish
                    ? "pointer-events-none translate-y-50 opacity-0"
                    : "translate-y-0 opacity-100",
                )}
                onTransitionEnd={(e) => {
                  if (e.target !== e.currentTarget) return;
                  if (!vanish) return;
                  setHidden(vanish);
                  navigate("/book-manage");
                }}
              >
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
              </div>
            )}
          </form>

          {!hidden && (
            <div className="w-2/3 text-sm text-stone-300">
              Dot't have an account? Sign up
            </div>
          )}
        </section>

        {/* 图片展示 */}
        <section className="h-full flex-65 bg-[#463737]">
          <img
            src="/imgs/bookshelf.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </section>
      </main>
    </div>
  );
};

export default Login;
