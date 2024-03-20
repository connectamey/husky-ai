import { Chapter, Unit } from "@prisma/client";
import React from "react";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  const isSummaryAvailable = chapter.summary && chapter.summary.trim().length > 0;
  return (
    <div className="flex-[2] mt-16">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full mt-4 aspect-video max-h-[24rem]"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
       <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        {isSummaryAvailable ? (
          <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
        ) : (
          <p className="mt-2 text-secondary-foreground/80">
            Hi there, I tried to generate a summary, but somewhere I'm having difficulty in generation.
            Please excuse for this chapter, as I'm still in the developmental stage.
          </p>
        )}
      </div>
    </div>
  );
};

export default MainVideoSummary;
