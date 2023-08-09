import { useMessage } from '@/components';
import type { Socket } from 'socket.io-client';
import { inject, reactive } from 'vue';

export const MissionIoInit = () => {
  const io = inject<Socket>('io');
  const { showMessage } = useMessage();

  const mission = reactive<Mission>({} as Mission);
  io?.on('message', (message) => {
    showMessage?.info(message);
  });
  io?.on('getMission', (res: Mission) => {
    // mission._id='';
    // mission.name='';
    // mission.owner=null;
    // mission.editor=[];
    // mission.cardBoxes=[];
    Object.assign(mission, res);
  });

  io?.on('getCardBox', (res: CardBox) => {
    mission.cardBoxes?.map((item: CardBox) => {
      if (item._id == res._id) {
        Object.assign(item, res);
      }
    });
  });
  io?.on('getCard', (res: Card) => {
    console.log(res);
    mission.cardBoxes?.map((box: CardBox) => {
      box.cards?.map((card: Card) => {
        if (card._id == res._id) {
          Object.assign(card, res);
        }
      });
    });
  });

  io?.on('cardChange', (cardBox: CardBox) => {
    mission.cardBoxes = mission.cardBoxes?.map((i) => {
      if (i._id == cardBox._id) {
        return cardBox;
      }
      return i;
    });
  });

  const addCard = (boxId: string, cardName: string) => {
    io?.emit('/mission/addCard', { boxId, cardName });
  };
  const addCardBox = (boxName: string) => {
    io?.emit('/mission/addCardBox', { boxName });
  };

  const getMissionById = (mId: string) => {
    if(!mId) return;
    io?.emit('/mission/joinRoom', mId);
  };

  const editCard = (card: Card) => {
    io?.emit('/mission/changeCard', card);
  };
  const changeIndex = (list: CardBox) => {
    io?.emit('/mission/changeIndex', list);
  };

  return { mission, io, getMissionById, addCard, editCard, addCardBox, changeIndex };
};
