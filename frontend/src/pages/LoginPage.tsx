import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
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
        login();
      }}
      className="flex flex-col gap-8 self-center w-full text-[#000000] lg:max-w-3xl my-8"
    >
      <h3 className="text-4xl font-bold mb-4">Log In</h3>

      {error && (
        <p className="text-orange-700 text-4xl font-bold my-4">{error}</p>
      )}

      <label
        htmlFor="email"
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
          placeholder="Write your password"
        />
      </label>

      <button
        className="text-[#000000] font-bold bg-[#fca311] px-4 py-3 rounded text-xl"
        type="submit"
      >
        Log In
      </button>

      <Link to="/create-account" className="text-xl">
        No account yet? <span className="font-bold">Sign up here.</span>
      </Link>
    </form>
  );
};

export default LoginPage;
