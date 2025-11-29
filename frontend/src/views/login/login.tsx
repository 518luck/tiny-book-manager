import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Library, LockKeyhole, LockOpen, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useLoginMutation } from "@/apis/hooks/login";
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
  //动画动态
  const [isAPISuccess, setIsAPISuccess] = useState(false);
  const [isAnimationSuccess, setIsAnimationSuccess] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [vanish, setVanish] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (!isAPISuccess) return;
    if (!isAnimationSuccess) return;
    navigate("/book-manage");
  }, [isAPISuccess, isAnimationSuccess, navigate]);
  const { mutateAsync: loginMutateAsync } = useLoginMutation({
    onError: (error) => {
      toast.error(error.response?.data?.message || "登录失败");
    },
    onSuccess: () => {
      toast.success("登录成功");
      // navigate("/book-manage");
      setIsAPISuccess(true);
    },
  });
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

  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data);
    setVanish(true);
    const isValid = await loginMutateAsync(data);
    console.log("🚀 ~ onSubmit ~ isValid:", isValid);
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
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (!vanish) return;
            setIsAnimationSuccess(true);
          }}
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
            <div
              className="w-2/3 cursor-pointer text-sm text-stone-300 hover:text-blue-500"
              onClick={() => navigate("/register")}
            >
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
