import { get, patch } from 'services/transport';
import { changeAvatarParams } from '../schemes/avatarPayload';

export const changeAvatarApi = {
  changeAvatar: async (data: changeAvatarParams) => {
    const patchResponse = await patch(`/users/${data.user_id}`, { avatar: data.avatar });

    return patchResponse.data;
  },
};
