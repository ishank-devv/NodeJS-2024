import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <NavBar /> */}
      {/* <h1 className="text-red-500">Vite + React</h1>
      <h1 className="text-3xl font-bold underline">Hello World</h1> */}
    </>
  );
}

export default App;
