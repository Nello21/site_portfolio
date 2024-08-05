import styles from './footer.module.css';

export const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerCol}>
              <h4>Компания</h4>
              <ul>
                <li>
                  <a href="#">о нас</a>
                </li>
                <li>
                  <a href="#">наши сервесы</a>
                </li>
                <li>
                  <a href="#">политика конфиденциальности</a>
                </li>
                <li>
                  <a href="#">партнерская программа</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Помощь</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">подписка</a>
                </li>
                <li>
                  <a href="#">возврат</a>
                </li>
                <li>
                  <a href="#">аккаунт</a>
                </li>
                <li>
                  <a href="#">поддержка</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Просмотр</h4>
              <ul>
                <li>
                  <a href="#">билеты</a>
                </li>
                <li>
                  <a href="#">все фильмы</a>
                </li>
                <li>
                  <a href="#">все сериалы</a>
                </li>
                <li>
                  <a href="#">акции</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Контакты и соцсети</h4>
              <div className={styles.socialLinks}>
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
