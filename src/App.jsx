import React from "react";
import Rootlayout from "./layout/Rootlayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/HomePage";
import Onboarding from "./pages/Onboarding";
import SavedJobs from "./pages/SavedJobs";
import PostJobs from "./pages/PostJobs";
import JobListing from "./pages/JobListing";
import Jobs from "./pages/Jobs";
import MyJobs from "./pages/MyJobs";
const App = () => {
	const router = createBrowserRouter([
		{
			element: <Rootlayout />,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path: "/onboarding",
					element: <Onboarding />,
				},
				{
					path: "/joblisting",
					element: <JobListing />,
				},
				{
					path: "/job/:id",
					element: <Jobs />,
				},
				{
					path: "/saved-jobs",
					element: <SavedJobs />,
				},
				{
					path: "/post-jobs",
					element: <PostJobs />,
				},
				{
					path: "/my-jobs",
					element: <MyJobs />,
				},
			],
		},
	]);

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
