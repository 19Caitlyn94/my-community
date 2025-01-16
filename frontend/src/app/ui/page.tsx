import React from "react";
import { Avatar, AVATAR_SIZE, Icon, ICONS } from "@/app/_components";

type Props = {};

function UI({}: Props) {
  return (
    <div>
      <p className="text-2xl">UI Library</p>
      <div className="divider"></div>
      <p className="text-xl mb-5">Icons</p>
      <Icon iconType={ICONS.thumbsup} />
      <Icon iconType={ICONS.heart} />
      <Icon iconType={ICONS.share} />

      <div className="divider"></div>
      <p className="text-xl mb-5">Avatars</p>

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
  );
}

export default UI;
