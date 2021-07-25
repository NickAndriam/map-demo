import React, { useEffect } from "react";
import "./Notification.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

function Notification() {
  const dispatch = useDispatch();
  const { isNotiOpen, msg } = useSelector((state) => state.getNotification);
  const notiVariants = {
    initial: { top: 0, y: "-100%", x: "-50%", background: "#5DB85C" },
    animate: {
      top: 5,
      y: "0%",
      transition: { type: "spring", duration: 0.6, stiffness: 150 },
    },
    exit: { top: 0, y: "-100%", x: "-50%" },
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "closeNotification" });
    }, 2000);
  }, [isNotiOpen]);
  return (
    <>
      <AnimatePresence>
        {isNotiOpen && (
          <motion.div
            className="noti_container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={notiVariants}
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Notification;
