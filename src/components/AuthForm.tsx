import React, { useRef } from "react";
import { useNavigation, useSearchParams } from "react-router-dom";

const AuthForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = emailInput.current?.value;
    const passwordValue = passwordInput.current?.value;
    console.log(emailValue, passwordValue);
  };

  return (
    <div className="p-3 bg-blue-800 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold text-white text-center mb-3">
          Login to continue
        </h3>
      </div>
      <form onSubmit={submitHandler}>
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
            type="text"
            id="email"
            ref={emailInput}
            className="px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="password" className="text-white font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordInput}
            className="px-2 py-1 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-2 mr-auto mt-3 flex flex-col items-center font-bold text-white bg-blue-950 rounded-md"
        >
          {isSubmitting ? "Submitting" : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
