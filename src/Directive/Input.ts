import type { DirectiveBinding } from "vue";

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
  }
};
