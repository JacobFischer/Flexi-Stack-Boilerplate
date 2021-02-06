// This is the main entry point into the app
import React from "react";
import { Routes } from "./routes";

export const Body: React.FunctionComponent = () => (
    <Routes render={({ Component }) => <Component />} />
);
