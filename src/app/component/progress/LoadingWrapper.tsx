import { Loading } from "./Loading";

interface LoadingWrapperProps {
  loading: boolean;
}

export const LoadingWrapper = ({
  children,
  loading,
}: React.PropsWithChildren<LoadingWrapperProps>) => {
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading className="h-12 w-12 " />
      </div>
    );
  }

  return children;
};
