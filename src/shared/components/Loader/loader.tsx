import { FireRing } from 'shared/animations/fire-ring/fire-ring';
import style from './loader.module.css';

export const Loader = () => {
  return (
    <div className={style.loader}>
      <FireRing />
    </div>
  );
};
