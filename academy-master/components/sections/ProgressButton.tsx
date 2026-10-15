"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface ProgressButtonProps {
  courseId: string;
  sectionId: string;
  isCompleted: boolean;
}

const ProgressButton = ({ courseId, sectionId, isCompleted }: ProgressButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/courses/${courseId}/sections/${sectionId}/progress`, {
        isCompleted: !isCompleted,
      });
      toast.success(isCompleted ? "Marked incomplete" : "Section complete!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-60 ${
        isCompleted
          ? "bg-success/10 text-success border border-success/25 hover:bg-success/20"
          : "bg-surface-3 text-warm-400 border border-white/[0.09] hover:bg-surface-4 hover:text-warm-200"
      }`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isCompleted ? (
        <><CheckCircle2 className="h-3.5 w-3.5" /> Completed</>
      ) : (
        <><Circle className="h-3.5 w-3.5" /> Mark Complete</>
      )}
    </button>
  );
};

export default ProgressButton;
