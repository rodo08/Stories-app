import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    if (password !== confirmPassword) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/stories");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!email || !password) return;
        createAccount();
      }}
      className="flex flex-col gap-8 self-center w-full text-[#000000] lg:max-w-3xl my-8"
    >
      <h3 className="text-4xl font-bold mb-4">Create Account</h3>

      {error && (
        <p className="text-orange-700 text-4xl font-bold my-4">{error}</p>
      )}

      <label
        htmlFor="password"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        {" "}
        Email address
        <input
          className="border-b border-gray-600 focus:border-[#fca311] outline-none py-2 text-2xl text-[#000000]"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Write your email"
        />
      </label>

      <label
        htmlFor="password"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        {" "}
        Password
        <input
          className="border-b border-gray-600 focus:border-[#fca311] outline-none py-2 text-2xl text-[#000000]"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Write a password"
        />
      </label>

      <label
        htmlFor="confirm-password"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        {" "}
        Confirm Password
        <input
          className="border-b border-gray-600 focus:border-[#000000] outline-none py-2 text-2xl text-[#000000]"
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
        />
      </label>

      <button
        className="text-[#000000] font-bold bg-[#fca311] px-4 py-3 rounded text-xl"
        type="submit"
      >
        Sign Up
      </button>

      <Link to="/login" className="text-xl">
        Have an account? <span className="font-bold">Sign in here</span> .
      </Link>
    </form>
  );
};

export default CreateAccountPage;
