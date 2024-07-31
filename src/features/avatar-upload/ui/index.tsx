import Modal from 'react-modal';
import styles from './avatar-modal.module.css';
import { useSelector } from 'react-redux';

import avatar1 from 'shared/assets/images/avatar1.jpg';
import avatar2 from 'shared/assets/images/avatar2.jpg';
import avatar3 from 'shared/assets/images/avatar3.jpg';

interface AvatarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

const avatars = [avatar1, avatar2, avatar3];

export const AvatarModal = ({ isOpen, onRequestClose, onSelectAvatar }: AvatarModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Выберите аватар</h2>
      <div className={styles.avatarList}>
        {avatars.map((item, index) => (
          <img key={index} src={item} alt="avatar" className={styles.avatar} onClick={() => onSelectAvatar(item)} />
        ))}
      </div>

      <button type="submit" onClick={onRequestClose} className={styles.closeButton}>
        Закрыть
      </button>
    </Modal>
  );
};
