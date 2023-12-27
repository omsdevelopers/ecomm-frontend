import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/components/PageBanner";
import Link from "next/link";
import axios from "axios";

const Signup = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSignup = async () => {
    if (username && email && password) {
      try {
        // Make a POST request to your registration API
        const response = await axios.post(`${baseUrl}/register`, {
          name: username,
          email,
          password,
        });

        console.log("Registration successful:", response.data);

        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        setError("Registration failed. Please try again.");
      }
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <Layout footer={3}>
      <PageBanner pageName={"Signup"}></PageBanner>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mb-80 mt-80">
              <div className="card-header">Sign Up</div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn "
                    style={{
                      background: "#76A713",
                      color: "white",
                      padding: "10px 20px 10px 18px",
                    }}
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
              <div className="card-footer text-muted">
                Already have an account?{" "}
                <Link href="/login">
                  <a>Login here</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
