import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";

type Props = {};

const DanjobPage = async (props: Props) => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <iframe src="https://danjob.com/" name="myiFrame" height="720px" width="1280px"></iframe>
    </div>
  );
};

export default DanjobPage;
