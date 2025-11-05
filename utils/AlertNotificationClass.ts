
export const alertClasses: Record<"success" | "error" | "base" | "warning", string> = {
    success: "text-[#30B467] text-[13px] p-2 bg-[#A9F0AC] border border-[#30B467] rounded-[10px] text-center flex item-center justify-center",
    error: "text-[#EF3F3F] text-[13px] p-2 bg-[#FAC0C5] border border-[#EF3F3F] rounded-[10px] text-center flex item-center justify-center",
    base: "hidden",
    warning: "text-[#F6BB3A] text-[13px] p-2 bg-[#FFF8A9] border border-[#F6BB3A] rounded-[10px] text-center flex item-center justify-center"
};

export const recentOrderStatus: Record<"success" | "pending" | "cancel" | "preparing" | "On Delivery", string> = {
    success: "text-green-400 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]",
    cancel: "text-red-400 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]",
    pending: " text-rose-500 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]",
    preparing: " text-blue-300 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]",
    "On Delivery": " text-cyan-300 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]"
};
