import { useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={onClose}
      >
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
};

export default ErrorMessage; 