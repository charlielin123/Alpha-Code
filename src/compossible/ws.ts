interface customWebSocket extends WebSocket {
  emit: (event: string, payload: object) => void;
  on: (event: string, func: Function) => void;
}

class CustomWebSocket extends WebSocket {
  public listeners: { [props: string]: Function } = {};
  constructor(url: string, protocols?: string | string[] | undefined) {
    super(url, protocols);
    this.onmessage = (e: MessageEvent<string>) => {
      console.log('e');
      const obj = JSON.parse(e.data);
      if (obj.event) {
        this.listeners[obj.event](obj.payload);
      }
    };
  }
  emit(event: string, payload: object) {
    const obj = { event, payload };
    const reqStr = JSON.stringify(obj);
    this.send(reqStr);
  }
  on(event: string, func: Function) {
    this.listeners[event] = func;
  }
}

const initWs = (url: string) => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const mySocket = new CustomWebSocket(`ws://${url}`, encodeURI(token));
  return mySocket;
};

export { initWs };
export type { customWebSocket ,};
