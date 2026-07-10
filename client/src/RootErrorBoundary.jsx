import { useRouteError, isRouteErrorResponse } from "react-router";

function RootErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        {error.data &&
          (
            <p>{error.data}</p>
          )}
        {Array.isArray(error.data) &&
          (<ul>
            {error.data.map((item, index) => (
              <li key={index}>{item.msg}</li>
            ))}
          </ul>)
        }
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
