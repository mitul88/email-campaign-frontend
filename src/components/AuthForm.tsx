import React from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const AuthForm: React.FC = () => {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-3 bg-blue-800 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold text-white text-center mb-3">
          {isLogin ? "Login to continue" : "Register as Campaign manager"}
        </h3>
      </div>
      <Form method="post">
        {!isLogin && (
          <div className="flex justify-between gap-2 mb-2">
            <label htmlFor="name" className="text-white font-semibold">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              required
              className="px-2 py-1 rounded-md"
            />
          </div>
        )}
        <div className="flex justify-between gap-2 mb-2">
          <label htmlFor="email" className="text-white font-semibold">
            Email:
          </label>
          <input
            name="email"
            type="text"
            id="email"
            required
            className="px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="password" className="text-white font-semibold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="px-2 py-1 rounded-md"
          />
        </div>
        <button
          disabled={isSubmitting}
          className="py-1 px-2 mr-auto mt-3 flex flex-col items-center font-bold text-white bg-blue-950 rounded-md"
        >
          {isSubmitting ? "Submitting" : isLogin ? "Login" : "Register"}
        </button>
      </Form>
    </div>
  );
};

export default AuthForm;
