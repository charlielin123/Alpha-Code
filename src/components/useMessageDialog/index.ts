import MessageDialogVue from './MessageDialog.vue';
import {
  reactive,
  createApp,
  isVNode,
  h,
  type VNode,
  defineComponent,
  type ComponentOptionsBase
} from 'vue';
import Message from '@/components/Message';

interface NObject {
  [key: string]: any;
}

interface IMessageDialog extends NObject {
  show: boolean;
  title: string;
  message: string | VNode | { title: string; message: string };
  button1ListenerName: string;
  button1Label: string;
  button1Collection: string;
  param1: string;
  button2ListenerName: string;
  button2Label: string;
  button2Collection: string;
  param2: string;
  button3ListenerName: string;
  button3Label: string;
  button3Collection: string;
  param3: string;
}

class MessageDialog implements IMessageDialog {
  show = false;
  title = '';
  message: string | VNode | { title: string; message: string } = '';
  button1ListenerName = '';
  button1Label = '';
  button1Collection = '';
  param1 = '';
  button2ListenerName = '';
  button2Label = '';
  button2Collection = '';
  param2 = '';
  button3ListenerName = '';
  button3Label = '';
  button3Collection = '';
  param3 = '';
}

interface IDialogFunctions extends NObject {
  button1Function: Function;
  button1Close: boolean;
  button2Function: Function;
  button2Close: boolean;
  button3Function: Function;
  button3Close: boolean;
}
class DialogFunctions implements IDialogFunctions {
  button1Function:Function = () => {};
  button1Close = true;
  button2Function:Function = () => {};
  button2Close = true;
  button3Function:Function = () => {};
  button3Close = true;
}
const messageDialogObj = reactive<IMessageDialog>(new MessageDialog());
const dialogFunctions = reactive<IDialogFunctions>(new DialogFunctions());
const dialogFunctionsDefault = reactive({
  button1Function: () => {},
  button1Close: true,
  button2Function: () => {},
  button2Close: true,
  button3Function: () => {},
  button3Close: true
});

/**
 * @param {MessageDialog}  messageDialogObject   messageDialog物件
 */
function setMessageDialog(messageDialogObject: MessageDialog) {
  clear();
  if (messageDialogObject) {
    Object.assign(messageDialogObj, messageDialogObject);
  }
  return funList;
}
/**
 * 跳出燈箱
 * @returns
 */
function show() {
  messageDialogObj.show = true;
  return funList;
}

/**
 * 清除內容並關閉
 * @returns
 */
function clear() {
  Object.assign(messageDialogObj, new MessageDialog());
  Object.assign(dialogFunctions, dialogFunctionsDefault);
  messageDialogObj.show = false;
  return funList;
}
/**
 * 設定對應的function物件
 * @param {{[listenerName:string]:Function}} object key放後端回傳的ListenerName,Value放對應執行的FUNCTION
 */
const setFunction = (object: { [listenerName: string]: Function }) => {
  for (let key in object) {
    if (key == messageDialogObj.button1ListenerName) {
      dialogFunctions.button1Function = object[key];
    }
    if (key == messageDialogObj.button2ListenerName) {
      dialogFunctions.button2Function = object[key];
    }
    if (key == messageDialogObj.button3ListenerName) {
      dialogFunctions.button3Function = object[key];
    }
  }
  return funList;
};
type DialogReq = {
  label: string;
  listenerName: string;
  param: any;
  todo: Function;
  close: boolean;
};
function setBtn(number: number, dialog: DialogReq) {
  const { label, listenerName, param, todo, close } = dialog;

  messageDialogObj[`button${number}Label`] = label ?? messageDialogObj[`button${number}Label`];
  messageDialogObj[`param${number}`] = param ?? messageDialogObj[`param${number}`];
  messageDialogObj[`button${number}ListenerName`] =
    listenerName ?? messageDialogObj[`button${number}ListenerName`];
  dialogFunctions[`button${number}Function`] = todo ?? dialogFunctions[`button${number}Function`];
  dialogFunctions[`button${number}Close`] = close ?? true;
  return funList;
}
/**
 * 設定按鈕1相關參數 用不到的屬性不需設置
 * @param {*} {
 * label:按鈕名,
 * listenerName,
 * param:執行Function的傳入參數,
 * todo:按鈕執行的Function,
 * close:執行後是否關閉，
 * 預設為否 }
 * @returns
 */
function setBtn1({ label, listenerName, param, todo, close }: DialogReq) {
  setBtn(1, { label, listenerName, param, todo, close });
  return funList;
}
/**
 * 設定按鈕2相關參數 用不到的屬性不需設置
 *  @param {*} {
 * label:按鈕名,
 * listenerName,
 * param:執行Function的傳入參數,
 * todo:按鈕執行的Function,
 * close:執行後是否關閉，
 * 預設為否 }
 * @returns
 */
function setBtn2({ label, listenerName, param, todo, close }: DialogReq) {
  setBtn(2, { label, listenerName, param, todo, close });
  return funList;
}
/**
 * 設定按鈕3相關參數 用不到的屬性不需設置
 *  @param {*} {
 * label:按鈕名,
 * listenerName,
 * param:執行Function的傳入參數,
 * todo:按鈕執行的Function,
 * close:執行後是否關閉，
 * 預設為否 }
 * @returns
 */
function setBtn3({ label, listenerName, param, todo, close }: DialogReq) {
  setBtn(3, { label, listenerName, param, todo, close });
  return funList;
}

/**
 * 預設title為'警告'
 * @param {string|{title:string,message:string}|{statusCode:string,message:string}} obj 參數可以給string或是{title:'標題', message:'訊息'}
 */
function showAlert(obj: string | { title: string; message: string; statusCode: string } | VNode) {
  clear();
  if (typeof obj == 'string') {
    messageDialogObj.message = obj;
    messageDialogObj.title = ' ';
  } else if (isVNode(obj)) {
    messageDialogObj.message = obj;
  } else if (obj instanceof Object) {
    if (Object.keys(obj).includes('statusCode')) {
      messageDialogObj.title = obj.statusCode ? 'error code: ' + obj.statusCode : '';
    } else {
      messageDialogObj.title = obj.title ?? ' ';
    }
    messageDialogObj.message = obj.message ?? '';
  }
  messageDialogObj.button1Label = 'close';

  show();
}

const funList = { show, clear, setFunction, setBtn1, setBtn2, setBtn3 };

export { clear, showAlert, msgDialogPlugins, setMessageDialog, MessageDialog, newDialog };

const msgDialogPlugins = {
  install: () => {
    console.log('install massage dialog ');
    const newApp = createApp(MessageDialogVue, {
      msgDialog: messageDialogObj,
      dialogFunctions: dialogFunctions
    });
    newApp.use(Message);
    const element = document.createElement('div');
    newApp.mount(element);
    document.body.appendChild(element);
  }
};

/**
 *
 * @param {Function} todoFunction 要執行的Function
 * @param {string} message 提示訊息
 * @param {string} label 按鈕名稱
 */
export const showConfirmDialog = (
  todoFunction: Function,
  message: string,
  label: string,
  title: string
) => {
  const obj = reactive(new MessageDialog());
  obj.button1Label = label ?? 'lightBoxBase.sure';
  obj.button2Label = 'close';
  obj.message = message ?? 'lightBoxBase.checkContinuum';
  obj.title = title || ' ';
  const fun = new DialogFunctions();
  fun.button1Function = todoFunction;
  createDialog(obj, fun, 'ConfirmBox');
};

export const testAlert = (
  obj: string | { title: string; message: string; statusCode: string } | VNode
) => {
  const dialogObj = reactive(new MessageDialog());
  if (typeof obj == 'string') {
    dialogObj.message = obj;
    dialogObj.title = ' ';
  } else if (isVNode(obj)) {
    dialogObj.message = obj;
  } else if (obj instanceof Object) {
    if (Object.keys(obj).includes('statusCode')) {
      dialogObj.title = obj.statusCode ? 'error code: ' + obj.statusCode : '';
    } else {
      dialogObj.title = obj.title ?? ' ';
    }
    dialogObj.message = obj.message ?? ' ';
  }
  dialogObj.button1Label = 'close';
  createDialog(dialogObj, null, 'AlertBox');
  // createDialog(dialogObj, null, 'AlertBox', { ['disTitle']: true });

  // dialogObj.show = true;
};

/**
 * @param {MessageDialog}  messageDialogObject   messageDialog物件
 */
const newDialog = (messageDialogObject: MessageDialog) => {
  const obj = reactive<IMessageDialog>(new MessageDialog());
  const fun = reactive<IDialogFunctions>(new DialogFunctions());

  const show = () => {
    createDialog(obj, fun, 'MessageDialogBox');
    // obj.show = true;
  };
  /**
   * 關閉
   * @returns
   */
  const close = () => {
    obj.show = false;
  };

  /**
   * 設定對應的function物件
   * @param {*} object key放後端回傳的ListenerName,Value放對應執行的FUNCTION
   */
  const setFunction = (object: { [listenerName: string]: Function }) => {
    for (let key in object) {
      if (key == messageDialogObj.button1ListenerName) {
        dialogFunctions.button1Function = object[key];
      }
      if (key == messageDialogObj.button2ListenerName) {
        dialogFunctions.button2Function = object[key];
      }
      if (key == messageDialogObj.button3ListenerName) {
        dialogFunctions.button3Function = object[key];
      }
    }
    return funList;
  };

  function setBtn(number:number, { label, listenerName, param, todo, close }:btnReq) {
    obj[`button${number}Label`] = label ?? obj[`button${number}Label`];
    obj[`param${number}`] = param ?? obj[`param${number}`];
    obj[`button${number}ListenerName`] = listenerName ?? obj[`button${number}ListenerName`];
    fun[`button${number}Function`] = todo ?? fun[`button${number}Function`];
    fun[`button${number}Close`] = close ?? true;
    return funList;
  }

  type btnReq = {
    label: string;
    listenerName: string;
    param: any;
    todo: Function;
    close: boolean;
  };
  /**
   * 設定按鈕1相關參數 用不到的屬性不需設置
   * @param {*} {
   * label:按鈕名,
   * listenerName,
   * param:執行Function的傳入參數,
   * todo:按鈕執行的Function,
   * close:執行後是否關閉，
   * 預設為否 }
   * @returns
   */
  function setBtn1({ label, listenerName, param, todo, close }: btnReq) {
    setBtn(1, { label, listenerName, param, todo, close });
    return funList;
  }
  /**
   * 設定按鈕2相關參數 用不到的屬性不需設置
   *  @param {*} {
   * label:按鈕名,
   * listenerName,
   * param:執行Function的傳入參數,
   * todo:按鈕執行的Function,
   * close:執行後是否關閉，
   * 預設為否 }
   * @returns
   */
  function setBtn2({ label, listenerName, param, todo, close }: btnReq) {
    setBtn(2, { label, listenerName, param, todo, close });
    return funList;
  }
  /**
   * 設定按鈕3相關參數 用不到的屬性不需設置
   *  @param {*} {
   * label:按鈕名,
   * listenerName,
   * param:執行Function的傳入參數,
   * todo:按鈕執行的Function,
   * close:執行後是否關閉，
   * 預設為否 }
   * @returns
   */
  function setBtn3({ label, listenerName, param, todo, close }: btnReq) {
    setBtn(3, { label, listenerName, param, todo, close });
    return funList;
  }
  if (messageDialogObject) {
    Object.assign(obj, messageDialogObject);
  }

  const funList = { show, close, setFunction, setBtn1, setBtn2, setBtn3 };

  return funList;
};

const createDialog = (
  dialogObj: MessageDialog,
  fun: DialogFunctions | null,
  name: string,
  options?: object
) => {
  const newApp = createApp({
    name: name,
    mounted() {
      dialogObj.show = true;
    },
    setup() {
      return () => {
        return h(MessageDialogVue, {
          msgDialog: dialogObj,
          dialogFunctions: fun ?? dialogFunctionsDefault,
          ...options,
          closeApp: () => {
            dialogObj.show = false;
            setTimeout(() => {
              newApp.unmount();
            }, 300);
          }
        });
      };
    }
  });
  newApp.use(Message);
  const element = document.createElement('div');
  newApp.mount(element);
  document.body.appendChild(element);
};
