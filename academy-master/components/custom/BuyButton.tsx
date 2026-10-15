"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, ShoppingCart } from "lucide-react";

const BuyButton = ({ courseId }: { courseId: string }) => {
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(data.url);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={buy}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-surface-0 font-bold text-sm shadow-gold hover:bg-gold-light hover:shadow-gold-lg disabled:opacity-60 transition-all"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4" /> Enroll Now</>}
    </button>
  );
};

export default BuyButton;
