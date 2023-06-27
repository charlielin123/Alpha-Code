import { uuid } from '@/compossible/Utils/tools'
export interface ITrelloCard {
  card: {
    id: string
    name: string
    idShort?: number
    shortLink?: string
  }
}

export interface ICardList {
  name: string
  id: string
  cards: ITrelloCard[]
}

export class CardList implements ICardList {
  name: string = ''
  id: string 
  cards: ITrelloCard[] = []
  constructor(name: string,cards: ITrelloCard[]) {
    this.name = name
    this.id=uuid()
    this.cards = cards
  }
}


interface TodoList {
  id: string
  name: string
  closed: boolean
  idBoard: string
  pos: number
  subscribed: boolean
  softLimit: any
  status: any
}
interface Member {
  id: string
  activityBlocked: boolean
  avatarUrl: string
  bio: string
  bioData: null
  confirmed: boolean
  fullName: string
  idEnterprise: null
  idMemberReferrer: null
  initials: string
  memberType: string
  nonPublic: any
  products: any[]
  url: string
  username: string
}
