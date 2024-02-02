import "./Footer.sass";

function Footer() {
  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="footer">
      <div className="top-content">
        <button
          type="button"
          className="gif-button"
          onClick={() => redirectToUrl("https://github.com/MehdiAC86")
        >
          <img
            className="gif-image"
            src="GIF github.gif"
            alt="GIF Réseau Social 1"
          />
        </button>
        <button
          type="button"
          className="gif-button"
          onClick={() => redirectToUrl("https://www.instagram.com/mehdi_meh86/")
        >
          <img
            className="gif-image"
            src="Gif Instagram.gif"
            alt="GIF Réseau Social 2"
          />
        </button>
        <button
          type="button"
          className="gif-button"
          onClick={() =>
            redirectToUrl(
              "https://www.linkedin.com/in/mehdi-mehemel-bb5238a4/"
            )
          }
        >
          <img
            className="gif-image"
            src="GIF linkedin.gif"
            alt="GIF Réseau Social 3"
          />
        </button>
      </div>
      <div className="back-content">
        <p>© Mehdi Mehemel</p>
      </div>
    </footer>
  );
}

export default Footer;