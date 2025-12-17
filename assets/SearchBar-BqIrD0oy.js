import{c as i,r as u,j as e,B as m,X as p}from"./index-DtEbMehm.js";import{I as h}from"./input-0HMmlWpP.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=i("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function j({placeholder:n="Cari...",onSearch:s,className:o=""}){const[t,r]=u.useState(""),c=a=>{a.preventDefault(),s(t)},l=()=>{r(""),s("")};return e.jsx("form",{onSubmit:c,className:`relative ${o}`,children:e.jsxs("div",{className:"relative",children:[e.jsx(x,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"}),e.jsx(h,{type:"text",placeholder:n,value:t,onChange:a=>r(a.target.value),className:"pl-10 pr-10"}),t&&e.jsx(m,{type:"button",variant:"ghost",size:"sm",onClick:l,className:"absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0",children:e.jsx(p,{className:"h-4 w-4"})})]})})}export{j as S};
