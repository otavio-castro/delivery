import * as Styled from "./index.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Styled.Overlay onClick={onClose}>
      <Styled.Modal onClick={(e) => e.stopPropagation()}>
        {title && (
          <Styled.Header>
            <Styled.Title>{title}</Styled.Title>
            <Styled.CloseButton onClick={onClose}>&times;</Styled.CloseButton>
          </Styled.Header>
        )}
        <Styled.Content>{children}</Styled.Content>
      </Styled.Modal>
    </Styled.Overlay>
  );
};

export default Modal;
