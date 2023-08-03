import CardLightBox from './CardLightBox.vue';
import {showLightBox} from '../LightBoxBase';
import {defineComponent} from 'vue';
export const showCardModel=(card:Card)=>{
  showLightBox(CardLightBox,{card},"card")
}