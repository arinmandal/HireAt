import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import companies from "@/utils/companies.json";
import faqs from "@/utils/faq.json";

const HomePage = () => {
	return (
		<main className='flex flex-col gap-4 sm:gap-20 py-10 sm:py-20'>
			<section className='text-center'>
				<h1 className='flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4 gradient-title'>
					Find Your Dream Job
					<Logo className='' />
				</h1>
				<p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
					Explore thousands of job listings or find the perfect candidate
				</p>
			</section>
			<div className='flex flex-wrap gap-3 sm:gap-6 justify-center w-full px-4'>
				<Link to='/jobs'>
					<Button variant='teal' size='xl'>
						Find Jobs
					</Button>
				</Link>
				<Link to='/post-jobs'>
					<Button variant='blue' size='xl'>
						Post a Job
					</Button>
				</Link>
			</div>

			<Carousel
				plugins={[
					Autoplay({
						delay: 2000,
					}),
				]}
				className='w-full py-10'>
				<CarouselContent className='flex gap-5 sm:gap-20 items-center'>
					{companies.map(({ name, id, path }) => (
						<CarouselItem key={id} className='basis-1/3 lg:basis-1/6 '>
							<img
								src={path}
								alt={name}
								className='h-9 sm:h-14 object-contain'
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Banner */}
			<img src='/banner.png' className='w-full' />

			<section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle className='font-bold'>For Job Seekers</CardTitle>
					</CardHeader>
					<CardContent>
						Search and apply for jobs, track applications, and more.
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className='font-bold'>For Employers</CardTitle>
					</CardHeader>
					<CardContent>
						Post jobs, manage applications, and find the best candidates.
					</CardContent>
				</Card>
			</section>

			<Accordion type='multiple' className='w-full bg-slate-900 p-4 rounded-md'>
				{faqs.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index + 1}`}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</main>
	);
};

export default HomePage;
