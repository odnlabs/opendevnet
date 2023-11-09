import { ToastType } from '@odnlabs/ui';
import { useEffect, useRef } from 'react';

export interface ServerMessage {
  event: string;
  status: number;
  type: ToastType;
  message: string;
  data?: unknown;
}

export interface ClientMessage {}

type WebSocketConnection = WebSocket | null;

let socketInstance: WebSocketConnection = null;

// Utility function to get the WebSocket connection instance

/**
 * Utility function to get the WebSocket connection instance.
 * @returns The WebSocket connection instance.
 */
export const getSocketInstance = (): WebSocketConnection => {
  if (!process.env.PUBLIC_WS_URL) {
    throw new Error('PUBLIC_API_URL is undefined');
  }

  if (!socketInstance) {
    socketInstance = new WebSocket(process.env.PUBLIC_WS_URL);
  }

  return socketInstance;
};

interface UseWebSocketProps {
  onConnect: () => void;
  onConnectionError: (error: Event) => void;
  onMessage: (message: ServerMessage) => void;
}

/**
 * Custom hook to subscribe to WebSocket messages.
 * @param onMessage The message handler.
 * @param onMessage.onConnect The connection handler.
 * @param onMessage.onConnectionError The connection error handler.
 * @param onMessage.onMessage The message handler.
 * @returns The WebSocket connection instance and a method to send messages.
 */
export const useWebSocket = ({
  onConnect,
  onConnectionError,
  onMessage,
}: UseWebSocketProps): {
  socket: WebSocketConnection;
  sendMessage: (message: MessageEvent) => void;
} => {
  const socketRef = useRef<WebSocketConnection>(null);

  useEffect(() => {
    // Get the WebSocket connection instance
    const socket = getSocketInstance();
    if (!socket) return;
    socketRef.current = socket;

    const handleSocketMessage = (event: MessageEvent): void => {
      const message: ServerMessage = JSON.parse(
        event.data as string
      ) as ServerMessage;
      onMessage(message);
    };

    const handleSocketOpen = (): void => {
      console.log('WebSocket connection established');
      if (onConnect) onConnect();
    };

    const handleSocketError = (errorEvent: Event): void => {
      console.log('WebSocket connection error:', errorEvent);
      if (onConnectionError) onConnectionError(errorEvent);
    };

    // Add event listeners
    socket.addEventListener('open', handleSocketOpen);
    socket.addEventListener('error', handleSocketError);
    socket.addEventListener('message', handleSocketMessage);

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.removeEventListener('message', handleSocketMessage);
      socket.removeEventListener('open', handleSocketOpen);
      socket.removeEventListener('error', handleSocketError);
    };
  }, [onConnect, onConnectionError, onMessage]);

  // Return the WebSocket connection instance and a method to send messages
  return {
    socket: socketRef.current,
    sendMessage: (message: MessageEvent) => {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify(message));
      }
    },
  };
};
