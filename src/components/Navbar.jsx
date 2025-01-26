import React from "react";
import { auth, signIn, signOut } from "../../auth";
import Image from "next/image";
import Link from "next/link";
import { CirclePlus, LogOut } from "lucide-react";

const Navbar = async () => {
  
  const session = await auth();

  return (
    <nav className="w-full py-5 px-5 sm:px-10 flex justify-between items-center bg-white">
      <Link href={"/"}>
        <Image
          src={"/YCDirectory.png"}
          alt="logo"
          width={143}
          height={30}
        />
      </Link>
      <div className="flex justify-center items-center gap-5">
        {session?.user ?
          <>
            <Link
              href={"/create"}
              className="font-semibold normal_text"
            >
              <p className="hidden sm:flex">Create</p>
              <CirclePlus
                size={18}
                className="sm:hidden"
              />
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="normal_text font-semibold text-pink-500"
              >
                <p className="hidden sm:flex">Logout</p>
                <LogOut
                  size={18}
                  className="sm:hidden"
                />
              </button>
            </form>
            <Image
              src={session.user?.image}
              alt="profile image"
              height={36}
              width={36}
              className="rounded-full cursor-pointer"
            />
          </>
        : <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="normal_text font-semibold "
            >
              Login
            </button>
          </form>
        }
      </div>
    </nav>
  );
};

export default Navbar;
