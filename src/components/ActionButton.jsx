function ActionButton({ children, onClick, disabled }) {
  return (
    <button className="action-btn" type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default ActionButton;
