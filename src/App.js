import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/users/Signup";
import Home from "./component/users/Home"
import Login from "./component/users/Login"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="home" element={<Home />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;

