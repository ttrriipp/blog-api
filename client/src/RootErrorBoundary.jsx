import { useRouteError, isRouteErrorResponse } from "react-router";

function RootErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className="flex flex-col">
          <h1>Could not process your form data. Please fix the following:</h1>
          <ul className="list-disc">
            {Object.values(error.data).map((item, index) => (
              <li className="text-red-600" key={index}>{item.msg}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        {error.data && (
          <p></p>
        )}
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default RootErrorBoundary
