
export const alertClasses: Record<"success" | "error" | "base" | "warning", string> = {
    success: "text-[#30B467] text-[13px] p-2 bg-[#A9F0AC] border border-[#30B467] rounded-[10px] text-center flex item-center justify-center",
    error: "text-[#EF3F3F] text-[13px] p-2 bg-[#FAC0C5] border border-[#EF3F3F] rounded-[10px] text-center flex item-center justify-center",
    base: "hidden",
    warning: "text-[#F6BB3A] text-[13px] p-2 bg-[#FFF8A9] border border-[#F6BB3A] rounded-[10px] text-center flex item-center justify-center"
};

export const recentOrderStatus: Record<"success" | "pending" | "cancel" | "preparing" | "On Delivery", string> = {
    success: "text-[#30B467] bg-[#A9F0AC] w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]",
    cancel: "text-red-400 bg-red-200 w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]",
    pending: "text-rose-500  bg-rose-200 w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]",
    preparing: "text-blue-400  bg-blue-100 w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]",
    "On Delivery": "text-cyan-400 bg-cyan-100 w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]"
};
