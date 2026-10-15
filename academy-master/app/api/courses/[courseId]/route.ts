import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getMuxVideo } from "@/lib/mux";

// PATCH - Update Course Details
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      console.error("Unauthorized request - No userId found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();

    if (!courseId || Object.keys(values).length === 0) {
      console.error("Invalid request: Missing courseId or update data");
      return new NextResponse("Bad Request", { status: 400 });
    }

    const course = await db.course.update({
      where: { id: courseId, instructorId: userId },
      data: { ...values },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (err) {
    console.error("courseId_PATCH Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// DELETE - Delete Course and Related Mux Assets
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      console.error("Unauthorized request - No userId found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = params;

    const course = await db.course.findFirst({
      where: { id: courseId, instructorId: userId },
      include: {
        sections: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      console.error(`Course with ID ${courseId} not found`);
      return new NextResponse("Course not found", { status: 404 });
    }

    // Delete all related Mux assets
    for (const section of course.sections) {
      if (section.muxData?.assetId) {
        try {
          await getMuxVideo().assets.delete(section.muxData.assetId);
        } catch (muxError) {
          console.error(`Failed to delete Mux asset: ${section.muxData.assetId}`, muxError);
        }
      }
    }

    // Delete course
    await db.course.delete({
      where: { id: courseId },
    });

    console.log(`Course ${courseId} deleted successfully`);
    return new NextResponse("Course Deleted", { status: 200 });
  } catch (err) {
    console.error("courseId_DELETE Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
