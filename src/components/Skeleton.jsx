const Skeleton = ({ className, variant = "rect" }) => {
  const baseStyles = "bg-border-base/20 animate-pulse";
  const variants = {
    rect: "rounded-md",
    circle: "rounded-full",
    text: "h-4 w-3/4 rounded-sm",
  };

  return <div className={`${baseStyles} ${variants[variant]} ${className}`} />;
};

export default Skeleton;
