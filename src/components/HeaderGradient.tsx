import type React from "react";

export default function HeaderGradient(): React.ReactElement {
  return (
    <div className="fixed inset-0 mx-0 max-w-none overflow-hidden hidden md:block opacity-40 pointer-events-none">
      <div className="absolute left-1/2 top-[-14.5px] ml-[-41.5rem] h-[25rem] w-[80rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-purple-300/30 dark:to-blue-600/30"></div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white dark:fill-zinc-950 blur-[26px]"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </svg>
      </div>
    </div>
  );
}
