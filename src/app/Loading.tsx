function Loading() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center">
      <div className="spinner" />
    </div>
  );
}

export function CoverLoading() {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 z-10 flex items-center justify-center">
      <div className="spinner bg-opacity-100" />
    </div>
  );
}

export function LoadingIcon() {
  return <div className="spinner" />;
}

export default Loading;
