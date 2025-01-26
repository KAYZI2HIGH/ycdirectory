import DateFormater from '@/utils/DateFormater';
import { shortenText } from '@/utils/ShortenText';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const StartupCards = ({ post }) => {
  return (
    <div className="px-4 py-7 border-[5px] border-black rounded-3xl flex flex-col w-full gap-4 max-w-[400px] mx-auto hover:border-pink-400 hover:bg-pink-100 transition-all duration-300 cursor-default">
      <div className="w-full flex justify-between items-center">
        <p className="normal_text py-2 px-3 rounded-full bg-[#FFE8F0] font-medium">
          <DateFormater createdDate={post._createdAt}/>
        </p>
        <div className="flex gap-1.5 justify-center items-center normal_text font-semibold">
          <EyeIcon
            size={20}
            className="text-pink-500"
          />
         {post.views}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="space-y-1 flex flex-col">
          <Link href={`user/${post.author._id}`} className="normal_text capitalize font-medium">{post.author.name}</Link>
          <Link href={`startup/${post._id}`} className="section_title font-bold capitalize cursor-pointer">{shortenText(post.title, 15)}</Link>
        </div>
        <Link href={`user/${post.author._id}`} className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            src={post.author.image}
            alt="profile image"
            fill
          />
        </Link>
      </div>
      <p className="normal_text text-[#333333]">
        {shortenText(post.description, 80)}
      </p>
      <Link href={`startup/${post._id}`} className="relative w-full h-[164px] rounded overflow-hidden cursor-pointer">
        <Image
          src={post.image}
          alt='startup image'
          fill
        />
      </Link>
      <div className="flex justify-between items-center">
        <Link href={`?query=${post.category}`} className="normal_text font-semibold capitalize">{shortenText(post.category, 20)}</Link>
        <Link
          href={`startup/${post._id}`}
          className="py-2 px-5 bg-black rounded-full text-white"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default StartupCards