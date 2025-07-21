// 🧠 useUserStatusListener.js — Global listener to update Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "./statusSlice";

const useUserStatusListener = () => {
  const socket = useSelector((state) => state.socket.instance);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(socket,"socket")
    if (!socket) return;

    const handler = (data) =>{ dispatch(updateStatus(data))
        console.log(data)
    }
    
    socket.on("userStatusChanged", handler);

    return () => {
      socket.off("userStatusChanged", handler);
    };
  }, [socket, dispatch]);
};

export default useUserStatusListener;
