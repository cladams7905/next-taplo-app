import { toast } from "./use-toast";

export function showToastError(error: any, message?: string) {
  console.log(error);
  return toast({
    variant: "destructive",
    description: (
      <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
        <p>{`Error ${error?.status ? error.status : ``}: ${
          message && message.length > 0
            ? message
            : error?.name
            ? error.name
            : error?.message
        }`}</p>
      </pre>
    ),
  });
}

export function showToast(message: string) {
  return toast({
    description: (
      <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
        <p>{message}</p>
      </pre>
    ),
  });
}
