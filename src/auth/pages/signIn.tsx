import { motion } from "framer-motion";
import SignInForm from "./forms/SignInForm";

export const SignIn: React.FC = () => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className="">
        <motion.div
          className=""
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <section className="min-h-screen bg-blue-950 bg-cover bg-center bg-no-repeat bg-blend-overlay  ">
            {" "}
            <SignInForm />
          </section>
        </motion.div>
      </section>
    </motion.div>
  );
};
