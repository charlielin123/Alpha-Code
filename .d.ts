declare module 'vue-draggable-next';
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
declare var process: NodeJS.Process;

type Card = {
  [props:string]:any;
  _id: string;
  name: string;
  content?: string;
  dueDate?: string|Date;
};
type CardBox = {
  _id: string;
  name: string;
  owner: User;
  cards: Card[];
  mission: Mission;
};
type Mission = {
  _id: string;
  name: string;
  owner: User|null;
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
