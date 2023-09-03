import Link from "next/link";
import Layout from "../components/Layout";
import { SingUpForm } from "../components/SingUpForm/SingUpForm";

const RegisterPage = () => (
  <Layout title="Register">
    <p>
      <Link href="/">Go home</Link>
    </p>
    <SingUpForm />
  </Layout>
);

export default RegisterPage;
