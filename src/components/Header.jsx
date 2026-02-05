import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./Logo";
import {
	SignedIn,
	SignedOut,
	SignIn,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, PenBox, Heart } from "lucide-react";

const Header = () => {
	const [showSignIn, setShowSignin] = useState(false);

	// if user has not login currently we connect them to homepage with search params
	const [search, setSearch] = useSearchParams();

	useEffect(() => {
		if (search.get("sign-in")) {
			setShowSignin(true);
		}
	}, [search]);

	const handleOverlay = (e) => {
		if (e.target === e.currentTarget) {
			setShowSignin(false);
			setSearch({});
		}
	};

	return (
		<>
			<nav className='py-6 flex justify-between items-center'>
				<Link to='/' className='transition-transform hover:scale-105'>
					<Logo />
				</Link>

				<div className='flex items-center gap-4'>
					<SignedOut>
						<Button
							variant='outline'
							onClick={() => {
								setShowSignin(true);
							}}>
							Login
						</Button>
					</SignedOut>

					<SignedIn>
						{/* Show this button when recuiter login */}

						<Link to='/post-jobs'>
							<Button variant='blue' className='rounded-full'>
								<PenBox size={20} className='mr-2' />
								Post a job
							</Button>
						</Link>
						<UserButton
							appearance={{
								elements: {
									avatarBox: "",
								},
							}}>
							<UserButton.MenuItems>
								<UserButton.Link
									label='My Jobs'
									labelIcon={<BriefcaseBusinessIcon size={15} />}
									href='/my-jobs'
								/>
								<UserButton.Link
									label='Saved Jobs'
									labelIcon={<Heart size={15} />}
									href='/saved-jobs'
								/>
							</UserButton.MenuItems>
						</UserButton>
					</SignedIn>
				</div>
			</nav>
			{showSignIn && (
				<div
					className='fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-sm'
					onClick={handleOverlay}>
					<SignIn
						signUpForceRedirectUrl='/onboarding'
						fallbackRedirectUrl='/onboarding'
					/>
				</div>
			)}
		</>
	);
};

export default Header;
