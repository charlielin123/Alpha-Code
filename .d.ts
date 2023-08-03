declare module 'vue-draggable-next';
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

type Card = {
  _id: string;
  name: string;
  content?: string;
  dueDate?: Date;
};
type CardBox = {
  _id: string;
  name: string;
  cards: Card[];
  mission: Mission;
};
type mission = {
  _id: string;
  name: string;
  owner: User;
  editor?: User[];
  cardBoxes?: CardBox[];
};

type User = {
  _id: string;
  email: string;
  googleId?: string;
  name?: string;
  image?: string;
};
