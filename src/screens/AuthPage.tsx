import React from "react";
import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-600">
      <AuthForm />
    </div>
  );
};

interface ActionArgs {
  request: Request;
  response: Response;
}

interface AuthData {
  email: string | null;
  password: string | null;
  name?: string | null;
}

export const action = async ({ request }: ActionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "register") {
    throw JSON.stringify({ message: "Unsupported mode", status: 422 });
  }
  const data = await request.formData();

  const authData: AuthData = {
    email: data.get("email") as string | null,
    password: data.get("password") as string | null,
  };

  if (mode === "register") {
    authData.name = data.get("name") as string | null;
  }

  const response = await fetch(`http://localhost:4000/api/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw JSON.stringify({
      message: "Could not authenticate user, Please try again later",
      status: 500,
    });
  }
};
export default AuthPage;
