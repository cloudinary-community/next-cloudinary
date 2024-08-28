import styles from './HeaderImage.module.scss';

export const HeaderImage = ({ children, layout, caption }) => {
  return (
    <div className={`${styles.headerImage} bg-slate-100 border border-slate-200 dark:bg-black dark:border-[#1c2428]`}>
      <div className={styles.headerImageChildren} data-layout={layout}>
        { children }
      </div>
      {caption && (
        <p className="mt-4 !-mb-3 text-sm text-center italics">{ caption }</p>
      )}
    </div>
  );
};

export default HeaderImage;
