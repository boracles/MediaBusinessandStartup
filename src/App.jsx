import { Week3 } from "./weeks/Week3.jsx";

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/" || path === "/week3" || path === "/week-3") {
    return <Week3 />;
  }

  return <Week3 />;
}
