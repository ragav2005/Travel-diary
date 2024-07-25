import { useSearchParams } from "react-router-dom";

function useURLPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  return [lat, long];
}

export { useURLPosition };
