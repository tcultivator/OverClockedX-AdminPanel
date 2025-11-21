"use client";
import React from "react";
import { DotLoader } from "react-spinners";
import { Label } from "@radix-ui/react-label";
import { useLoading } from "@/stores/loadingStore";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const ActionLoading = () => {
    const actionLoading = useLoading((state) => state.actionLoading);

    const DisplayLayout = () => {
        if (!actionLoading.display) return null;

        let icon: React.ReactNode;
        let message = actionLoading.loadingMessage;

        const ICON_SIZE = 60; // Fixed size in px

        switch (actionLoading.status) {
            case "loading":
                icon = <DotLoader size={ICON_SIZE} speedMultiplier={1.5} color="white" />;
                break;

            case "success":
                icon = <FiCheckCircle className="text-green-400" style={{ fontSize: ICON_SIZE }} />;
                message = actionLoading.loadingMessage;
                break;

            case "error":
                icon = <FiXCircle className="text-red-500" style={{ fontSize: ICON_SIZE }} />;
                message = actionLoading.loadingMessage;
                break;

            default:
                return null;
        }

        return (
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
                <div className="flex flex-col justify-center items-center gap-4 p-6 bg-black/60 rounded-lg shadow-lg">
                    {icon}
                    <Label className="text-white text-sm text-center tracking-wide">{message}</Label>
                </div>
            </div>
        );
    };

    return <DisplayLayout />;
};

export default ActionLoading;
