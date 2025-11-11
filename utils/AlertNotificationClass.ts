
export const alertClasses: Record<"success" | "error" | "base" | "warning", string> = {
    success: "text-[#30B467] text-[13px] p-2 bg-[#A9F0AC] border border-[#30B467] rounded-[10px] text-center flex item-center justify-center",
    error: "text-[#EF3F3F] text-[13px] p-2 bg-[#FAC0C5] border border-[#EF3F3F] rounded-[10px] text-center flex item-center justify-center",
    base: "hidden",
    warning: "text-[#F6BB3A] text-[13px] p-2 bg-[#FFF8A9] border border-[#F6BB3A] rounded-[10px] text-center flex item-center justify-center"
};

export const recentOrderStatus: Record<"success" | "pending" | "cancel" | "preparing" | "On Delivery", string> = {
    success: "text-[#30B467] text-[13px] py-[2px] px-3 bg-[#A9F0AC] rounded-[10px] text-center flex item-center justify-center",
    cancel: "text-red-400 text-[13px] py-[2px] px-3 bg-red-200 rounded-[10px] text-center flex item-center justify-center",
    pending: "text-rose-500 text-[13px] py-[2px] px-3 bg-rose-200 rounded-[10px] text-center flex item-center justify-center",
    preparing: "text-blue-400 text-[13px] py-[2px] px-3 bg-blue-100 rounded-[10px] text-center flex item-center justify-center",
    "On Delivery": "text-cyan-400 text-[13px] py-[2px] px-3 bg-cyan-100 rounded-[10px] text-center flex item-center justify-center"
};
