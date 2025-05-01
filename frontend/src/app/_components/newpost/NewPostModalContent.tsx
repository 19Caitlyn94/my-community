type Props = {
  children: React.ReactNode;
};

const NewPostModalContent = ({ children }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-400 mb-5">New post</h2>
      {children}
    </div>
  );
};

export default NewPostModalContent;
