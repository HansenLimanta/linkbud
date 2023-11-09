import { FC, useState, useRef, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Link, useUserStore } from "~/store/userStore";
import * as Switch from "@radix-ui/react-switch";
import { FiTrash2 } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { PiDotsSixVerticalLight } from "react-icons/pi";

type DraggableHeaderProps = {
  link: Link;
  index: number;
};

const DraggableHeader: FC<DraggableHeaderProps> = ({ link, index }) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const updateLink = useUserStore((state) => state.updateLink);
  const removeLink = useUserStore((state) => state.removeLink);

  useEffect(() => {
    setTitle(link.title);
  }, []);

  const handleEditTitle = () => {
    if (titleRef.current?.selectionStart === 0) {
      titleRef.current.setSelectionRange(title.length, title.length);
    }
    titleRef.current?.focus();
    setIsEditTitle(true);
  };

  const handleInput = (input: string, type: string, isActive: boolean) => {
    const updatedLink: Link = { ...link };
    switch (type) {
      case "url":
        updatedLink.url = input;
        break;
      case "title":
        updatedLink.title = input;
        break;
      case "isActive":
        updatedLink.isActive = isActive;
    }
    updateLink(updatedLink);
  };

  return (
    <Draggable
      key={link.id}
      draggableId={link.id!}
      index={index}
      isDragDisabled={false}
    >
      {(provided) => (
        <div
          className={index === 0 ? "py-2" : "pb-2 pt-8"}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white">
            <div
              className="flex w-8 flex-col items-center justify-center py-4 text-center"
              {...provided.dragHandleProps}
            >
              <PiDotsSixVerticalLight size={20} />
            </div>
            <div className="grid w-full grid-cols-[minmax(0,_90%)] items-center justify-center py-4">
              <div
                className={
                  isEditTitle
                    ? "col-start-1 row-start-1 opacity-100"
                    : "pointer-events-none col-start-1 row-start-1 opacity-0"
                }
                onBlur={() => setIsEditTitle(false)}
              >
                <input
                  value={link.title}
                  onChange={(e) =>
                    handleInput(e.target.value, "title", link.isActive)
                  }
                  type="text"
                  ref={titleRef}
                  className="w-full text-center text-sm font-normal focus:outline-none"
                />
              </div>
              <div
                className={
                  isEditTitle
                    ? "col-start-1 row-start-1 hidden"
                    : "col-start-1 row-start-1 inline-flex justify-center"
                }
              >
                <button
                  onClick={handleEditTitle}
                  className="flex max-w-full items-center rounded-sm outline-2 outline-offset-2 focus-visible:outline"
                >
                  <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold text-black">
                    {link.title}
                  </p>
                  <span className="ml-2 flex">
                    <GoPencil />
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-2 py-4">
              <Switch.Root
                checked={link.isActive}
                onCheckedChange={(e) => handleInput("", "isActive", e)}
                className="group relative h-6 w-10 rounded-full bg-gray-500 aria-checked:bg-green-700"
              >
                <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform group-aria-checked:translate-x-[18px]" />
              </Switch.Root>
              <button
                onClick={() => removeLink(link.id)}
                className="rounded-full bg-inherit p-2 text-sm text-red-300 transition-all hover:bg-stone-100 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableHeader;