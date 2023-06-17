type Props = {
  children: React.ReactNode;
};

export const ModalChildrenWrapper = ({ children }: Props) => {
  return (
    <div className="bg-white px-2 py-5 rounded-md w-11/12 md:w-6/12 lg:w-3/12">
      {children}
    </div>
  );
};
