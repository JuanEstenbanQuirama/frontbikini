// composables
import { useSpinnerStore } from "../stores/spinner";

export function spinnerService() {
  let spinner = useSpinnerStore();
  const LoaderShown = async (value) => {
    spinner.isLoaderShown = value;
  };
  return { LoaderShown };
}
