import React from "react";
import { getLoggedInUser } from "@/actions/users";
import { Avatar, AVATAR_SIZE } from "@/app/_components";

const Profile = async () => {
  const { error, data: user } = await getLoggedInUser();

  if (error) {
    return (
      <div>
        Oh no! There was a problem loading your information: {error.message}
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center my-6 gap-5 md:gap-0">
        <Avatar
          size={AVATAR_SIZE.lg}
          content={user.profile_image}
          className="mr-4"
        />
        <p className="text-xl text-center md:text-left">
          {user.first_name} {user.last_name}
        </p>
      </div>
      <p className="text-md">{user.bio}</p>
    </>
  );
};

export default Profile;
