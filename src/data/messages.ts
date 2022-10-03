import { IMessage } from '../types';
import { apiCall } from '../utils/networking';

const cachedMessageRecordArrays: Record<
  string,
  Promise<IMessage[]>
> = {};

export async function getChannelMessages(
  teamId: string,
  channelId: string,
) {
  let cached = cachedMessageRecordArrays[channelId];
  if (typeof cached === 'undefined')
    cached = cachedMessageRecordArrays[channelId] = apiCall(
      `teams/${teamId}/channels/${channelId}/messages`,
    );
  return await cached;
}
