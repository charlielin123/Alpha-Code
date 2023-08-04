import type { Socket } from 'socket.io-client';
import { inject, reactive } from 'vue';

export const MissionIoInit = () => {
  const io = inject<Socket>('io');

  const mission = reactive<Mission>({} as Mission);

  io?.on('getMission', (res: Mission) => {
    // mission._id='';
    // mission.name='';
    // mission.owner=null;
    // mission.editor=[];
    // mission.cardBoxes=[];
    Object.assign(mission, res);
  });

  io?.on('getCard', (res: CardBox) => {
    mission.cardBoxes?.map((item: CardBox) => {
      if (item._id == res._id) {
        Object.assign(item, res);
      }
    });
  });

  const addCard = (boxId: string, cardName: string) => {
    console.log('addCard');
    io?.emit('/mission/addCard', { boxId, cardName });
  };

  const getMissionById = (mId: string) => {
    console.log('getMissionById');
    io?.emit('/mission/joinRoom', mId);
    // io?.emit('/mission/getMission', mId);
  };

  return { mission, io, getMissionById,addCard };
};
