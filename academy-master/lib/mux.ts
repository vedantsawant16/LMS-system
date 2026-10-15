import Mux from "@mux/mux-node";

let mux: Mux | undefined;

// Created lazily so the build doesn't require Mux credentials
export const getMuxVideo = () => {
  if (!mux) {
    mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });
  }
  return mux.video;
};
