import React from "react";
import {render} from "react-dom";
import ReplogApp from "./RepLog/RepLogApp";

const shouldShowHeart = false;

render(
  <ReplogApp
    withHeart={shouldShowHeart}
    {...window.REP_LOG_APP_PROPS}
  />,
  document.getElementById('lift-stuff-app')
);
