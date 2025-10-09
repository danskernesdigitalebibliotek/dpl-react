// The dependency prop is given to the hook so that it can scroll based on
// external changes (e.g. scroll when some data on the page loads).
export const scrollToLocation = ({ anchorId }: { anchorId: string }) => {
  const element = document.querySelector(`${anchorId}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
