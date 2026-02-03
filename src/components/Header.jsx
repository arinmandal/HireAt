import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";

const Header = () => {
	return (
		<nav className='py-6 flex justify-between items-center'>
			<Link to='/'>
				{/* h-14 to h-20 on desktop (md:h-20) 
                  added w-auto to maintain aspect ratio
                  added object-left to ensure it aligns with your text
                */}
				<img
					src='/HireAt_light.png'
					alt='HireAt logo'
					className='h-12 md:h-20 w-auto object-contain object-left scale-110 md:scale-125'
				/>
			</Link>

			<div className='flex items-center gap-4'>
				<SignedOut>
					<SignInButton mode='modal'>
						<Button
							variant='outline'
							className='border-primary/50 hover:bg-primary/10 transition-colors'>
							Login
						</Button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
				</SignedIn>
			</div>
		</nav>
	);
};

export default Header;
