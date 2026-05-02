const taskPreviewLayout = {
  mobile: {
    frame: "max-w-[390px]",
    stats: "grid-cols-1",
    workspace: "grid-cols-1",
    pageSize: 4,
  },
  tablet: {
    frame: "max-w-[820px]",
    stats: "grid-cols-3",
    workspace: "grid-cols-1",
    pageSize: 6,
  },
  laptop: {
    frame: "max-w-none",
    stats: "sm:grid-cols-3",
    workspace: "lg:grid-cols-[380px_minmax(0,1fr)]",
    pageSize: 9,
  },
};

export default taskPreviewLayout;
