import SearchForm from "@/components/SearchForm"
import StartupForm from "@/components/StartupForm"
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const page =async() => {
   const session = await auth();

  if (!session?.user) redirect("/");
  return (
    <section>
      <div className="background py-20 flex justify-center items-center">
        <h1 className="heading_text uppercase">submit your startup</h1>
      </div>
      <div className="mt-10 p-5 mx-auto max-w-[600px]">
        <StartupForm/>
      </div>
    </section>
  )
}

export default page