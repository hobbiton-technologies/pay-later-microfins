import { motion } from "framer-motion";
import SignInForm from "./forms/SignInForm";

export const SignIn: React.FC = () => {
  return (
    <motion.div
      className="w-full flex flex-col min-h-screen justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className="w-full flex flex-col  h-full overflow-hidden">
        <motion.div
          className="w-full  h-full flex"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <section className="w-3/5 h-full min-h-screen bg-blue-950 bg-cover bg-center bg-no-repeat bg-blend-overlay  "></section>
          <section className=" w-2/5">
            <SignInForm />
          </section>
        </motion.div>
      </section>
    </motion.div>
  );
};
