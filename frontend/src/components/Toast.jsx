import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const icons = {
  success: <FiCheckCircle color="#16A34A" size={18} />,
  error: <FiAlertCircle color="#C0392B" size={18} />,
  info: <FiInfo color="#2563EB" size={18} />,
};

export default function ToastContainer({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {icons[t.type]}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
