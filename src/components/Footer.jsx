import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/Bharat-Dua"
          target="_blank"
          className={styles.link}
        >
          Bharat Dua
        </a>{" "}
        All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
