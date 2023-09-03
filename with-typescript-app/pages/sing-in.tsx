import Link from "next/link";
import Layout from "../components/Layout";
import { SingInForm } from "../components/SingUpForm/SingInForm";

const SingInPage = () => (
  <Layout title="Register">
    <p>
      <Link href="/">Go home</Link>
    </p>
    <SingInForm />
  </Layout>
);

export default SingInPage;
