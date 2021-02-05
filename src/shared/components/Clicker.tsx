import React from "react";
import styled from "styled-components";

export const Button = styled.button({
    backgroundColor: "lightblue",
    border: "3px solid blue",
});

/**
 * An example component that maintains a state via React hooks.
 *
 * @returns A functional component that uses state.
 */
export function Clicker() {
    // const [count, setCount] = useState(0);
    const count = -1;

    return (
        <div>
            <p>You clicked me {count} times</p>
            <Button onClick={undefined /*() => setCount(count + 1)*/}>
                Click me
            </Button>
        </div>
    );
}
export default Clicker;
