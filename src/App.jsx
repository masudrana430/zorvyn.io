import AppRouter from "./routes/AppRouter";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AppRouter />

      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        transition={Zoom}
        toastClassName={() => "zorvyn-toast"}
        bodyClassName={() => "zorvyn-toast-body"}
        progressClassName="zorvyn-toast-progress"
        closeButton={false}
      />
    </>
  );
}