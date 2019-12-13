import React from "react";
import { Button, Switch } from "antd";
import useToggle from "../index";

export const demo1 = () => {
  const { state, toggle, setRight, setLeft } = useToggle();

  return (
    <div>
      <p>
        Effects：
        <Switch checked={state} onChange={toggle} />
      </p>
      <p>
        <Button type="default" onClick={() => toggle()}>
          Toggle
        </Button>
        <Button
          type="danger"
          onClick={() => toggle(false)}
          style={{
            margin: "0 16px"
          }}
        >
          Toggle False
        </Button>
        <Button type="primary" onClick={() => toggle(true)}>
          Toggle True
        </Button>
      </p>
    </div>
  );

  return <div></div>;
};
