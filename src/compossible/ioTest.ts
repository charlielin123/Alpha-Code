import { useMessage } from '@/components';
import type { Socket } from 'socket.io-client';
import { inject, reactive } from 'vue';

let io: Socket | null = null;

const mission = reactive<Mission>({} as Mission);

export const MissionIoInit = () => {
  if(!io){
    io = inject<Socket>('io') ?? null;
    setListener();
  }
  const addCard = (boxId: string, cardName: string) => {
    io?.emit('/mission/addCard', { boxId, cardName });
  };
  const addCardBox = (boxName: string, mId: string) => {
    console.log(boxName, mId);
    io?.emit('/mission/addCardBox', { boxName, mId });
  };

  const getMissionById = (mId: string) => {
    if (!mId) return;
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

const setListener = () => {
  const { showMessage } = useMessage();
  io?.on('message', (message) => {
    showMessage?.info(message);
  });
  io?.on('getMission', (res: Mission) => {
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
};
