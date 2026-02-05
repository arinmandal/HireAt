import React from "react";
import { cn } from "@/lib/utils";
const Logo = () => {
	return (
		<div className={cn("flex items-center gap-1")}>
			{/* Location Pin with Checkmark */}
			<svg
				viewBox='0 0 100 140'
				className='h-8 sm:h-12 md:h-16 w-auto'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				{/* Location Pin Shape */}
				<path
					d='M50 0C27.9086 0 10 17.9086 10 40C10 52.5 18.75 70 50 120C81.25 70 90 52.5 90 40C90 17.9086 72.0914 0 50 0Z'
					className='fill-green-500'
				/>

				{/* Checkmark */}
				<path
					d='M35 42L45 52L67 30'
					className='stroke-white'
					strokeWidth='8'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>

			<span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight'>
				Hire
			</span>

			{/* "At" Text */}
			<span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 tracking-tight'>
				At
			</span>
		</div>
	);
};

export default Logo;
