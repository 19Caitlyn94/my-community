import ModalContainer from "@/app/_components/ui/modal/ModalContainer";
import ModalCloseIcon from "@/app/_components/ui/modal/ModalCloseIcon";

const Page = () => {
  return (
    <ModalContainer>
      <ModalCloseIcon />
      <p>Modal Content</p>
    </ModalContainer>
  );
};

export default Page;
