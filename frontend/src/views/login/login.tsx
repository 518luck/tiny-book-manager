import { LockKeyhole, LockOpen, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758]">
      <main className="flex h-[80%] w-[80%] bg-[#030303]">
        {/* 表单录入 */}
        <section className="flex h-full flex-35 flex-col items-center justify-around bg-[#030303] text-white">
          <div className="w-2/3">测试</div>

          <div className="flex w-2/3 flex-col gap-6">
            <p className="text-3xl">Sign In</p>
            {/* 账号 */}
            <div className="flex flex-col gap-1">
              <InputGroupText className="text-stone-300">
                User Account
              </InputGroupText>
              <InputGroup className="h-12">
                <InputGroupInput placeholder="Enter Account" />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </div>
            {/* 密码 */}
            <div className="flex flex-col gap-1">
              <InputGroupText className="text-stone-300">
                Password
              </InputGroupText>
              <InputGroup className="h-12">
                <InputGroupInput placeholder="Enter Password" />
                <InputGroupAddon
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="cursor-pointer"
                >
                  {isShowPassword ? <LockKeyhole /> : <LockOpen />}
                </InputGroupAddon>
              </InputGroup>
            </div>
            {/* 登录按钮 */}
            <Button className="w-full">Sign In</Button>
          </div>

          <div className="w-2/3 text-sm text-stone-300">
            Dot't have an accout? Sign up
          </div>
        </section>

        {/* 图片展示 */}
        <section className="h-full flex-65 bg-[#463737]"></section>
      </main>
    </div>
  );
};

export default Login;
