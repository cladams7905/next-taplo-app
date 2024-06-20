import { toast } from "./use-toast";

export function showToastError(error: any, message?: string) {
  return toast({
    className: "bg-error text-white border-none",
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
    variant: "default",
    description: (
      <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
        <p>{message}</p>
      </pre>
    ),
  });
}
