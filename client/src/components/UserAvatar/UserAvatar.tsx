import { Avatar, AvatarProps } from "@mui/material";
import { UserData } from "../../types";
import { forwardRef } from "react";

type UserAvatarProps = AvatarProps & {
  user: UserData;
};

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    const initials = user.name.split(" ").map(word => word.substring(0,1));
    return <Avatar  alt={user.name} src={user.avatar} ref={ref} {...props}>{initials}</Avatar>;
  }
);
