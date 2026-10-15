"use client";

import { Course, MuxData, Progress, Purchase, Resource, Section } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { File, Loader2, Lock, PlayCircle, Download, ShoppingCart } from "lucide-react";
import ReadText from "@/components/custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "./ProgressButton";
import SectionMenu from "../layout/SectionMenu";

interface SectionsDetailsProps {
  course: Course & { sections: Section[] };
  section: Section;
  purchase: Purchase | null;
  muxData: MuxData | null;
  resources: Resource[] | [];
  progress: Progress | null;
}

const SectionsDetails = ({ course, section, purchase, muxData, resources, progress }: SectionsDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLocked = !purchase && !section.isFree;

  const buyCourse = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${course.id}/checkout`);
      window.location.assign(response.data.url);
    } catch (err) {
      console.log("Failed to checkout course", err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-surface-0 px-6 py-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-gold/15">
              <PlayCircle className="h-4 w-4 text-gold" />
            </div>
            {section.isFree && !purchase && (
              <span className="text-[10px] font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                FREE PREVIEW
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-warm-100 leading-tight">
            {section.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="md:hidden">
            <SectionMenu course={course} />
          </div>
          {!purchase ? (
            <button
              onClick={buyCourse}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-surface-0 font-bold text-sm shadow-gold hover:bg-gold-light disabled:opacity-60 transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><ShoppingCart className="h-4 w-4" /> Buy Course</>
              )}
            </button>
          ) : (
            <ProgressButton
              courseId={course.id}
              sectionId={section.id}
              isCompleted={!!progress?.isCompleted}
            />
          )}
        </div>
      </div>

      {/* Video area */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-surface-2">
        {isLocked ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 px-10">
            <div className="w-16 h-16 rounded-2xl bg-surface-3 border border-white/10 flex items-center justify-center">
              <Lock className="h-7 w-7 text-warm-600" />
            </div>
            <div className="text-center">
              <p className="text-warm-200 font-bold text-lg mb-2">Section Locked</p>
              <p className="text-warm-600 text-sm max-w-sm">
                Purchase this course to unlock all sections and get full access to the content.
              </p>
            </div>
            <button
              onClick={buyCourse}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-surface-0 font-bold text-sm shadow-gold hover:bg-gold-light disabled:opacity-60 transition-all mt-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><ShoppingCart className="h-4 w-4" /> Unlock Course</>
              )}
            </button>
          </div>
        ) : muxData?.playbackId ? (
          <MuxPlayer
            playbackId={muxData.playbackId}
            className="w-full aspect-video"
            accentColor="#f5a623"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center">
              <PlayCircle className="h-6 w-6 text-warm-600" />
            </div>
            <p className="text-warm-600 text-sm font-medium">No video uploaded yet</p>
          </div>
        )}
      </div>

      {/* Description */}
      {section.description && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="text-sm font-bold text-warm-300 mb-3">About this section</h2>
          <div className="text-warm-500 text-sm leading-relaxed">
            <ReadText value={section.description} />
          </div>
        </div>
      )}

      {/* Resources */}
      {resources.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="text-sm font-bold text-warm-300 mb-4 flex items-center gap-2">
            <Download className="h-4 w-4 text-gold" />
            Downloadable Resources
            <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
              {resources.length}
            </span>
          </h2>
          <div className="flex flex-col gap-2">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.fileUrl}
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-3 border border-white/[0.06] text-sm font-medium text-warm-400 hover:text-warm-100 hover:border-gold/25 hover:bg-surface-4 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                  <File className="h-3.5 w-3.5 text-gold" />
                </div>
                <span className="flex-1 truncate">{resource.name}</span>
                <Download className="h-3.5 w-3.5 text-warm-600 group-hover:text-gold transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionsDetails;
