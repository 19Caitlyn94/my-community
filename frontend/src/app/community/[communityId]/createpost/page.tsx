import {
  ModalContainer,
  ModalCloseIcon,
  NewPostModalContent,
  NewPostForm,
} from "@/app/_components";
import { getPostTypesOptions } from "@/actions/posttypes";

const Page = async () => {
  const postTypeOptions = await getPostTypesOptions();
  return (
    <ModalContainer>
      <ModalCloseIcon />
      <NewPostModalContent>
        <NewPostForm postTypeOptions={postTypeOptions.data} />
      </NewPostModalContent>
    </ModalContainer>
  );
};

export default Page;
