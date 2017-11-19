import { configure, storiesOf } from "@storybook/react";
import * as React from "react";

const req = require.context(".", true, /\.js$/);

const load = () => {
  req.keys().forEach(req);
};

configure(load, module);
