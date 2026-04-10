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
import ProtectedRoute from "./components/ProtectedRoute";
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

					element: (
						<ProtectedRoute>
							<Onboarding />
						</ProtectedRoute>
					),
				},
				{
					path: "/jobs",
					element: (
						<ProtectedRoute>
							<JobListing />
						</ProtectedRoute>
					),
				},
				{
					path: "/job/:id",
					element: (
						<ProtectedRoute>
							<Jobs />
						</ProtectedRoute>
					),
				},
				{
					path: "/saved-jobs",
					element: (
						<ProtectedRoute>
							<SavedJobs />
						</ProtectedRoute>
					),
				},
				{
					path: "/post-jobs",
					element: (
						<ProtectedRoute>
							<PostJobs />
						</ProtectedRoute>
					),
				},
				{
					path: "/my-jobs",
					element: (
						<ProtectedRoute>
							<MyJobs />
						</ProtectedRoute>
					),
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
