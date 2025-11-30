import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCreateBookMutation,
  useUpdateBookMutation,
  useUploadImageMutation,
} from "@/apis/hooks/books";
import { Button } from "@/components/ui/button";
import {
  Dialog, //根容器，包裹整个弹窗逻辑，相当于 Modal
  // DialogClose, //弹窗关闭按钮，放在内容区内部，也可以单独使用
  DialogContent, //弹窗主体内容，带动画和关闭按钮逻辑
  // DialogDescription, //弹窗描述文字，类似副标题
  DialogFooter, //弹窗底部，通常放按钮（确认、取消等）
  DialogHeader, //弹窗头部，用来放标题或副标题
  // DialogOverlay, //遮罩层，点击或关闭按钮可关闭弹窗
  // DialogPortal, //Portal 容器，把弹窗渲染到 body 里，避免 z-index 问题
  DialogTitle, //弹窗标题
  // DialogTrigger, //触发按钮/元素，点击后打开 Dialog
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateBookSchemaType } from "@/views/BookManage/schemas/create-book-schemas";
import { createBookSchema } from "@/views/BookManage/schemas/create-book-schemas";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  id?: string; //判断更新还是创建
}
const Modal = ({ open, onClose, id }: ModalProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateBookSchemaType>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      name: "",
      author: "",
      description: "",
      cover: "",
    },
  });
  const { VITE_API_BASE_URL } = import.meta.env;
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    undefined,
  );

  //创建书籍
  const { mutateAsync: createBookMutateAsync } = useCreateBookMutation({
    onError: (error) => {
      toast.error(error.response?.data?.message || "创建书籍失败");
    },
    onSuccess: () => {
      toast.success("创建书籍成功");
      onClose();
    },
  });

  //更新书籍
  const { mutateAsync: updateBookMutateAsync } = useUpdateBookMutation({
    onError: (error) => {
      toast.error(error.response?.data?.message || "更新书籍失败");
    },
    onSuccess: () => {
      toast.success("更新书籍成功");
      onClose();
    },
  });

  //上传图片
  const { mutateAsync: uploadImageMutateAsync } = useUploadImageMutation({
    onError: () => {
      // toast.error(error.response?.data?.message || "上传图片失败");
    },
    onSuccess: (data) => {
      toast.success("上传图片成功");
      if (typeof data === "string") {
        const url = data.replace(/\\/g, "/");
        setValue("cover", url);
        setCoverPreview(url);
      }
    },
  });

  const onSubmit = async () => {
    const newData = getValues();
    if (id) {
      //更新书籍
      await updateBookMutateAsync({ id, ...newData });
    } else {
      //创建书籍
      await createBookMutateAsync(newData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* 打开弹窗的按钮 */}

      {/* 弹窗内容 */}
      <DialogContent className="border border-[#333333] bg-[#333333] text-white">
        <DialogHeader>
          <DialogTitle>{id ? "更新书籍" : "新增书籍"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex w-full flex-col items-start justify-center gap-5"
        >
          <div className="flex items-center justify-start gap-10">
            <label htmlFor="book-name">书籍名称</label>
            <div>
              <Input
                id="book-name"
                className="w-50"
                placeholder="请输入书籍名称"
                {...register("name")}
              />
              {errors.name && (
                <div className="text-sm text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start gap-10">
            <label htmlFor="book-author">书籍作者</label>
            <div>
              <Input
                id="book-author"
                className="w-50"
                placeholder="请输入书籍作者"
                {...register("author")}
              />
              {errors.author && (
                <div className="text-sm text-red-500">
                  {errors.author.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start gap-10">
            <label>书籍描述</label>
            <div>
              <Textarea
                className="w-50"
                placeholder="请输入书籍描述"
                {...register("description")}
              />
              {errors.description && (
                <div className="text-sm text-red-500">
                  {errors.description.message}
                </div>
              )}
            </div>
          </div>
          {id && (
            <div className="flex items-center justify-start gap-10">
              <label>书籍封面</label>
              <img
                src={`${VITE_API_BASE_URL}/uploads/1764037520489-370086747-%E5%A4%B4%E5%83%8F.png`}
                alt="book"
                className="h-20 w-15 object-cover"
              />
            </div>
          )}
          <div className="flex items-center justify-start gap-10">
            <div>上传封面</div>
            <div>
              <div>
                <Input
                  id="book-cover"
                  type="file"
                  className="hidden"
                  placeholder="请上传封面"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await uploadImageMutateAsync(file);
                    }
                  }}
                />
                <label
                  htmlFor="book-cover"
                  className="flex h-30 w-50 cursor-pointer items-center justify-center rounded-md border border-solid border-white"
                >
                  {coverPreview ? (
                    <img
                      src={`${VITE_API_BASE_URL}/${coverPreview}`}
                      alt="封面预览"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Plus size={24} />
                  )}
                </label>
              </div>
              {errors.cover && (
                <div className="text-sm text-red-500">
                  {errors.cover.message}
                </div>
              )}
            </div>
          </div>
          {/* 底部按钮 */}
          <DialogFooter className="flex w-full justify-end gap-5">
            <Button className="text-white" variant="link" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">{id ? "更新书籍" : "新增书籍"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
