type Props = {
  children: React.ReactNode;
};

export const ModalChildrenWrapper = ({ children }: Props) => {
  return (
    <div className="bg-white px-2 py-5 rounded-md w-11/12 md:w-9/12 lg:w-6/12">
      {children}
    </div>
  );
};
