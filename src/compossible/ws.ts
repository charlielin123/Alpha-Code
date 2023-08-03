interface customWebSocket extends WebSocket {
  emit: (event: string, payload: object) => void;
  on: (event: string, func: Function) => void;
}

class CustomWebSocket extends WebSocket {
  private listeners: { [props: string]: Function } = {};
  emit(event: string, payload: object) {
    const obj = { eventName: event, payload: payload };
    const reqStr = JSON.stringify(obj);
    this.send(reqStr);
  }
  on(event: string, func: Function) {
    this.listeners[event] = func;
  }
  onmessage = (e: MessageEvent<string>) => {
    console.log('e');
    const obj = JSON.parse(e.data);
    if (obj.eventName) {
      this.listeners[obj.eventName](obj.payload);
    }
  };
  constructor(url: string) {
    super(url);
  }
}

const initWs = (url: string) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const mySocket = new WebSocket(`ws://${url}`, encodeURI(token)) as customWebSocket;
  const listener: any = {};

  mySocket.emit = function (event: string, payload: object) {
    const obj = { event, payload: payload };
    const reqStr = JSON.stringify(obj);
    console.log(reqStr);
    this.send(reqStr);
  };
  mySocket.onmessage = (event) => {
    const obj = JSON.parse(event.data);
    console.log(obj)
    if (obj.event) {
      listener[obj.event](obj.payload);
    }
  };
  mySocket.on = (event: string, func: Function) => {
    listener[event] = func;
  };

  return mySocket;
};

export { initWs };
export type { customWebSocket };
