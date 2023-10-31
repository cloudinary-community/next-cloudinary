import styles from './HeaderImage.module.scss';

export const HeaderImage = ({ children }) => {
  return (
    <div className={styles.headerImage}>
      <div className={styles.headerImageChildren}>
        { children }
      </div>
    </div>
  );
};

export default HeaderImage;
