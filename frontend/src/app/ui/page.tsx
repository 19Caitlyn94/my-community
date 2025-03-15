import React from "react";
import { Avatar, AVATAR_SIZE, Icon, ICONS } from "@/app/_components";
import { ModalWrapper } from "@/app/_components";

function UI() {
  return (
    <div>
      <p className="text-2xl">UI Library</p>
      <div className="divider"></div>
      <p className="text-xl mb-5">Icons</p>
      <div className="flex flex-wrap gap-2">
        <Icon iconType={ICONS.thumbsup} />
        <Icon iconType={ICONS.heart} />
        <Icon iconType={ICONS.share} />
        <Icon iconType={ICONS.close} />
        <Icon iconType={ICONS.newsfeed} />
        <Icon iconType={ICONS.person} />
        <Icon iconType={ICONS.search} />
        <Icon iconType={ICONS.settings} />
        <Icon iconType={ICONS.squares} />
        <Icon iconType={ICONS.sun} />
      </div>

      <div className="divider"></div>
      <p className="text-xl mb-5">Avatars</p>
      <div className="flex flex-wrap gap-2">
        <Avatar
          size={AVATAR_SIZE.xs}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.sm}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.md}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar
          size={AVATAR_SIZE.lg}
          content="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <Avatar size={AVATAR_SIZE.xs} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.sm} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.md} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.lg} content="Jeremy Fisher" />
        <Avatar size={AVATAR_SIZE.xs} />
        <Avatar size={AVATAR_SIZE.sm} />
        <Avatar size={AVATAR_SIZE.md} />
        <Avatar size={AVATAR_SIZE.lg} />
      </div>
      <div className="divider"></div>
      <p className="text-xl mb-5">Modal</p>
      <ModalWrapper modalContent={<div>Modal Content</div>}>
        <div>Click me</div>
      </ModalWrapper>
    </div>
  );
}

export default UI;
