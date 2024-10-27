import { Member } from '../interfaces/types';

export const getCardCount = (members: Member[], status: string) => {
  return members.filter(member => member.status === status).length;
};
