
import React from 'react';
import { ToastType } from '../../types';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const styles = {
    success: 'bg-black text-white border-sky-400',
    error: 'bg-red-50 text-red-600 border-red-200',
    info: 'bg-sky-50 text-sky-600 border-sky-200',
    warning: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  const icons = {
    success: 'fa-circle-check text-sky-400',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation'
  };

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-2xl border shadow-xl animate-fade-in ${styles[type]} min-w-[300px]`}>
      <i className={`fa-solid ${icons[type]} text-xl`}></i>
      <span className="flex-grow font-medium text-sm">{message}</span>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: any[], onClose: (id: number) => void }> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[400] flex flex-col space-y-3">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  );
};
