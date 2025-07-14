import { motion } from "framer-motion";

interface AnimatedHeaderProps {
  title: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full mb-2 text-sm md:text-lg rounded-sm font-semibold sticky top-0 z-10 shadow-md md:shadow-none text-gray-600  items-start min-h-10 bg-white"
    >
      {title}
    </motion.div>
  );
};
export default AnimatedHeader;
