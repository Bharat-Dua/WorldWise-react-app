import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; copyright{" "}
        <a
          href="https://github.com/Bharat-Dua"
          target="_blank"
          className={styles.link}
        >
          Bharat Dua
        </a>{" "}
        {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
}

export default Footer;
