import React from "react";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
	return (
		<div>
      <h1>Root Layout</h1>
			<Outlet />
		</div>
	);
};

export default Rootlayout;
