export type changeAvatarPayload = {
  avatar: string;
};

export type changeAvatarParams = changeAvatarPayload & {
  user_id: number;
};
