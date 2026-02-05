import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Rootlayout = () => {
	return (
		<div className='relative min-h-screen w-full bg-background text-foreground'>
			{/* Background Layer */}
			<div
				className='fixed inset-0 z-0 pointer-events-none bg-grid-pattern bg-[length:32px_32px,32px_32px,100%_100%]'
				aria-hidden='true'
			/>

			{/* Main Content Layer */}
			{/* Added 'max-w-7xl mx-auto px-4' to center everything professionally */}
			<div className='relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<Header />

				<main className='flex-grow py-6'>
					<Outlet />
				</main>

				<footer className='p-6 text-center border-t border-border bg-card/10 backdrop-blur-md rounded-t-xl'>
					<p className='text-sm text-muted-foreground'>
						Designed and Developed by{" "}
						<span className='text-primary font-semibold'>
							<a
								href='https://github.com/arinmandal'
								target='_blank'
								rel='noopener noreferrer'
								aria-label="Visit Arin Mandal's GitHub profile">
								Arin Mandal
							</a>
						</span>
					</p>
				</footer>
			</div>
		</div>
	);
};

export default Rootlayout;
