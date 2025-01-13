import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const AuthPage = lazy(() => import("./screens/AuthPage"));

export const router = createBrowserRouter([
  {
    path: "auth",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AuthPage />
      </Suspense>
    ),
  },
]);
