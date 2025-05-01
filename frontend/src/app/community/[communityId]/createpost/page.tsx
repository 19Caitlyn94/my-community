import {
  ModalContainer,
  ModalCloseIcon,
  NewPostModalContent,
  NewPostForm,
} from "@/app/_components";

const Page = () => {
  return (
    <ModalContainer>
      <ModalCloseIcon />
      <NewPostModalContent>
        <NewPostForm />
      </NewPostModalContent>
    </ModalContainer>
  );
};

export default Page;
