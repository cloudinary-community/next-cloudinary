import styles from './ImageGrid.module.scss';

const ImageGrid = ({ children, columns = 2 }) => {
  return (
    <ul className={styles.imageGrid} data-column-count={columns}>
      { children }
    </ul>
  )
}

export default ImageGrid;