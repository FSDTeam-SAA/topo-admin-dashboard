import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInForm from "./_components/SignInForm";

const SignIn = async () => {
  const cu = await auth();

  if (!!cu?.user) redirect("/");
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <SignInForm />
    </div>
  );
};

export default SignIn;
