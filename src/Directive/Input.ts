import type { DirectiveBinding } from 'vue';

export default {
  /**
   *
   * @param {HTMLInputElement} el
   * @param {DirectiveBinding} binding
   */
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    const mode = binding.modifiers;
    if (mode.number) {
      el.addEventListener('input', (event) => {
        const input = event.target as HTMLInputElement;
        let value: string | number = input?.value;
        const regex = /^\d*$/;
        if (!regex.test(value)) {
          input.value = value.replace(/\D/g, '');
          input.dispatchEvent(new Event('input'));
        }
        let max = binding.value?.max;
        let min = binding.value?.min;
        value = parseInt(value);
        if (min) value = Math.max(min, value);
        if (max) value = Math.min(max, value);
        input.value = value.toString();
      });
      return;
    }
    if (mode.date) {
      const timeRegex1 =
        '(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})\\/(((0[13578]|1[02])\\/(0[1-9]|[12][0-9]|3[01]))|' +
        '((0[469]|11)\\/(0[1-9]|[12][0-9]|30))|(02\\/(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|' +
        '((0[48]|[2468][048]|[3579][26])00))\\/02\\/29)$';
      el.addEventListener('input', (event) => {
        const input = event.target as HTMLInputElement;
        let value: string | number = input?.value;
        const regex = new RegExp(timeRegex1);
        if (!regex.test(value)) {
          input.value = value.replace(/\D\//g, '');
          if(input.value.length==4||input.value.length==7){
            input.value=input.value+"/"
          }
        }
        
        // value = parseInt(value);
        // input.value = value.toString();
      });
      return;
    }
  }
};
