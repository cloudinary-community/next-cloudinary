import styles from './HeaderImage.module.scss';

export const HeaderImage = ({ children }) => {
  return (
    <div className={`${styles.headerImage} bg-slate-100 border border-slate-200 dark:bg-black dark:border-[#1c2428]`}>
      <div className={styles.headerImageChildren}>
        { children }
      </div>
    </div>
  );
};

export default HeaderImage;
