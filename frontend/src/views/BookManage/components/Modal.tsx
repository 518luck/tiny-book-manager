import { Plus } from "lucide-react";

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
interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal = ({ open, onClose }: ModalProps) => {
  const { VITE_API_BASE_URL } = import.meta.env;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* 打开弹窗的按钮 */}

      {/* 弹窗内容 */}
      <DialogContent className="border border-[#333333] bg-[#333333] text-white">
        <DialogHeader>
          <DialogTitle>新增书籍</DialogTitle>

          <form className="mt-5 flex w-full flex-col items-start justify-center gap-5">
            <div className="flex items-center justify-start gap-10">
              <label htmlFor="book-name">书籍名称</label>
              <Input
                id="book-name"
                className="w-50"
                placeholder="请输入书籍名称"
              />
            </div>

            <div className="flex items-center justify-start gap-10">
              <label htmlFor="book-author">书籍作者</label>
              <Input
                id="book-author"
                className="w-50"
                placeholder="请输入书籍作者"
              />
            </div>

            <div className="flex items-center justify-start gap-10">
              <label>书籍描述</label>
              <Textarea className="w-50" placeholder="请输入书籍作者" />
            </div>

            <div className="flex items-center justify-start gap-10">
              <label>书籍封面</label>
              <img
                src={`${VITE_API_BASE_URL}/uploads/1764037520489-370086747-%E5%A4%B4%E5%83%8F.png`}
                alt="book"
                className="h-20 w-15 object-cover"
              />
            </div>

            <div className="flex items-center justify-start gap-10">
              <div>上传封面</div>
              <div>
                <Input
                  id="book-cover"
                  type="file"
                  className="hidden"
                  placeholder="请上传封面"
                />
                <label
                  htmlFor="book-cover"
                  className="flex h-30 w-50 items-center justify-center rounded-md border border-solid border-white"
                >
                  <Plus size={24} />
                </label>
              </div>
            </div>

            <Button className="w-77">新增</Button>
          </form>
        </DialogHeader>

        {/* 底部按钮 */}
        <DialogFooter>
          <Button className="text-white" variant="link" onClick={onClose}>
            取消
          </Button>
          <Button>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
