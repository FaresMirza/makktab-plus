import PropTypes from 'prop-types'
import styles from './Navbar.module.css'

function Navbar({ title }) {
  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
