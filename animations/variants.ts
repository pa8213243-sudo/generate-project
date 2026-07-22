export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const cardHoverVariant = {
  rest: { scale: 1, y: 0, filter: "brightness(1)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    filter: "brightness(1.1)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};