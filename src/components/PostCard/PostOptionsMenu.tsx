import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BellOff,
  Bookmark,
  Ellipsis,
  MessageCircleWarning,
  Trash2,
  XSquare,
} from "lucide-react";

const row =
  "flex gap-3 rounded-lg p-2 cursor-pointer transition-colors hover:bg-[#F2F2F2]";

const menuContent = (
  <div className="w-[348px]">
    <div className={`${row} items-start`}>
      <Bookmark className="mt-0.5 h-6 w-6 shrink-0 text-[#050505]" />
      <div>
        <p className="text-[15px] font-semibold text-[#050505]">Lưu bài viết</p>
        <p className="mt-1 text-[13px] leading-tight text-[#65676B]">
          Thêm vào danh sách mục đã lưu.
        </p>
      </div>
    </div>

    <div className="my-1 border-t border-[#CED0D4]" />

    <div className={`${row} items-center`}>
      <Trash2 className="h-6 w-6 shrink-0 text-[#050505]" />
      <p className="text-[15px] font-semibold text-[#050505]">Xóa bài viết</p>
    </div>

    <div className={`${row} items-center`}>
      <BellOff className="h-6 w-6 shrink-0 text-[#050505]" />
      <p className="text-[15px] font-semibold text-[#050505]">
        Tắt thông báo về bài viết này
      </p>
    </div>

    <div className="my-1 border-t border-[#CED0D4]" />

    <div className={`${row} items-start`}>
      <XSquare className="mt-0.5 h-6 w-6 shrink-0 text-[#050505]" />
      <div>
        <p className="text-[15px] font-semibold text-[#050505]">Ẩn khỏi trang cá nhân</p>
        <p className="mt-1 text-[13px] leading-tight text-[#65676B]">
          Bài viết này có thể vẫn xuất hiện ở các nơi khác.
        </p>
      </div>
    </div>

    <div className={`${row} items-start`}>
      <MessageCircleWarning className="mt-0.5 h-6 w-6 shrink-0 text-[#050505]" />
      <div>
        <p className="text-[15px] font-semibold text-[#050505]">Báo cáo bài viết</p>
        <p className="mt-1 text-[13px] leading-tight text-[#65676B]">
          Chúng tôi sẽ không cho người đăng biết ai đã báo cáo.
        </p>
      </div>
    </div>
  </div>
);

const PostOptionsMenu = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      top: rect.bottom + 8,
      left: Math.max(8, rect.right - 348),
    });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`rounded-full p-1.5 text-[#65676B] transition-colors ${
          open ? "bg-[#F2F2F2]" : "hover:bg-[#F2F2F2]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          open ? setOpen(false) : openMenu();
        }}
      >
        <Ellipsis className="h-5 w-5" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 animate-modal-in origin-top-right"
            style={{ top: position.top, left: position.left }}
          >
            <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-[#CED0D4] bg-white" />
            <div className="relative rounded-lg border border-[#CED0D4] bg-white p-2 shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
              {menuContent}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default PostOptionsMenu;
