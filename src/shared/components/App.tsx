import React from "react";
import Loadable from "react-loadable";
import { Link, Route, Switch } from "react-router-dom";
import { About } from "./About";
import { NotFound } from "./NotFound";
import { SomePage } from "./SomePage";

const Loading = () => <em>Loading...</em>;

function delay(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

const LoadableHome = Loadable({
    loader: async () => {
        await delay(5000);
        return import("./Home")
    },
    loading: Loading,
    render: ({ Home }, props) => <Home {...props} />,
});

export function App() {
    return (<>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/some-page">Some Page</Link></li>
            <li><Link to="/not-found">Dead link</Link></li>
        </ul>
        <Switch>
            <Route exact path="/" component={LoadableHome} />
            <Route exact path="/about" component={About} />
            <Route exact path="/some-page" component={SomePage} />
            <Route component={NotFound} />
        </Switch>
    </>);
}
