const Container = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex py-20 justify-center items-end max-h-screen"
    >
      <div className="px-12 py-4 w-full max-w-lg rounded-2xl md:shadow-lg shadow-black ">
        {children}
      </div>
    </form>
  );
};

export default Container;
