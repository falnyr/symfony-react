import React from "react";
import {render} from "react-dom";
import ReplogApp from "./RepLog/RepLogApp";

const shouldShowHeart = true;

render(
  <ReplogApp withHeart={shouldShowHeart} />,
  document.getElementById('lift-stuff-app')
);
