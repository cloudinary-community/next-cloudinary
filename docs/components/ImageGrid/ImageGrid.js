import styles from './ImageGrid.module.scss';

const ImageGrid = ({ children }) => {
  return (
    <ul className={styles.imageGrid}>
      { children }
    </ul>
  )
}

export default ImageGrid;